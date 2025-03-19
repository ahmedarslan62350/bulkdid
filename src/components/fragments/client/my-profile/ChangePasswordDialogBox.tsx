"use client";

import type React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { changePasswordFormSchema } from "@/schemas/changePassword";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IBankendError } from "@/utils/types";
import { useAppDispatch } from "@/redux/hooks";
import { updatePassword } from "@/redux/authSlice";

type PasswordFormValues = z.infer<typeof changePasswordFormSchema>;

interface ChangePasswordDialogBoxProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChangePasswordDialogBox: React.FC<ChangePasswordDialogBoxProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      logoutSessions: "current",
    },
  });

  async function handleSubmit(values: PasswordFormValues) {
    setIsLoading(true);
    try {
      const { payload } = await dispatch(updatePassword(values));

      toast({
        title: "Success",
        description: payload.message,
      });

      router.replace("/auth/login");
    } catch (error: unknown) {
      const err = error as IBankendError;

      toast({
        title: "Error",
        description: err?.response?.data?.message || "Something went wrong!",
        variant: "destructive",
      });

      console.error("Error Response:", err?.response);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter your current password and a new password to change your
            account password.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="current-password">Current Password</Label>
                  <FormControl>
                    <Input id="current-password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="new-password">New Password</Label>
                  <FormControl>
                    <Input id="new-password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <FormControl>
                    <Input id="confirm-password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logoutSessions"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="logoutSessions">Logout Sessions</Label>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="current">Current</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login into your account"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialogBox;
