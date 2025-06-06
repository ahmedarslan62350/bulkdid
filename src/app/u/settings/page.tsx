/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { logoutUser } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/combinedStores";
import { getUserStore, updateUserAgents } from "@/redux/slices/userSlice";
import axiosInstance from "@/lib/axiosInstance";
import { ENV } from "@/config/env";
import { IBankendError, IUser } from "@/utils/types";

const page = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const store = useSelector((state: RootState) => state.user.userStore);
  const user = useSelector((state: RootState) => state.auth.user) as IUser;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!store) {
      dispatch(getUserStore());
    }
  }, [store, dispatch]);

  async function onClick() {
    try {
      await dispatch(logoutUser());
      toast({
        title: "Success",
        description: "logout successfully",
      });

      router.replace("/auth/login");
    } catch (error) {
      toast({
        title: "Error",
        description: (error as string) || "Something went wrong",
        variant: "destructive",
      });
    }
  }

  const handleUpdateSettings = (ip: string, isAllowed: boolean) => {
    dispatch(updateUserAgents({ ip, isAllowed }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (store) {
        const { data } = await axiosInstance.post(
          `${ENV.BACKEND_URL}/user-store/update`,
          { agents: store.agents, name: store.name }
        );

        toast({
          title: "Success",
          description: data.message,
        });
      }
    } catch (error: unknown) {
      const err = error as IBankendError;
      toast({
        title: "Error",
        variant: "destructive",
        description: err.response.data.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!store || !user) return <p>Loading...</p>;

  return (
    <>
      <div className="container mx-auto px-4 py-10 overflow-y-auto h-screen">
        <h1 className="text-4xl font-bold text-primary mb-8">Settings</h1>
        <div className=" w-full scroll-smooth flex flex-col gap-2">
          {user.isAllowedToFetch ? (
            <>
              {" "}
              <div className="w-full px-3 pl-5 rounded-md flex flex-col justify-between border bg-white border-gray-300 py-5">
                <h2 className="text-3xl font-bold text-primary">Your Store</h2>
                <div className="w-full gap-2 flex flex-col p-5 pl-0">
                  <h4 className="text-sm text-primary">
                    <span className="font-semibold text-base mr-2">Name:</span>{" "}
                    {store.name}
                  </h4>
                  <h4 className="text-sm text-primary">
                    <span className="font-semibold text-base mr-2">
                      Total files:
                    </span>{" "}
                    {store.files}
                  </h4>
                  <h4 className="text-sm text-primary">
                    <span className="font-semibold text-base mr-2">
                      Total callerIds:
                    </span>{" "}
                    {store.callerIds}
                  </h4>
                  <h4 className="text-sm text-primary">
                    <span className="font-semibold text-base mr-2">
                      Total agents:
                    </span>{" "}
                    {store.agents.length}
                  </h4>
                  <h4 className="text-sm text-primary">
                    <span className="font-semibold text-base mr-2">
                      Fetching URL:
                    </span>{" "}
                    {ENV.BACKEND_URL + "/callerId/fetch/" + store._id}/
                    <span className="underline font-semibold">12091212121</span>{" "}
                    ( CallerId )
                  </h4>
                  <h4 className="text-sm text-primary mt-4 bg-black text-white rounded px-5 py-2 w-fit">
                    <span className="font-semibold text-base mr-2">Note:</span>{" "}
                    The 0.02 USD will be reducted from your wallet at every call
                    on this API.
                  </h4>
                </div>
              </div>
              <div className="w-full py-5 px-3 pl-5 rounded-md flex flex-col justify-between border bg-white border-gray-300">
                <div className="flex justify-between pr-5">
                  <h2 className="text-3xl font-bold text-primary">
                    Your agents
                  </h2>
                  <Button
                    onClick={handleSave}
                    className="bg-green-500 text-xs hover:bg-green-600"
                  >
                    {isLoading ? "Loading..." : "Save"}
                  </Button>
                </div>

                <div className="w-full gap-2 flex flex-col p-5 pl-0">
                  {store.agents.length > 0 ? (
                    store.agents.map((agent) => (
                      <div key={agent.ip} className="w-full gap-2 flex items-center justify-between border border-gray-300 rounded py-2 px-5">
                        <h4 className="text-sm text-primary">
                          <span className="font-semibold text-base mr-2">
                            IP Address:
                          </span>{" "}
                          {agent.ip}
                        </h4>
                        <h4 className="text-sm text-primary flex justify-center items-center">
                          <span className="font-semibold text-base mr-2">
                            Allowed:
                          </span>{" "}
                          <Select
                            value={String(agent.isAlowed)}
                            onValueChange={(val) =>
                              handleUpdateSettings(agent.ip, JSON.parse(val))
                            }
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select value" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">True</SelectItem>
                              <SelectItem value="false">False</SelectItem>
                            </SelectContent>
                          </Select>
                        </h4>
                      </div>
                    ))
                  ) : (
                    <>
                      <p className="mx-auto text-xs text-gray-300">
                        No agents in this store
                      </p>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : null}

          <div className="w-full py-2 px-3 pl-5 rounded-md flex justify-between border bg-white border-gray-300">
            <div className="my-auto">Logout Account</div>
            <Button onClick={onClick} variant={"destructive"}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
