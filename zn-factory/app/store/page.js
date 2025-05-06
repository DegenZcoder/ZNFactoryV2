"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import WalletConnect from "../../components/Wallet";
import StoreHeader from "../../components/StoreHeader";
import ProductList from "../../components/ProductList";
import AppProductForm from "../../components/AppProductForm";
import TierStatus from "../../components/TierStatus";
import CreateStoreForm from "../../components/CreateStoreForm";
import { connectFactory } from "../../lib/factory";
import { connectUserStore } from "../../lib/userstore";

export default function StorePage() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [storeAddress, setStoreAddress] = useState(null);
  const [storeName, setStoreName] = useState("");
  const [storeInfo, setStoreInfo] = useState(null);

  const handleConnect = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    setWalletAddress(address);
  };

  const handleDisconnect = () => {
    setWalletAddress(null);
    setStoreAddress(null);
    setStoreName("");
    setStoreInfo(null);
  };

  const fetchStore = async () => {
    if (!walletAddress) return;

    const factory = connectFactory();
    const userStoreAddr = await factory.userStores(walletAddress);

    if (userStoreAddr === "0x0000000000000000000000000000000000000000") {
      setStoreAddress(null);
      return;
    }

    setStoreAddress(userStoreAddr);

    const userStore = connectUserStore(userStoreAddr);
    const [owner, name, znBalance, maxProducts, feePerDayBP, maxListingDays] = await userStore.getStoreInfo();
    setStoreName(name);
    setStoreInfo({
      owner,
      znBalance,
      maxProducts,
      feePerDayBP,
      maxListingDays
    });
  };

  useEffect(() => {
    if (!walletAddress) return;
    fetchStore();
  }, [walletAddress]);

  return (
    <main className="flex flex-col items-center justify-center p-8 space-y-8 text-white bg-black min-h-screen">
      <h1 className="text-4xl font-bold text-purple-400">ZN STORE DASHBOARD</h1>

      <WalletConnect
        walletAddress={walletAddress}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />

      {!walletAddress && <p className="text-gray-400">Please connect wallet.</p>}

      {walletAddress && !storeAddress && (
        <div>
          <p className="text-gray-400 mb-4">No store yet. Please create your store.</p>
          <CreateStoreForm walletAddress={walletAddress} />
        </div>
      )}

      {walletAddress && storeAddress && (
        <>
          <StoreHeader storeName={storeName} storeAddress={storeAddress} storeInfo={storeInfo} />
          <ProductList storeAddress={storeAddress} />
          <AppProductForm storeAddress={storeAddress} />
          <TierStatus storeAddress={storeAddress} />
        </>
      )}
    </main>
  );
}
