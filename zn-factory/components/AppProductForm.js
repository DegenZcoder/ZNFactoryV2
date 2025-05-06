"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";

export default function Wallet({ onConnect }) {
    const [address, setAddress] = useState("");

    const connectWallet = async () => {
        if (!window.ethereum) {
            toast.error("Please install Metamask.");
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            if (accounts.length > 0) {
                setAddress(accounts[0]);
                toast.success("Wallet connected!");
                if (onConnect) onConnect(accounts[0]);
            }
        } catch (err) {
            console.error(err);
            toast.error("Connection failed.");
        }
    };

    const disconnectWallet = () => {
        setAddress("");
        toast("Disconnected wallet.");
    };

    return (
        <div className="flex items-center space-x-4">
            {address ? (
                <>
                    <span className="text-green-400">Connected: {address.slice(0, 6)}...{address.slice(-4)}</span>
                    <button
                        onClick={disconnectWallet}
                        className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 shadow-lg"
                    >
                        Disconnect
                    </button>
                </>
            ) : (
                <button
                    onClick={connectWallet}
                    className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 shadow-lg"
                >
                    Connect Wallet
                </button>
            )}
        </div>
    );
}