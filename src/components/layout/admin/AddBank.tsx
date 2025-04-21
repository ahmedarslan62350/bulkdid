"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IBankendError } from "@/utils/types";
import { toast } from "@/hooks/use-toast";
import axiosInstance from "@/lib/axiosInstance";
import { ENV } from "@/config/env";
import { addBankSchema } from "@/schemas/addBank";

export default function AddNewBankPage({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof addBankSchema>>({
    resolver: zodResolver(addBankSchema),
    defaultValues: {
      name: "",
      icon: "",
      accountHolderName: "",
      accountNumber: "",
      iconWidth: "",
      iconHeight: "",
    },
  });

  async function onSubmit(values: z.infer<typeof addBankSchema>) {
    console.log(values);
    setIsSubmitting(true);
    try {
      const { data } = await axiosInstance.post(
        `${ENV.BACKEND_URL}/bank/add-bank`,
        values
      );
      toast({
        title: "Success",
        description: data.message,
      });
      setIsOpen(false);
    } catch (error: unknown) {
      const err = error as IBankendError;
      toast({
        title: "Error",
        variant: "destructive",
        description: err.response.data.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full border-none shadow-none">
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter bank name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountHolderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Holder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter account holder name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter account number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/icon.png"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="iconWidth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Width of icon</FormLabel>
                  <FormControl>
                    <Input placeholder="30" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="iconHeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height of icon</FormLabel>
                  <FormControl>
                    <Input placeholder="30" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Adding Bank..." : "Add Bank"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
