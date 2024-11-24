import React from "react";

export type UserForDataTable = {
  id: string;
  username: string;
  role: "user" | "admin";
  email: string;
  isVerified: boolean;
  createAt: Date;
};

export type TransactionForDataTable = {
  id: string;
  amount: number;
  status: "completed" | "pending" | "failed" | "processing";
  createAt: Date;
};

export interface TableHeadings {
  Header: string;
  accessor: string;
  Cell?: ({ value }) => React.ReactNode;
  HeaderProps?: {
    className?: string;
  };
  CellProps?: {
    className?: string;
  };
  disableSortBy?: boolean;
  disableHiding?: boolean;
  type?: string;
  filterFn?: string;
}

export interface TableDropdown {
  heading?: string;
  items?: React.ReactNode[];
}

export interface TableConfiguration {
  heading: string;
  filterBy: string;
  dropdownConfig: {
    items: React.ReactNode[];
    heading: string;
  };
  headings: TableHeadings[];
  isChart?: boolean;
  Chart?: React.ReactNode;
}

export type chartConfig = {
  heading: string;
  desc?: string;
  timeZone?: string;
  chartEntries: string[];
  classname?: string;
  chartConfig: Record<string, ChartEntry>;
};

type ChartEntry = {
  label: string;
  color?: string;
};

export type chartData = Record<string, string | number | object | array>;

export type TableData = Record<string, string | number | object | array>;

export type CloumnDefType = {
  Header: string;
  accessor: string;
  id: string;
  toggleSorting: (desc: boolean) => void;
  getIsSorted: () => "asc" | "desc" | false;
};

export interface Row {
  getValue: <T>(columnId: string) => T;
}
export interface Column {
  toggleSorting: <T>(Sorting: boolean) => T;
  getIsSorted: <T>() => T;
}

export interface CpuTimes {
  user: number;
  nice: number;
  sys: number;
  idle: number;
  irq: number;
}

export interface CpuInfo {
  model: string;
  speed: number;
  times: CpuTimes;
}

export type DropdownItem = {
  key: string | number;
  children: React.ReactNode;
  props: null | undefined | number | string;
  type: string | number;
};

export type SystemInfoRes = {
  cpuUsage: {
    cpuFree: number;
    cpuUsed: number;
  };
  memoryUsage: {
    memoryFree: number;
    memoryUsed: number;
    memoryTotal: number;
  };
  networkUsage: {
    MBSpeed: number;
    KBSpeed: number;
  };
} | null;