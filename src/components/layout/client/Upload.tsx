"use client";

import { useState } from "react";
import { FileUpload } from "@/components/fragments/client/upload/File";
import { ManualInput } from "@/components/fragments/client/upload/Input";
import { Button } from "@/components/ui/button";
import { mergeAndCreateFile } from "@/app/u/upload/actions";
import { useToast } from "@/hooks/use-toast";
import { uploadFile } from "@/backendMethods/apiCalls";
import useAuth from "@/hooks/use-auth";
import { IBankendError } from "@/utils/types";

export default function CallerIdUploadPage() {
  const { user } = useAuth();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [manualCallerIds, setManualCallerIds] = useState<string[]>([]);
  const [roleValue, setRoleValue] = useState<"both" | "fetching" | "checking">(
    "checking"
  );

  const { toast } = useToast();

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
  };

  const handleManualInput = (callerIds: string[]) => {
    setManualCallerIds(callerIds);
  };

  const handleSubmit = async () => {
    if (!uploadedFile && manualCallerIds.length === 0) {
      toast({
        title: "No data to submit",
        description: "Please upload a file or enter caller IDs manually.",
        variant: "destructive",
      });
      return;
    }

    try {
      const formData = new FormData();
      if (uploadedFile) {
        formData.append("file", uploadedFile);
        formData.append("role", roleValue);
      }
      formData.append("manualCallerIds", JSON.stringify(manualCallerIds));

      const data = await mergeAndCreateFile(formData);

      if (data) {
        await uploadFile(formData);

        toast({
          title: "Success",
          description: "Caller IDs merged and file created successfully.",
        });

        setUploadedFile(null);
        setManualCallerIds([]);
        return;
      } else {
        throw new Error("Somethig went wrong");
      }
    } catch (error) {
      const err = error as IBankendError;

      toast({
        title: "Error",
        description: err?.response?.data?.message || "Something went wrong!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container px-4 py-10 space-y-8">
      <h1 className="text-4xl font-bold text-primary">Caller ID Management</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <FileUpload
          onFileUpload={handleFileUpload}
          roleValue={roleValue}
          setRoleValue={setRoleValue}
          user={user}
        />
        <ManualInput onManualInput={handleManualInput} />
      </div>
      <div className="flex justify-center">
        <Button onClick={handleSubmit} className="w-full md:w-auto">
          Merge and Upload File
        </Button>
      </div>
    </div>
  );
}
