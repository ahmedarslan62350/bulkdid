"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDown, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTableColumns } from "@/components/fragments/admin/global/DataTableUtils";
import { TableConfiguration, TableData } from "@/utils/types";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export function DataTable({
  data,
  config,
}: {
  data: TableData[];
  config: TableConfiguration;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isUpdownClicked, setIsUpDownClicked] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const columns = DataTableColumns({
    headings: [...config.headings],
    dropdownConfig: config.dropdownConfig,
  });

  const table = useReactTable({
    data,
    columns: columns as ColumnDef<TableData>[],
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  if (!table || !config || !data) {
    return (
      <>
        <Skeleton className="w-full h-80" />
      </>
    );
  }

  return (
    <div className="w-full h-fit">
      <Link
        onClick={() => setIsUpDownClicked(true)}
        href={"#table"}
        id="updown-arrow"
        className={`w-7 h-7 rounded-full bg-black text-white absolute flex items-center justify-center bottom-5 left-1/2 z-50 cursor-pointer ${
          isUpdownClicked && "hidden"
        }`}
      >
        <ArrowDown className="w-4 h-4" />
      </Link>
      <h1 className="text-2xl font-bold ml-2">
        {config.heading} Administration
      </h1>
      <div className="flex justify-between items-center w-full h-fit">
        <h1 className="text-sm text-gray-600 ml-2">
          Hey , this is admin account , manage all the services
        </h1>
        {config.heading === "Transaction" && (
          <Button>
            <Link href={"/admin/create-transaction"}>
              Create new transaction
            </Link>
          </Button>
        )}
      </div>
      {config.isChart && <>{config.Chart}</>}
       {/* Chart ended */}
      <div className="w-full h-fit bg-white rounded-lg shadow px-5 border">
        {/* Table top started */}
        <div id="table" className="flex items-center py-4">
          <Input
            placeholder={`Filter ${config.filterBy}...`}
            value={
              (table.getColumn(config.filterBy)?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) => {
              const value = event.target.value;
              table.getColumn(config.filterBy)?.setFilterValue(value);
            }}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Table top ended , table started */}

        <div className="rounded-md">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead className="text-black" key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Table footer started ,Table ended */}

        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
