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

export interface Transaction {
  _id: string;
  wallet_id: string;
  amount: string;
  type: string;
  status: string;
  from: string;
  to: string;
  timeStamp: Date | string;
  bankAccount: string;
  accountHolderName: string;
  bank: string;
  BBT: number;
  BAT: number;
}

export interface UserDetailsProps {
  user: User;
}

export interface Transaction {
  _id: string;
  amount: number;
  type: string;
  status: string;
  timeStamp: Date | string; // or string, depending on your data
  from: string;
  to: string;
  bankAccount: string;
  accountHolderName: string;
  bank: string;
  BBT: number;
  BAT: number;
  imageUrl?: string; // optional
}

export interface RecentTransaction {
  id: number;
  type: "deposit" | "withdrawal" | "transfer";
  amount: number;
  date: string;
  description: string;
}

export interface RecentTransactionsProps {
  transactions: RecentTransaction[];
}

export interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

export interface ManualInputProps {
  onManualInput: (callerIds: string[]) => void;
}

export interface UserFile {
  id: string;
  filename: string;
  filePath: string;
  size: number;
  type: string;
  lastModified: number;
  noOfCallerIds: number;
  extensionName: string;
  status: string;
  realname: string;
}

export interface SideBarNavItems {
  href: string;
  label: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

export interface FileDetails {
  _id?: string;
  id?: string;
  filename: string;
  filePath?: string;
  size?: number | string;
  type?: string;
  lastModified?: number | Date;
  noOfCallerIds: number;
  extensionName?: string;
  status: string;
  realname: string;
  __v?: string | number;
  owner: string;
}

export interface Wallet {
  _id: string;
  balance: number;
  currency: string;
  type: string;
  userId: string;
  totalWithdraw: number;
  totalDeposited: number;
  lastWithdraw: number | string;
  lastDeposited: number | string;
  totalBalanceCount: number;
  transactionsCount: number;
  transactions: Array<Transaction>;
  user_id: number | string;
  lastUpdated: number | string | Date;
}

export interface User {
  files: FileDetails[];
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  walletId: Wallet;
  createdAt: Date | string;
  updatedAt: Date | string;
  bio: string;
  isVerified: boolean;
  verifyCode: string | number;
  verifyCodeExpiry: string | number;
  verifyCodeLimit: number;
  profileImage: string;
  isLoggedInWithCredentials: boolean;
  isAdmin: boolean;
  isBlocked: boolean;
}
