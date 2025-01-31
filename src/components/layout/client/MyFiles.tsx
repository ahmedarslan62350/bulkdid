"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Trash2, FileSpreadsheet } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { mockFiles } from "@/utils/dumyData";
import { UserFile } from "@/utils/types";
import { CustomDialogBox } from "@/components/fragments/client/global/CustomDialogBox";

const fileTypeIcons: { [key: string]: React.ElementType } = {
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    FileSpreadsheet,
};

export function FileList() {
  const [files, setFiles] = useState<UserFile[]>(mockFiles);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<UserFile | null>(null);

  const handleDelete = (file: UserFile) => {
    setSelectedFile(file);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedFile) {
      setFiles(files.filter((f) => f.id !== selectedFile.id));
      setDeleteDialogOpen(false);
    }
  };

  const handleDownload = (file: UserFile) => {
    setSelectedFile(file);
    setDownloadDialogOpen(true);
  };

  const confirmDownload = () => {
    if (selectedFile) {
      // Implement actual download logic here
      console.log(`Downloading file: ${selectedFile.filename}`);
      setDownloadDialogOpen(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((file) => {
          const IconComponent = fileTypeIcons[file.type] || File;
          return (
            <Card
              key={file.id}
              className="overflow-hidden transition-all hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.realname}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {(file.size / 1024).toFixed(2)} KB •{" "}
                      {formatDistanceToNow(file.lastModified)} ago
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      Caller IDs: {file.noOfCallerIds} • Status: {file.status}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(file)}
                  >
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(file)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <CustomDialogBox
        isOpen={downloadDialogOpen}
        setIsOpen={setDownloadDialogOpen}
        desc="Are you sure and want to download the file"
        title="Download"
        submitFunction={confirmDownload}
        selectedFile={selectedFile}
        variant="default"
      />

      <CustomDialogBox
        isOpen={deleteDialogOpen}
        setIsOpen={setDeleteDialogOpen}
        desc="Are you sure and want to delete the file"
        title="Delete"
        submitFunction={confirmDelete}
        selectedFile={selectedFile}
        variant="destructive"
      />

    </>
  );
}
