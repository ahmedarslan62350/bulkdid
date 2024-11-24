import { SystemInfoRes } from "@/utils/types";
import axios from "axios";

export async function getCPUUsage(): Promise<SystemInfoRes> {
  try {
    const { data } = await axios.get("/api/admin/get-cpu-usage");
    return {
      cpuUsage: {
        cpuFree: data.cpuUsage.cpuFree,
        cpuUsed: data.cpuUsage.cpuUsed,
      },
      memoryUsage: {
        memoryFree: data.memoryUsage.memoryFree,
        memoryUsed: data.memoryUsage.memoryUsed,
        memoryTotal: data.memoryUsage.memoryTotal,
      },
      networkUsage:{
        MBSpeed: data.networkUsage.MBSpeed,
        KBSpeed: data.networkUsage.KBSpeed,
      }
    };
  } catch (error) {
    console.error("Error fetching CPU usage:", error);
    return null;
  }
}
