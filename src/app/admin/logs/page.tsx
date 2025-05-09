import { Suspense } from "react";
import LogMonitor from "@/components/layout/admin/LogsMonitor";

export const dynamic = "force-dynamic";

export default async function LogsPage() {
  return (
    <div className="w-full h-screen p-5 overflow-y-auto scroll-smooth">
      <h1 className="text-2xl font-bold mb-4">Terminal Logs Monitor</h1>
      <Suspense fallback={<div>Loading logs...</div>}>
        <LogMonitor />
      </Suspense>
    </div>
  );
}
