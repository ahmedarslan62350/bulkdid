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
import { FileDetails, User } from "@/utils/types";

const isProduction = process.env.NODE_ENV !== "development";
const Files = ({ user }: { user: User }) => {
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
      {user.files.length > 0 ? (
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
            {user.files.map((file: FileDetails) => (
              <TableRow key={file._id}>
                <TableCell>
                  <Link href={`/admin/user/${user._id}/file/${file._id}`}>
                    {file._id}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/admin/user/${user._id}/file/${file._id}`}>
                    {file.realname}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/admin/user/${user._id}/file/${file._id}`}>
                    {file.size}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/admin/user/${user._id}/file/${file._id}`}>
                    {new Date(file.lastModified as Date).toDateString()}
                  </Link>
                </TableCell>
                <Link
                  key={file._id}
                  href={
                    file.status === "completed"
                      ? isProduction
                        ? `https://login.bulkdid.net/download/${file.owner}/${file.filename}_Completed.${file.extensionName}`
                        : `http://localhost:5000/download/${file.owner}/${file.filename}_Completed.${file.extensionName}`
                      : "#"
                  }
                >
                  <Button className="w-fit ml-5 mt-2 flex items-center">
                    <Download />
                  </Button>
                </Link>
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
