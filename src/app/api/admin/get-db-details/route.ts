import clientPromise from "@/config/mongoDbConfig";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const admin = client.db().admin();

    const serverStatus = await admin.command({ serverStatus: 1 });
    const buildInfo = await admin.command({ buildInfo: 1 });
    const dbStats = await db.stats();
    const replSetStatus = await admin
      .command({ replSetGetStatus: 1 })
      .catch(() => null);

    return NextResponse.json({
      name: "Main Database",
      description: "Primary data storage and retrieval service",
      status: serverStatus.ok === 1 ? "Operational" : "Issues Detected",
      details: {
        type: "MongoDB",
        version: buildInfo.version,
        gitVersion: buildInfo.gitVersion,
        storageEngine: serverStatus.storageEngine.name,
        platform: buildInfo.sysInfo,
        architecture: buildInfo.arch,
        uptime: `${(serverStatus.uptime / 3600).toFixed(2)} hours`,
        currentConnections: serverStatus.connections.current,
        availableConnections: serverStatus.connections.available,
        maxConnections: serverStatus.connections.totalCreated,
        dataSize: `${(dbStats.dataSize / 1024 ** 3).toFixed(2)} GB`,
        storageSize: `${(dbStats.storageSize / 1024 ** 3).toFixed(2)} GB`,
        indexSize: `${(dbStats.indexSize / 1024 ** 3).toFixed(2)} GB`,
        collections: dbStats.collections,
        documents: dbStats.objects,
        lastWrite: serverStatus.opWriteConcernCounters?.wtime?.num || "N/A",
        readWriteRatio: `${
          serverStatus.metrics.queryExecutor.scannedObjects /
            serverStatus.opWriteConcernCounters?.wtime?.num || 1
        } reads/write`,
        replication: replSetStatus
          ? {
              mode: replSetStatus.myState,
              members: replSetStatus.members.map(
                (member: {
                  name: string;
                  stateStr: string;
                  uptime: number;
                  health: number;
                }) => ({
                  name: member.name,
                  state: member.stateStr,
                  uptime: `${(member.uptime / 3600).toFixed(2)} hours`,
                  health: member.health === 1 ? "Healthy" : "Unhealthy",
                })
              ),
            }
          : "Not in a replica set",
        queryPerformance: {
          queriesPerSecond:
            serverStatus.metrics.queryExecutor.queriesPerSecond || "N/A",
          scannedObjects:
            serverStatus.metrics.queryExecutor.scannedObjects || "N/A",
        },
        journaledWrites: serverStatus.dur ? serverStatus.dur.journaled : "N/A",
      },
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
