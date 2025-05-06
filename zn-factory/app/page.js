"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { connectFactory } from "../lib/factory";
import { useRouter } from "next/navigation";
import WalletConnect from "../components/Wallet";

export default function HomePage() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [storeAddress, setStoreAddress] = useState(null);
  const router = useRouter();

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
  };

  // Check store after wallet connected
  useEffect(() => {
    if (!walletAddress) return;

    const fetchStore = async () => {
      const factory = connectFactory();
      const userStore = await factory.userStores(walletAddress);

      if (userStore !== "0x0000000000000000000000000000000000000000") {
        setStoreAddress(userStore);
        router.push("/store"); // Nếu có store → tự vào dashboard
      }
    };

    fetchStore();
  }, [walletAddress]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-10 bg-black text-white space-y-6">
      <h1 className="text-5xl font-bold text-purple-500">ZN STORE</h1>
      <p>Decentralized Store on Blockchain. Connect wallet to continue.</p>

      <WalletConnect
        walletAddress={walletAddress}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />

      {walletAddress && !storeAddress && (
        <p className="text-gray-400 mt-4">
          No store found yet.{" "}
          <span
            onClick={() => router.push("/store")}
            className="text-purple-400 underline cursor-pointer hover:text-purple-300"
          >
            Create your store now
          </span>
        </p>
      )}
    </main>
  );
}
