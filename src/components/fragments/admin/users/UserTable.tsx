"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/fragments/admin/global/DataTable";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { IBankendError, IUser, TableHeadings } from "@/utils/types";
import { Chart } from "@/components/fragments/admin/global/Chart";
import { userChartConfig1 } from "@/config/chartConfig";
import { DeleteLikeDialogBox } from "@/components/fragments/admin/global/DeleteDialogBox";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/combinedStores";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { getUsersAnalytics } from "@/redux/slices/analyticsSlice";
import { getUsersByAdmin } from "@/redux/slices/adminSlice";
import { toast } from "@/hooks/use-toast";
import axiosInstance from "@/lib/axiosInstance";
import { ENV } from "@/config/env";

const UserTable = () => {
  const { replace } = useRouter();
  const [selectedUserActions, setselectedUserActions] = useState<IUser | null>(
    null
  );
  const [isViewDialogBoxOpen, setisViewDialogBoxOpen] = useState(false);
  const [isDeleteDialogBoxOpen, setisDeleteDialogBoxOpen] = useState(false);
  const [isBlockDialogBoxOpen, setisBlockDialogBoxOpen] = useState(false);

  const userAnalyticsData = useSelector(
    (state: RootState) => state.analytics.usersAnalytics
  ) as { dailyDistribution: object } | null;
  const usersData = useSelector(
    (state: RootState) => state.admin.users
  ) as IUser[];
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userAnalyticsData || Object.keys(userAnalyticsData).length === 0) {
      dispatch(getUsersAnalytics());
    }
    if (!usersData || usersData.length === 0) {
      dispatch(getUsersByAdmin());
    }
  }, [userAnalyticsData, usersData, dispatch]);

  if (!userAnalyticsData || !usersData) return null;

  const analyticsData = Object.entries(userAnalyticsData.dailyDistribution).map(
    ([date, users]) => ({
      date,
      users,
    })
  );

  const handleDelete = async () => {
    try {
      const { data } = await axiosInstance.post(
        `${ENV.BACKEND_URL}/admin/delete-user`,
        {
          user: selectedUserActions,
        }
      );

      toast({
        title: "Success",
        description: data.message,
      });
    } catch (error: unknown) {
      const err = error as IBankendError;
      toast({
        title: "Error",
        variant: "destructive",
        description: err.response.data.message,
      });
    }
  };
  const handleBlock = async () => {
    try {
      const { data } = await axiosInstance.post(
        `${ENV.BACKEND_URL}/admin/block-user`,
        {
          user: selectedUserActions,
        }
      );

      toast({
        title: "Success",
        description: data.message,
      });
    } catch (error: unknown) {
      const err = error as IBankendError;
      toast({
        title: "Error",
        variant: "destructive",
        description: err.response.data.message,
      });
    }
  };

  const handleViewDetails = () => {
    setisViewDialogBoxOpen(false);
    replace(`/admin/user/${selectedUserActions?._id}`);
  };

  const usersAdministrationDropdownConfig = {
    heading: "Open Menu",
    items: [
      {
        children: <DropdownMenuItem>Copy customer ID</DropdownMenuItem>,
        key: "1",
        props: null,
        type: "",
        action: (user: IUser) => {
          navigator.clipboard.writeText(user._id);
          toast({
            title: "Success",
            description: "UserId copied successfully",
          });
        },
      },
      {
        children: <DropdownMenuItem>View Customer</DropdownMenuItem>,
        key: "2",
        props: null,
        type: "",
        action: (user: IUser) => {
          setselectedUserActions(user);
          setisViewDialogBoxOpen(true);
        },
      },
      {
        children: <DropdownMenuSeparator />,
        key: "3",
        props: null,
        type: "",
      },
      {
        children: <DropdownMenuItem>Block Customer</DropdownMenuItem>,
        key: "4",
        props: null,
        type: "",
        action: (user: IUser) => {
          setselectedUserActions(user);
          setisBlockDialogBoxOpen(true);
        },
      },
      {
        children: <DropdownMenuItem>Delete Customer</DropdownMenuItem>,
        key: "5",
        props: null,
        type: "",
        action: (user: IUser) => {
          setselectedUserActions(user);
          setisDeleteDialogBoxOpen(true);
        },
      },
    ],
  };

  const usersAdministrationHeadings: TableHeadings[] = [
    { Header: "Username", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "Role", accessor: "role" },
    { Header: "Created At", accessor: "createdAt", type: "date" },
  ];

  return (
    <div className="w-full scroll-smooth">
      {/* Render the dialog box outside of the dropdown */}
      <DeleteLikeDialogBox
        desc="Are you sure and want to see this user account?"
        handleClick={handleViewDetails}
        title="View customer"
        variant="default"
        isOpen={isViewDialogBoxOpen}
        setIsOpen={setisViewDialogBoxOpen}
      />
      <DeleteLikeDialogBox
        desc="Are you sure you want to block this user?"
        handleClick={handleBlock}
        title="Block customer"
        isOpen={isBlockDialogBoxOpen}
        setIsOpen={setisBlockDialogBoxOpen}
      />
      <DeleteLikeDialogBox
        desc="Are you sure you want to delete this user?"
        handleClick={handleDelete}
        title="Delete customer"
        isOpen={isDeleteDialogBoxOpen}
        setIsOpen={setisDeleteDialogBoxOpen}
      />

      <DataTable
        data={usersData}
        config={{
          filterBy: "email",
          heading: "User",
          dropdownConfig: usersAdministrationDropdownConfig,
          headings: usersAdministrationHeadings,
          isChart: true,
          Chart: (
            <Chart
              chartData={analyticsData}
              key={"12233"}
              config={{
                heading: "New Users",
                chartConfig: userChartConfig1,
                chartEntries: ["users"],
                classname: "my-5",
                desc: "Shows all the registered users till last month",
              }}
            />
          ),
        }}
      />
    </div>
  );
};

export default UserTable;
