"use client";

import React, { Dispatch, MouseEvent, SetStateAction } from "react";

import { DataTable} from "@/components/fragments/admin/global/DataTable";
import { dummyUsers, userData1 } from "@/utils/dumyData";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { TableHeadings } from "@/utils/types";
import { Chart } from "@/components/fragments/admin/global/Chart";
import { userChartConfig1 } from "@/config/chartConfig";
import { DeleteDialogBox } from "@/components/fragments/admin/global/DeleteDialogBox";

const UserTable = () => {
  const handleDelete = (
    e: MouseEvent<HTMLButtonElement>,
    setIsOpen: Dispatch<SetStateAction<boolean>>
  ) => {
    console.log(e);
    setIsOpen(false);
  };

  const handleBlock = (
    e: MouseEvent<HTMLButtonElement>,
    setIsOpen: Dispatch<SetStateAction<boolean>>
  ) => {
    console.log(e);
    setIsOpen(false);
  };

  const usersAdministrationDropdownConfig = {
    heading: "Open Menu",
    items: [
      {
        children: (
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText("123456")}
          >
            Copy customer ID
          </DropdownMenuItem>
        ),
        key: "1",
        props: null,
        type: "",
      },
      {
        children: <DropdownMenuItem>View customer</DropdownMenuItem>,
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
          <DeleteDialogBox
            desc="Are you sure and want to block this user account"
            handleClick={handleBlock}
            title="Block customer"
          />
        ),
        key: "4",
        props: null,
        type: "",
      },
      {
        children: (
          <DeleteDialogBox
            desc="Are you sure and want to delete this user account"
            handleClick={handleDelete}
            title="Delete customer"
          />
        ),
        key: "5",
        props: null,
        type: "",
      },
    ],
  };
  const usersAdministrationHeadings: TableHeadings[] = [
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Username",
      accessor: "username",
    },
    {
      Header: "Role",
      accessor: "role",
    },
    {
      Header: "Created At",
      accessor: "createAt",
      type: "date",
    },
  ];

  return (
    <div className="w-full scroll-smooth">
      <DataTable
        data={dummyUsers}
        config={{
          filterBy: "email",
          heading: "User",
          dropdownConfig: usersAdministrationDropdownConfig,
          headings: usersAdministrationHeadings,
          isChart: true,
          Chart: (
            <Chart
              chartData={userData1}
              key={"12233"}
              config={{
                heading: "New Users",
                chartConfig: userChartConfig1,
                chartEntries: ["users"],
                classname: "my-5",
                desc: "Shows all the registerd users till last month",
              }}
            />
          ),
        }}
      />
    </div>
  );
};

export default UserTable;
