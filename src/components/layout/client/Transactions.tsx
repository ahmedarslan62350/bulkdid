/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import type { IBank, IBankendError } from "@/utils/types";
import { transactionSchema } from "@/schemas/transactionSchema";
import { reqTransaction } from "@/backendMethods/apiCalls";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/combinedStores";
import { useUserAppDispatch } from "@/redux/hooks/userHooks";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import { getBanks } from "@/redux/slices/userSlice";
import Image from "next/image";

// Define form schema with Zod

type FormValues = z.infer<typeof transactionSchema>;

export function TransactionForm() {
  const [selectedAccount, setSelectedAccount] = useState<IBank | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const dispatch = useUserAppDispatch();
  const checkAuth = useCheckAuth();
  const banks = useSelector((state: RootState) => state.user.banks) as IBank[];

  useEffect(() => {
    if (!banks || banks.length === 0) {
      dispatch(getBanks()).then(({ payload }) => {
        checkAuth(payload);
      });
    }
  }, [dispatch, checkAuth, banks]);

  const form = useForm<FormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      transactionType: "deposite",
      amount: "",
      accountId: "",
      withdrawAccountNumber: "",
    },
  });

  const transactionType = form.watch("transactionType");
  const selectedAccountId = form.watch("accountId");

  // Update selected account when account ID changes
  useEffect(() => {
    if (selectedAccountId) {
      const account =
        banks.find((acc) => acc.name === selectedAccountId) || null;
      setSelectedAccount(account);
    } else {
      setSelectedAccount(null);
    }
  }, [selectedAccountId, banks]);

  // Handle image upload
  const handleImageChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];

      // Check file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          variant: "destructive",
        });
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Image must be less than 5MB",
          variant: "destructive",
        });
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      form.setValue("file", files);
    }
  };

  // Handle form submission
  async function onSubmit(values: FormValues) {
    try {
      const formData = new FormData();

      if (
        values.transactionType === "withdraw" &&
        !values.withdrawAccountNumber
      ) {
        toast({
          title: "Error",
          description: "Please enter your account number for withdrawal.",
          variant: "destructive",
        });
        return;
      }

      if (values.transactionType === "deposite" && !values.file) {
        toast({
          title: "Error",
          description: "Please select an recipit to deposit to.",
          variant: "destructive",
        });
        return;
      }

      formData.append("type", values.transactionType);

      if (transactionType === "deposite") {
        if (values.file instanceof FileList && values.file.length > 0) {
          formData.append("image", values.file[0]);
        }
      } else {
        formData.append(
          "accountNumber",
          values.withdrawAccountNumber?.toString() || ""
        );
        formData.append("amount", values.amount?.toString() || "");
      }

      const res = await reqTransaction(formData);

      toast({
        title: "Transaction Successful",
        description: res.message,
      });

      // Reset form
      form.reset({
        transactionType: transactionType,
        amount: "",
        accountId: "",
        withdrawAccountNumber: "",
      });
      setImagePreview(null);
    } catch (error) {
      const err = error as IBankendError;
      toast({
        title: "Error",
        description: err?.response?.data?.message || "Something went wrong!",
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="w-full overflow-y-auto scroll-smooth">
      <CardHeader>
        <CardTitle>New Transaction</CardTitle>
        <CardDescription>
          Choose a transaction type and enter the details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="w-full h-full overflow-y-auto scroll-smooth"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="transactionType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="deposite" id="deposite" />
                          <Label htmlFor="deposit">Deposit</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="withdraw" id="withdraw" />
                          <Label htmlFor="withdraw">Withdraw</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {transactionType === "deposite" ? (
                <FormField
                  control={form.control}
                  name="accountId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deposit to Account</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger id="account">
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {banks &&
                            banks.map((account) => (
                              <SelectItem
                                key={account.name}
                                value={account.name}
                              >
                                {account.icon ? (
                                  <>
                                    <div className="flex items-center gap-2 w-full h-full">
                                      <img
                                        className={`flex justify-center rounded items-center`}
                                        alt="icon"
                                        src={account.icon}
                                        width={account.iconWidth}
                                        height={account.iconHeight}
                                      />
                                      <p>{account.name}</p>
                                    </div>
                                  </>
                                ) : (
                                  account.name
                                )}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <>
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter amount"
                            type="number"
                            min="0.01"
                            step="0.01"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="withdrawAccountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Account Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your account number"
                          />
                        </FormControl>
                        <FormDescription>
                          Please enter the account number from which you want to
                          withdraw funds.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {selectedAccount && transactionType === "deposite" && (
                <>
                  <div className="mt-4 rounded-md border p-4 bg-muted/50">
                    <h4 className="font-medium mb-2">Account Details</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Account Name:</span>{" "}
                        {selectedAccount.accountHolderName}
                      </p>
                      <p>
                        <span className="font-medium">Account Number:</span>{" "}
                        {selectedAccount.accountNumber}
                      </p>
                      <p>
                        <span className="font-medium">Bank:</span>{" "}
                        {selectedAccount.name}
                      </p>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="file"
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>Upload Receipt</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <div
                              className="border border-dashed rounded-md p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors"
                              onClick={() =>
                                document
                                  .getElementById("receipt-upload")
                                  ?.click()
                              }
                            >
                              <p className="text-sm text-muted-foreground">
                                Click to upload or drag and drop
                              </p>
                              <p className="text-xs text-muted-foreground">
                                PNG, JPG or JPEG (max 5MB)
                              </p>
                              <Input
                                id="receipt-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleImageChange(e.target.files)
                                }
                                {...fieldProps}
                              />
                            </div>

                            {imagePreview && (
                              <div className="relative">
                                <Image
                                  src={imagePreview || "/placeholder.svg"}
                                  alt="Receipt preview"
                                  className="w-full h-auto max-h-[200px] object-contain rounded-md border"
                                  width={100}
                                  height={100}
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  className="absolute top-2 right-2"
                                  onClick={() => {
                                    setImagePreview(null);
                                    form.setValue("file", undefined);
                                  }}
                                >
                                  Remove
                                </Button>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            <CardFooter className="flex justify-end pt-6 px-0">
              <Button type="submit">Process Transaction</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
