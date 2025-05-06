"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { connectFactory } from "../lib/factory";
import { connectWallet } from "../lib/wallet";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [storeAddress, setStoreAddress] = useState(null);
  const router = useRouter();

  // Connect Wallet
  const handleConnect = async () => {
    const wallet = await connectWallet();
    if (wallet?.address) {
      setWalletAddress(wallet.address);
    }
  };

  // Check store when wallet connected
  useEffect(() => {
    if (!walletAddress) return;

    const fetchStore = async () => {
      const factory = connectFactory();
      const userStore = await factory.userStores(walletAddress);

      if (userStore !== "0x0000000000000000000000000000000000000000") {
        setStoreAddress(userStore);
        router.push("/store"); // Nếu có store → vào dashboard
      }
    };

    fetchStore();
  }, [walletAddress]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-10 bg-black text-white space-y-6">
      <h1 className="text-5xl font-bold text-purple-500">Welcome to ZN STORE</h1>
      <p>Connect your wallet to start using ZN Store.</p>

      <button onClick={handleConnect} className="px-6 py-3 bg-purple-600 rounded hover:bg-purple-700">
        {walletAddress ? `Connected: ${walletAddress}` : "Connect Wallet"}
      </button>

      {walletAddress && !storeAddress && (
        <p className="text-gray-400 mt-4">No store found. Please create your store in the dashboard.</p>
      )}
    </main>
  );
}
