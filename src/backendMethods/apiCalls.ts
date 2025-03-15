import { ENV } from "@/config/env";
import { loginSchema } from "@/schemas/login";
import { registerSchema } from "@/schemas/register";
import { verifySchema } from "@/schemas/verify";
import axios from "axios";
import { z } from "zod";

export async function login(values: z.infer<typeof loginSchema>) {
  const { data } = await axios.post(ENV.BACKEND_URL + "/auth/login", values);
  return data;
}

export async function register(values: z.infer<typeof registerSchema>) {
  const { data } = await axios.post(ENV.BACKEND_URL + "/auth/register", values);
  return data;
}

export async function verify(values: z.infer<typeof verifySchema>) {
  const { data } = await axios.post(
    ENV.BACKEND_URL + `/auth/verify?verifyCode=${values.otp}`
  );
  return data;
}
