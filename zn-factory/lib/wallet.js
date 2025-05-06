import { ethers } from "ethers";

export async function connectWallet() {
    if (!window.ethereum) throw new Error("Please install Metamask");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    return accounts[0] ?? null;
}

export async function getCurrentAddress() {
    if (!window.ethereum) return null;

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.listAccounts();
    return accounts[0] ?? null;
}
