"use client";

import React, { Dispatch, MouseEvent, SetStateAction, useState } from "react";

import { DataTable } from "@/components/fragments/admin/global/DataTable";
import { dummyTransactions, transactionData1 } from "@/utils/dumyData";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { TableHeadings } from "@/utils/types";
import { Chart } from "@/components/fragments/admin/global/Chart";
import { transactionChartConfig1 } from "@/config/chartConfig";
import { DeleteLikeDialogBox } from "@/components/fragments/admin/global/DeleteDialogBox";
import { useRouter } from "next/navigation";

const TransactionTable = () => {
  const { replace } = useRouter();

  const [isViewTransactionDialogBoxOpen, setIsViewTransactionDialogBoxOpen] =
    useState(false);

  const [
    isDeleteTransactionDialogBoxOpen,
    setIsDeleteTransactionDialogBoxOpen,
  ] = useState(false);

  const handleDelete = (
    _: MouseEvent<HTMLButtonElement>,
    setIsOpen: Dispatch<SetStateAction<boolean>>
  ) => {
    setIsOpen(false);
  };

  const handleViewDetails = (
    _: MouseEvent<HTMLButtonElement>,
    setIsOpen: Dispatch<SetStateAction<boolean>>
  ) => {
    replace("/admin/transactions/1");
    setIsOpen(false);
  };

  const transactionsAdministrationDropdownConfig = {
    heading: "Open Menu",
    items: [
      {
        children: (
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText("123456")}
          >
            Copy transaction ID
          </DropdownMenuItem>
        ),
        key: "1",
        props: null,
        type: "",
      },
      {
        children: (
          <DeleteLikeDialogBox
            isOpen={isViewTransactionDialogBoxOpen}
            setIsOpen={setIsViewTransactionDialogBoxOpen}
            desc="Are you sure and want to saw this transaction details"
            handleClick={handleViewDetails}
            title="View transaction"
            variant="default"
          />
        ),
        key: "2",
        props: null,
        type: "",
      },
      {
        children: <DropdownMenuSeparator />,
        key: "3",
        props: null,
        type: "",
      },
      {
        children: (
          <DeleteLikeDialogBox
            isOpen={isDeleteTransactionDialogBoxOpen}
            setIsOpen={setIsDeleteTransactionDialogBoxOpen}
            desc="Are you sure and want to delete this transaction"
            handleClick={handleDelete}
            title="Delete transaction"
          />
        ),
        key: "5",
        props: null,
        type: "",
      },
    ],
  };
  const transactionsAdministrationHeadings: TableHeadings[] = [
    {
      Header: "Date",
      accessor: "createAt",
      type: "date",
    },
    {
      Header: "Amount",
      accessor: "amount",
      filterFn: "inNumberRange",
    },
    {
      Header: "Status",
      accessor: "status",
    },
  ];

  return (
    <div className="w-full scroll-smooth">
      <DataTable
        data={dummyTransactions}
        config={{
          filterBy: "amount",
          heading: "Transaction",
          dropdownConfig: transactionsAdministrationDropdownConfig,
          headings: transactionsAdministrationHeadings,
          isChart: true,
          Chart: (
            <Chart
              chartData={transactionData1}
              key={"12233"}
              config={{
                heading: "Transactions",
                chartConfig: transactionChartConfig1,
                chartEntries: ["withdrawal", "deposit"],
                classname: "my-5",
                desc: "Shows all the transactions till last month",
              }}
            />
          ),
        }}
      />
    </div>
  );
};

export default TransactionTable;
