"use client";

import { useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { connectFactory } from "../lib/factory";

const TIERS = [
  { value: 1, label: "Bronze" },
  { value: 2, label: "Silver" },
  { value: 3, label: "Gold" },
  { value: 4, label: "Platinum" },
  { value: 5, label: "Diamond" }
];

export default function CreateStoreForm({ walletAddress }) {
  const [storeName, setStoreName] = useState("");
  const [selectedTier, setSelectedTier] = useState(1);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateStore = async () => {
    if (!storeName || storeName.length < 6 || storeName.length > 35) {
      toast.error("Store name must be between 6 and 35 characters.");
      return;
    }

    try {
      setIsCreating(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const factory = connectFactory(signer);

      const tx = await factory.createStore(selectedTier, storeName);
      toast("Transaction submitted...");

      await tx.wait();
      toast.success("Store created successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create store.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg space-y-4">
      <h2 className="text-2xl text-purple-400 font-bold">Create Your Store</h2>

      <input
        type="text"
        placeholder="Enter Store Name"
        value={storeName}
        onChange={(e) => setStoreName(e.target.value)}
        className="w-full p-3 rounded bg-gray-700 text-white"
      />

      <select
        value={selectedTier}
        onChange={(e) => setSelectedTier(parseInt(e.target.value))}
        className="w-full p-3 rounded bg-gray-700 text-white"
      >
        {TIERS.map((tier) => (
          <option key={tier.value} value={tier.value}>{tier.label}</option>
        ))}
      </select>

      <button
        onClick={handleCreateStore}
        disabled={isCreating}
        className="w-full py-3 bg-purple-600 rounded hover:bg-purple-700 text-white disabled:opacity-50"
      >
        {isCreating ? "Creating..." : "Create Store"}
      </button>
    </div>
  );
}

