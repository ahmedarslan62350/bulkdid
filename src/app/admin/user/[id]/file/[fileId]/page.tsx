"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// Import the mock file
import { mockFile } from "@/utils/dumyData";
import { FileDetails } from "@/utils/types";

const isProduction = process.env.NODE_ENV !== "development";

export default function FileDetailsPage({
  params,
}: {
  params: Promise<{ fileId: string }>;
}) {
  const [file, setFile] = useState<FileDetails | null>(null);
  const { fileId } = React.use(params);

  useEffect(() => {
    setTimeout(() => {
      setFile(mockFile as FileDetails);
    }, 500);
  }, [fileId]);

  if (!file) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full h-full">
      <Card className="w-full h-full rounded-none border-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Link
              href={`/admin/user/${file.owner}`}
              className="flex items-center text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to User
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold">{file.realname}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Filename</p>
              <p>{file.filename}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Size</p>
              <p>{file.size}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Type</p>
              <p>{file.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Last Modified</p>
              <p>{new Date(file.lastModified as Date).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <p>{file.status}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Number of Caller IDs
              </p>
              <p>{file.noOfCallerIds}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Extension</p>
              <p>{file.extensionName}</p>
            </div>
          </div>
          <Link
            href={
              isProduction
                ? `https://login.bulkdid.net/download/${file.owner}/${file.filename}_Completed.${file.extensionName}`
                : `http://localhost:5000/download/${file.owner}/${file.filename}_Completed.${file.extensionName}`
            }
          >
            <Button className="mt-6">
              <Download className="mr-2 h-4 w-4" />
              Download File
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
