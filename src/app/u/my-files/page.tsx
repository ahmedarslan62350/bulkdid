import { FileList } from "@/components/layout/client/MyFiles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

export default function MyFilesPage() {
  return (
    <div className="w-full h-screen overflow-y-auto scroll-smooth px-4 py-10">
      <div className="flex flex-col md:flex-row mb-8 gap-4">
        <h1 className="text-4xl font-bold text-primary">My Files</h1>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <Input
              type="text"
              placeholder="Search files..."
              className="pl-10 pr-4 py-2 w-full"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href={"/u/upload"}>
              <Plus className="mr-2 h-4 w-4" /> Upload File
            </Link>
          </Button>
        </div>
      </div>
      <FileList />
    </div>
  );
}
