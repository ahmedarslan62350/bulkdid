import React from "react";

export type UserForDataTable = {
  id: string;
  name: string;
  role: "user" | "admin";
  email: string;
  isVerified: boolean;
  createdAt: Date;
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  action?: Function;
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
  user: IUser;
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
  transactions: ITransaction[];
  currentPage: number;
  totalPages?: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

export interface FileUploadProps {
  onFileUpload: (file: File) => void;
  setRoleValue: (value: "both" | "fetching" | "checking") => void;
  roleValue: "both" | "fetching" | "checking";
  user?: IUser | null;
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

export interface IBankendError {
  response: { data: { message: string } };
}

export interface IUser extends Document {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  walletId: ObjectId;
  store: ObjectId;
  verifyCode: number;
  verifyCodeExpiry: Date | number;
  verifyCodeUsed: number;
  isVerified: boolean;
  isBlocked: boolean;
  isAllowedToFetch: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  sessions: string[];
  refreshToken: string;
  loginAttempts: number;
}

export interface ILoginBody {
  email: string;
  password: string;
}

export interface IFile {
  _id: ObjectId;
  ownerId: ObjectId;
  name: string;
  size: number;
  state: "pending" | "processing" | "completed" | "failed";
  totalCallerIds: number;
  callerIds: number[];
  type: "xlsx" | "csv" | ".csv" | ".xlsx";
  role: "checking-status" | "fetching" | "both";
  downloads: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IWallet {
  _id: ObjectId;
  ownerId: ObjectId;
  totalTransactions: number;
  balance: number;
  withdraws: number;
  deposits: number;
  accountNumber: string;
  BAT: number;
  BBT: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transactions: any;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITransaction {
  _id: ObjectId;
  comment: string;
  walletId: ObjectId;
  amount: number;
  type: "deposit" | "withdraw";
  to: string;
  from: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBank {
  _id: ObjectId;
  name: string;
  accountHolderName: string;
  accountNumber: number;
  icon: string;
  iconWidth: number;
  iconHeight: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IStore {
  _id: ObjectId;
  name: string;
  ownerId: ObjectId;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  files: any;
  fetchRequests: number;
  callerIdStores: ObjectId[];
  callerIds: number;
  agents: { ip: string; isAlowed: boolean }[];
  createdAt?: Date;
  updatedAt?: Date;
}


export interface AppSettings {
  ENV: string;
  PORT: string;
  SERVER_URL: string;
  FRONTEND_URL: string;
  WHATSAPP_SERVER_URL: string;
  PM2_APP_NAME: string;
  PM2_SCALE_CPU_USAGE: string;
  APP_INSTANCES: string;
  DATABASE_URL: string;
  DATABASE_NAME: string;
  JWT_TOKEN_SECRET: string;
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: string;
  POINTS_PER_SECOND: string;
  DURATION: string;
  NODE_MAILER_USER: string;
  NODE_MAILER_PASS: string;
  ADMIN_EMAIL: string;
  REDIS_HOST: string;
  REDIS_PORT: string;
  OPENAI_API_KEY: string;
  GEOLOCATION_API_URL: string;
  COST_PER_CALLERID_FETCH: string;
  COST_PER_CALLERID_CHECK: string;
  TIME_TO_UPDATE_LOG: string;
  DEFAULT_BANK_ICON_WIDTH: string;
  DEFAULT_BANK_ICON_HEIGHT: string;
  IS_REGISTRATION_ENABLE: string;
  PASSWORD_POLICY: string;
  SESSION_TIMEOUT: string;
  MAX_LOGIN_ATTEMPTS: string;
  MAX_LOGIN_ATTEMPTS_TIMEOUT: string;
  MAX_WITHDRAW: string;
  MAX_DEPOSITS: string;
  MAX_FILES: string;
  TRANSACTION_FEE_IN_PERCENT: string;
  DATA_RETENTION_PERIOD: string;
  LOGS_PERCISTENT_FREQUENCY_IN_DAYS: string;
  BACKUP_FQ: string;
  CACHE_TTL_IN_SECONDS: string;
  MAX_RETRIES_NOROMBO_RES: string;
  NOROMBO_URL: string;
  WHATSAPP_RECEPENT_NUMBER: string;
  WHATSAPP_SERVICE_ENABLED: string;
}