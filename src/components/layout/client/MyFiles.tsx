"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Trash2, FileSpreadsheet } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { IBankendError, IFile } from "@/utils/types";
import { CustomDialogBox } from "@/components/fragments/client/global/CustomDialogBox";
import { downloadFile } from "@/backendMethods/apiCalls";
import { toast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import { RootState as UserRootState } from "@/redux/combinedStores";
import { useUserAppDispatch } from "@/redux/hooks/userHooks";
import { getFiles } from "@/redux/slices/userSlice";
import { useCheckAuth } from "@/hooks/useCheckAuth";

export function FileList() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<IFile | null>(null);
  const dispatch = useUserAppDispatch();
  const checkAuth = useCheckAuth();
  const userState = useSelector((state: UserRootState) => state.user);
  let files = userState?.files as IFile[];

  useEffect(() => {
    if (!files || files.length === 0) {
      dispatch(getFiles()).then(({ payload }) => {
        checkAuth(payload);
      });
    }
  }, [dispatch, checkAuth, files]);

  const handleDelete = (file: IFile) => {
    setSelectedFile(file);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedFile) {
      setDeleteDialogOpen(false);
    }
  };

  const handleDownload = (file: IFile) => {
    setSelectedFile(file);
    setDownloadDialogOpen(true);
  };

  const confirmDownload = async () => {
    try {
      if (selectedFile) {
        const data = await downloadFile(selectedFile._id);
        const blob = new Blob([data], { type: selectedFile.type });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");

        a.href = url;
        a.download = selectedFile.name;

        document.body.appendChild(a);
        a.click();

        toast({
          title: "Success",
          description: "Downloaded successfull",
        });
      }
    } catch (error: unknown) {
      const err = error as IBankendError;
      toast({
        title: "Error",
        description: err?.response?.data?.message || "Something went wrong!",
        variant: "destructive",
      });

      console.error("Error Response:", err?.response);
    } finally {
      setDownloadDialogOpen(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto scroll-smooth">
        {files?.map((file) => {
          return (
            <Card
              key={file._id}
              className="overflow-hidden transition-all hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <FileSpreadsheet className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    {file.updatedAt && (
                      <p className="text-sm text-gray-500 truncate">
                        {(file.size / 1024).toFixed(2)} KB •{" "}
                        {formatDistanceToNow(new Date(file.updatedAt as Date), {
                          addSuffix: true,
                        })}{" "}
                        ago
                      </p>
                    )}

                    <p className="text-sm text-gray-500 truncate">
                      Caller IDs: {file.totalCallerIds} • Status: {file.state}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={file.state !== "completed"}
                    onClick={() => handleDownload(file)}
                  >
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
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
