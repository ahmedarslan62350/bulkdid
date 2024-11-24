import { NextResponse } from "next/server";
import os from "node-os-utils";
import si from "systeminformation";

export async function GET() {
  try {
    const cpu = os.cpu;
    const free = await cpu.free();
    const usage = await cpu.usage();

    const mem = os.mem;
    const memoryUsage = await mem.free();
    const memoryUsed = await mem.used();

    const netUsage = await si.networkStats();

    const rxSpeed = netUsage[0].rx_sec;
    const txSpeed = netUsage[0].tx_sec;
    const totalSpeed = rxSpeed + txSpeed;

    const totalSpeedKB = totalSpeed / 1024;
    const totalSpeedMB = totalSpeed / (1024 * 1024);

    return NextResponse.json({
      cpuUsage: {
        cpuFree: free,
        cpuUsed: usage,
      },
      memoryUsage: {
        memoryFree: memoryUsage.freeMemMb,
        memoryUsed: memoryUsed.usedMemMb,
        memoryTotal: memoryUsed.totalMemMb,
      },
      networkUsage: {
        MBSpeed: totalSpeedMB,
        KBSpeed: totalSpeedKB,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
