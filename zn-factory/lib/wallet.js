"use client";

import { ethers } from "ethers";

export async function connectWallet() {
    if (typeof window !== "undefined" && window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        return { provider, signer, address };
    } else {
        alert("Please install Metamask.");
        return null;
    }
}
