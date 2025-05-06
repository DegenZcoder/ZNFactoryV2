"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { FACTORY_ABI, FACTORY_ADDRESS } from "../lib/factory";

const TIER_LABELS = ["None", "Bronze", "Silver", "Gold", "Platinum", "Diamond"];

export default function TierStatus({ storeAddress }) {
    const [tier, setTier] = useState(null);

    const fetchTier = async () => {
        if (!storeAddress) return;

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, provider);

            // Tìm tier theo store address
            const userStoreTier = await contract.userStores(storeAddress);

            if (userStoreTier !== ethers.constants.AddressZero) {
                setTier(userStoreTier);
            }
        } catch (error) {
            console.error("Failed to fetch tier:", error);
        }
    };

    useEffect(() => {
        fetchTier();
    }, [storeAddress]);

    return (
        <div className="p-4 bg-gray-800 text-white rounded-lg mt-6 shadow">
            <h3 className="text-lg font-bold mb-2">Tier Status</h3>
            <p>
                {tier !== null ? `Tier: ${TIER_LABELS[tier]}` : "Loading..."}
            </p>
        </div>
    );
}