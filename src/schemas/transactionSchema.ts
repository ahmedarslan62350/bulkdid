import { z } from "zod";

export const transactionSchema = z.object({
  transactionType: z.enum(["deposite", "withdraw"]),
  amount: z.string().optional(),
  accountId: z.string().optional(),
  withdrawAccountNumber: z.string().optional(),
  file: z.instanceof(FileList).optional(),
});
