"use client";

import { Chart } from "@/components/fragments/admin/global/Chart";
import DonutChart from "@/components/recharts/DonutChartCPU";
import { chartConfig2 } from "@/config/chartConfig";
import { chartData2 } from "@/utils/dumyData";
import React from "react";

const Analytics = () => {
  return (
    <>
      <div className="flex flex-col w-full h-fit">
        <h1 className="font-bold text-2xl text-gray-900 mb-2 ml-2">
          Data Metrices
        </h1>
        <div className="flex w-full h-fit flex-wrap gap-1">
          <Chart
            chartData={chartData2}
            key={"nsjkskd"}
            config={{
              heading: "Files",
              chartConfig: chartConfig2,
              chartEntries: ["desktop", "mobile"],
              classname: "lg:w-[49.8%]",
            }}
          />
          <Chart
            chartData={chartData2}
            key={"12233"}
            config={{
              heading: "DIDs Uploaded",
              chartConfig: chartConfig2,
              chartEntries: ["desktop", "mobile"],
              classname: "lg:w-[49.8%]",
            }}
          />
          <Chart
            chartData={chartData2}
            key={"1223478433"}
            config={{
              heading: "Transactions Processing",
              chartConfig: chartConfig2,
              chartEntries: ["desktop", "mobile"],
              classname: "lg:w-[49.8%]",
            }}
          />
          <Chart
            chartData={chartData2}
            key={"12nfduw9233"}
            config={{
              heading: "Users Growth",
              chartConfig: chartConfig2,
              chartEntries: ["desktop", "mobile"],
              classname: "lg:w-[49.8%]",
            }}
          />
        </div>
        <div className="flex flex-col w-full h-fit py-3">
          <h1 className="font-bold text-2xl p-2 text-gray-900">Top Users</h1>
          <Chart
            chartData={chartData2}
            key={"12nfduw9mdmks233"}
            config={{
              heading: "User Ranking",
              chartConfig: chartConfig2,
              chartEntries: ["desktop", "mobile"],
              classname: "",
            }}
          />
        </div>
        <div className="flex flex-col w-full h-fit py-3">
          <h1 className="font-bold text-2xl p-2 text-gray-900">Averages</h1>
          <div className="flex justify-around w-full bg-white border rounded-xl py-5 mb-5 flex-wrap gap-y-8">
            <DonutChart
              width={400}
              height={250}
              title="Users/Day"
              colors={["black"]}
              data={[{ name: "100 users/day", value: 100 }]}
            />
            <DonutChart
              width={400}
              height={250}
              title="Transaction Success Rate"
              colors={["gray", "red", "black"]}
              data={[
                { name: "Pending", value: 10 },
                { name: "Failed", value: 2 },
                { name: "Completed", value: 100 },
              ]}
              legendIndex={2}
            />
            <DonutChart
              width={400}
              height={250}
              title="Transaction/Day"
              colors={["black"]}
              data={[{ name: "100 transactions/day", value: 100 }]}
            />
            <div className="w-full h-[1px] px-10">
              <div className="w-full h-[1px] bg-gray-400"></div>
            </div>
            <DonutChart
              width={400}
              height={250}
              title="DIDs/Day"
              colors={["black"]}
              data={[{ name: "100K/Day", value: 100 }]}
            />
            <DonutChart
              width={400}
              height={250}
              title="Transaction Amount"
              data={[{ name: "$100", value: 100 }]}
              colors={["black"]}
              legendName="$100/transaction"
            />
            <DonutChart
              width={400}
              height={250}
              title="Files/Day"
              colors={["black"]}
              data={[{ name: "100 Files/Day", value: 100 }]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
