"use client";

import User from "@/components/layout/admin/User";
import { IStore, IUser, IWallet } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/combinedStores";
import { getUserStore, getWalletsByAdmin } from "@/redux/slices/adminSlice";

const UserPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const users = useSelector((state: RootState) => state.admin.users);
  const [user, setUser] = useState<IUser | null>(null);
  const [wallet, setWallet] = useState<IWallet | null>(null);
  const [store, setStore] = useState<IStore | null>(null);
  const { id } = React.use(params);
  const dispatch = useDispatch<AppDispatch>();

  const stores = useSelector((state: RootState) => state.admin.userStore);
  const wallets = useSelector((state: RootState) => state.admin.wallets);

  useEffect(() => {
    const foundUser = users.find((e:IUser) => e._id === id);
    const userWallet = wallets.find(
      (wallet: IWallet) => wallet.ownerId === user?._id
    );
    const userStore = stores.find(
      (store: IStore) => store.ownerId === user?._id
    );

    setUser(foundUser || null);
    setWallet(userWallet || null);
    setStore(userStore || null);
  }, [id, users, stores, user, wallets]);

  useEffect(() => {
    if (user) {
      if (!store) {
        dispatch(getUserStore(user._id));
      } else if (!wallet) {
        dispatch(getWalletsByAdmin());
      }
    }
  }, [dispatch, user, store, wallet]);

  if (!user || !wallet || !store) return <p>Loading user data...</p>;

  return <User user={user} wallet={wallet} store={store} />;
};

export default UserPage;
