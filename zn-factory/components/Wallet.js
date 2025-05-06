"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { connectWallet, getCurrentAddress } from "../lib/wallet";

export default function WalletUI() {
    const [address, setAddress] = useState("");

    const handleConnect = async () => {
        try {
            const addr = await connectWallet();
            setAddress(addr);
            toast.success("Wallet connected!");
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleDisconnect = () => {
        setAddress("");
        toast("Wallet disconnected.");
    };

    useEffect(() => {
        getCurrentAddress().then(setAddress);
    }, []);

    return (
        <div className="flex items-center space-x-4">
            {address ? (
                <>
                    <span className="text-green-400">Connected: {address.slice(0, 6)}...{address.slice(-4)}</span>
                    <button onClick={handleDisconnect} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 shadow-lg">
                        Disconnect
                    </button>
                </>
            ) : (
                <button onClick={handleConnect} className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 shadow-lg">
                    Connect Wallet
                </button>
            )}
        </div>
    );
}
