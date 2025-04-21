"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef, HeaderContext } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import React from "react";
import {
  CloumnDefType,
  DropdownItem,
  IUser,
  Row,
  TableDropdown,
  TableHeadings,
} from "@/utils/types";

export const DataTableColumns = ({
  headings,
  dropdownConfig,
}: {
  headings: TableHeadings[];
  dropdownConfig: TableDropdown;
}): ColumnDef<CloumnDefType>[] => {
  const columns: ColumnDef<CloumnDefType>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            table.getIsSomePageRowsSelected()
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...headings.map(
      (heading): ColumnDef<CloumnDefType> => ({
        accessorKey: heading.accessor,
        filterFn: (row, columnId, filterValue) => {
          const rowValue = row.getValue(columnId);
          const rowAmountStr = rowValue ? rowValue.toString() : "";
          const filterValueStr = filterValue ? filterValue.toString() : "";
          return rowAmountStr.startsWith(filterValueStr);
        },
        header: ({
          column,
        }: HeaderContext<CloumnDefType, unknown>): React.JSX.Element => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-semibold w-full text-start justify-start items-start"
          >
            {heading.Header}
            <ArrowUpDown />
          </Button>
        ),
        cell: ({ row }: { row: Row }): React.ReactNode => (
          <div className="text-sm text-start w-full px-4">
            {heading.type && heading.type === "date" ? (
              <>
                {heading?.accessor
                  ? new Date(row.getValue(heading.accessor)).toDateString()
                  : "Unknown"}
              </>
            ) : (
              row.getValue(heading.accessor)
            )}
          </div>
        ),
      })
    ),
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original as unknown as IUser; // Ensure CloumnDefType has _id property
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">{dropdownConfig.heading}</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {dropdownConfig.items?.map((item) => {
                const { key, children, action } = item as DropdownItem;

                return (
                  <div
                    key={key}
                    onClick={action ? () => action(user) : () => null} // Pass user._id to the action
                  >
                    {children}
                  </div>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};
