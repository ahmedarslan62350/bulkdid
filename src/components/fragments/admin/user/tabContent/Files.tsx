"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { IBankendError, IFile, IUser } from "@/utils/types";
import { toast } from "@/hooks/use-toast";
import { downloadFile } from "@/backendMethods/apiCalls";

const Files = ({ user, files }: { user: IUser; files: IFile[] }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recent Files</h3>
      <div className="flex justify-between w-full">
        <Input
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 w-1/3"
        />
        <Button className="scale-90" variant={"outline"}>
          <Search />
        </Button>
      </div>
      {files.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead>Download</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file: IFile) => (
              <TableRow key={file._id}>
                <TableCell>
                  <Link href={`/admin/user/${user._id}/file/${file._id}`}>
                    {file._id}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/admin/user/${user._id}/file/${file._id}`}>
                    {file.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/admin/user/${user._id}/file/${file._id}`}>
                    {file.size}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/admin/user/${user._id}/file/${file._id}`}>
                    {new Date(file.createdAt as Date).toDateString()}
                  </Link>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={async () => {
                      try {
                        const data = await downloadFile(file._id);
                        const blob = new Blob([data], {
                          type: file.type,
                        });

                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement("a");

                        a.href = url;
                        a.download = file.name;

                        document.body.appendChild(a);
                        a.click();

                        toast({
                          title: "Success",
                          description: "Downloaded successfull",
                        });
                      } catch (error: unknown) {
                        const err = error as IBankendError;
                        toast({
                          title: "Error",
                          description:
                            err?.response?.data?.message ||
                            "Something went wrong!",
                          variant: "destructive",
                        });

                        console.error("Error Response:", err?.response);
                      }
                    }}
                    className="w-fit ml-5 mt-2 flex items-center"
                  >
                    <Download />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No files found</p>
      )}
    </div>
  );
};

export default Files;
