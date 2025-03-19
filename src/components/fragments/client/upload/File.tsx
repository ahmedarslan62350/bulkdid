"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUploadProps } from "@/utils/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FileUpload({
  onFileUpload,
  setRoleValue,
  roleValue,
  user,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.name.endsWith(".xlsx")) {
      setFile(selectedFile);
      onFileUpload(selectedFile);
    } else {
      alert("Please select a valid .xlsx file");
      event.target.value = "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Caller ID File</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file-upload">Select .xlsx file</Label>
            <Input
              id="file-upload"
              type="file"
              accept=".xlsx"
              onChange={handleFileChange}
            />
            {user?.isAllowedToFetch && (
              <Select onValueChange={setRoleValue} value={roleValue}>
                <SelectTrigger>
                  <SelectValue placeholder={"Select the role"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="both">Both</SelectItem>
                    <SelectItem value="fetching">Fetching</SelectItem>
                    <SelectItem value="checking">Checking</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          {file && (
            <p className="text-sm text-muted-foreground">
              Selected file: {file.name}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
