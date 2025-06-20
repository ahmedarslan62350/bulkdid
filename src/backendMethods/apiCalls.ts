import { ENV } from "@/config/env";
import { changePasswordFormSchema } from "@/schemas/changePassword";
import { loginSchema } from "@/schemas/login";
import { registerSchema } from "@/schemas/register";
import { verifySchema } from "@/schemas/verify";
import axios from "axios";
import { z } from "zod";

export async function login(values: z.infer<typeof loginSchema>) {
  const { data } = await axios.post(ENV.BACKEND_URL + "/auth/login", values, {
    withCredentials: true,
  });
  return data;
}

export async function logout() {
  const { data } = await axios.post(ENV.BACKEND_URL + "/auth/logout", {
    withCredentials: true,
  });
  return data;
}

export async function register(values: z.infer<typeof registerSchema>) {
  const { data } = await axios.post(
    ENV.BACKEND_URL + "/auth/register",
    values,
    {
      withCredentials: true,
    }
  );
  return data;
}

export async function verify(values: z.infer<typeof verifySchema>) {
  const { data } = await axios.post(
    ENV.BACKEND_URL + `/auth/verify?verifyCode=${values.otp}`,
    {
      withCredentials: true,
    }
  );
  return data;
}

export async function downloadFile(fileId: string) {
  const { data } = await axios.post(
    ENV.BACKEND_URL + `/file/download`,
    {
      fileId,
    },
    { responseType: "blob", withCredentials: true }
  );
  return data;
}

export async function uploadFile(formData: FormData) {
  const { data } = await axios.post(
    ENV.BACKEND_URL + `/file/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
  return data;
}

export async function changePassowrd(
  values: z.infer<typeof changePasswordFormSchema>
) {
  const { data } = await axios.post(
    ENV.BACKEND_URL + `/auth/update-password`,
    values,
    {
      withCredentials: true,
    }
  );
  return data;
}

export async function getBanks() {
  const { data } = await axios.post(ENV.BACKEND_URL + `/bank/get-banks`, {
    withCredentials: true,
  });
  return data;
}

export async function reqTransaction(formData: FormData) {
  const { data } = await axios.post(
    ENV.BACKEND_URL + `/wallet/req-transaction`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
  return data;
}
