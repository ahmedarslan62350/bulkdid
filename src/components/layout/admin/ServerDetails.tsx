"use client";

import Servers from "@/components/fragments/admin/servers/Servers";
import { SkeletonDemo } from "@/components/fragments/admin/global/Skelton";
import DonutChart from "@/components/recharts/DonutChartCPU";
import { getCPUUsage } from "@/lib/getCpuUsage";
import { SystemInfoRes } from "@/utils/types";
import React, { useEffect, useState } from "react";
const ServerDetails = () => {
  const [res, setRes] = useState<SystemInfoRes>();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      getCPUUsage().then((res: SystemInfoRes) => {
        if (res) {
          setRes(res);
        }
      });
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!isClient) {
    return <SkeletonDemo />;
  }

  return (
    <div className="flex flex-col w-full h-fit">
      <h1 className="font-bold text-2xl text-gray-900 mb-2 ml-2">System</h1>
      <div className="flex justify-around w-full bg-white border rounded-xl py-5 mb-5 flex-wrap">
        <DonutChart
          width={400}
          height={250}
          legendIndex={0}
          colors={["black", "gray"]}
          data={[
            {
              name: `${res?.cpuUsage.cpuFree || 0}% Free`,
              value: Number((res?.cpuUsage.cpuFree || 0).toFixed(2)) || 0.0001,
            },
            {
              name: `${res?.cpuUsage.cpuUsed || 0}% Used`,
              value: Number((res?.cpuUsage.cpuUsed || 0).toFixed(2)) || 0,
            },
          ]}
        />
        <DonutChart
          title="Memory Usage"
          width={400}
          height={250}
          legendIndex={0}
          colors={["black", "gray"]}
          data={[
            {
              name: `${Number(
                ((res?.memoryUsage.memoryFree || 0) / 1024).toFixed(2)
              )}GB/${Math.round(
                (res?.memoryUsage.memoryTotal || 0) / 1024
              )}GB Free`,
              value: res?.memoryUsage.memoryFree || 0.0001,
            },
            {
              name: `${Number(
                ((res?.memoryUsage.memoryUsed || 0) / 1024).toFixed(2)
              )}GB/${Math.round(
                (res?.memoryUsage.memoryTotal || 0) / 1024
              )}GB Used`,
              value: res?.memoryUsage.memoryUsed || 0,
            },
          ]}
        />
        <DonutChart
          title="Network Usage"
          width={400}
          height={250}
          colors={["black"]}
          data={[
            {
              name: res?.networkUsage.KBSpeed
                ? res?.networkUsage.KBSpeed > 1024
                  ? `${Number(res?.networkUsage.MBSpeed.toFixed(3))} Mbps`
                  : `${Number(res?.networkUsage.KBSpeed.toFixed(3))} Kbps`
                : 0,
              value: res?.networkUsage.KBSpeed
                ? res?.networkUsage.KBSpeed > 1024
                  ? Number(res?.networkUsage.MBSpeed.toFixed(3))
                  : Number(res?.networkUsage.KBSpeed.toFixed(3))
                : 0.0001,
            },
          ]}
        />
      </div>
      <div>
        <Servers />
      </div>
    </div>
  );
};

export default ServerDetails;
