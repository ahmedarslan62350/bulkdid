"use client";

import { useState } from "react";
import { FileUpload } from "@/components/fragments/client/upload/File";
import { ManualInput } from "@/components/fragments/client/upload/Input";
import { Button } from "@/components/ui/button";
import { mergeAndCreateFile } from "@/app/u/upload/actions";
import { useToast } from "@/hooks/use-toast";

export default function CallerIdUploadPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [manualCallerIds, setManualCallerIds] = useState<string[]>([]);
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
      }
      formData.append("manualCallerIds", JSON.stringify(manualCallerIds));

      const result = await mergeAndCreateFile(formData);

      if (result.success) {
        toast({
          title: "Success",
          description: "Caller IDs merged and file created successfully.",
        });
        // Reset the form
        setUploadedFile(null);
        setManualCallerIds([]);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container px-4 py-10 space-y-8">
      <h1 className="text-4xl font-bold text-primary">Caller ID Management</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <FileUpload onFileUpload={handleFileUpload} />
        <ManualInput onManualInput={handleManualInput} />
      </div>
      <div className="flex justify-center">
        <Button onClick={handleSubmit} className="w-full md:w-auto">
          Merge and Create File
        </Button>
      </div>
    </div>
  );
}
