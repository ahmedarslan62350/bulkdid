"use client";

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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { verifySchema } from "@/schemas/verify";
import axios from "axios";
import { ENV } from "@/config/env";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { verify } from "@/backendMethods/apiCalls";

const resend_URL = `${ENV.BACKEND_URL}/auth/resend`;

type FormValues = z.infer<typeof verifySchema>;

export default function Verify() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(values: z.infer<typeof verifySchema>) {
    setIsLoading(true);
    try {
      const data = await verify(values);

      toast({
        title: "Success",
        description: data.message,
      });

      router.replace("/auth/login");
    } catch (error: unknown) {
      const err = error as { response: { data: { message: string } } };;

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

  async function onResend() {
    try {
      const { data } = await axios.post(
        resend_URL,
        {},
        { withCredentials: true }
      );

      toast({
        title: "Success",
        description: data.message,
      });
    } catch (error: unknown) {
      const err = error as { response: { data: { message: string } } };;

      toast({
        title: "Error",
        description: err?.response?.data?.message || "Something went wrong!",
        variant: "destructive",
      });

      console.error("Error Response:", err?.response);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Verify your account
          </CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to your email or phone
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-center py-4">
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          value={field.value}
                          onChange={field.onChange}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                    </div>
                    {form.formState.errors.otp && (
                      <FormDescription>
                        {form.formState.errors.otp.message}
                      </FormDescription>
                    )}
                    <FormMessage className="text-center" />
                  </FormItem>
                )}
              />
              <div className="text-center text-sm text-muted-foreground">
                Didn&apos;t receive a code?{" "}
                <button
                  type="button"
                  className="font-medium text-primary hover:underline"
                  onClick={onResend}
                >
                  Resend code
                </button>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Verify Account"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
