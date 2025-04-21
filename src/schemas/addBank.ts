import { z } from "zod";

export const addBankSchema = z.object({
  name: z.string().min(2, {
    message: "Bank name must be at least 2 characters.",
  }),
  icon: z.string().url({
    message: "Please enter a valid URL for the icon.",
  }),
  iconWidth: z.string({
    message: "Please enter a valid width for the icon.",
  }),
  iconHeight: z.string({
    message: "Please enter a valid height for the icon.",
  }),
  accountHolderName: z.string().min(2, {
    message: "Account holder name must be at least 2 characters.",
  }),
  accountNumber: z.string().min(5, {
    message: "Account number must be at least 5 characters.",
  }),
});
