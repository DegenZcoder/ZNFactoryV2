import { ethers } from "ethers";

const TREASURY_ADDRESS = "0x7E6f33B57d7aaD6aB045953C3EB23989c7ae2049";
const TREASURY_ABI = [
    {
        "inputs":[{"internalType":"address","name":"_znToken","type":"address"},{"internalType":"uint256","name":"_initialReserve","type":"uint256"}],
        "stateMutability":"nonpayable","type":"constructor"
    },
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Allocated","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"contractAddress","type":"address"}],"name":"ApprovedContractAdded","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"contractAddress","type":"address"}],"name":"ApprovedContractRemoved","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},
    {"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"allocate","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"address","name":"contractAddress","type":"address"}],"name":"approveContract","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"approvedContracts","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"refill","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"address","name":"contractAddress","type":"address"}],"name":"removeApprovedContract","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[],"name":"totalReserve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"address","name":"newToken","type":"address"}],"name":"updateZNToken","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[],"name":"znToken","outputs":[{"internalType":"contract IZNToken","name":"","type":"address"}],"stateMutability":"view","type":"function"}
];

let contract;

export function connectTreasury(signerOrProvider) {
    contract = new ethers.Contract(TREASURY_ADDRESS, TREASURY_ABI, signerOrProvider);
    return contract;
}

export async function getTotalReserve() {
    return await contract.totalReserve();
}

export async function allocate(to, amount) {
    const tx = await contract.allocate(to, amount);
    return await tx.wait();
}

export async function refill(amount) {
    const tx = await contract.refill(amount);
    return await tx.wait();
}

export async function approveContract(contractAddress) {
    const tx = await contract.approveContract(contractAddress);
    return await tx.wait();
}

export async function removeApprovedContract(contractAddress) {
    const tx = await contract.removeApprovedContract(contractAddress);
    return await tx.wait();
}

export async function updateZNToken(newToken) {
    const tx = await contract.updateZNToken(newToken);
    return await tx.wait();
}

export async function transferOwnership(newOwner) {
    const tx = await contract.transferOwnership(newOwner);
    return await tx.wait();
}

export async function getOwner() {
    return await contract.owner();
}

export async function isApproved(contractAddress) {
    return await contract.approvedContracts(contractAddress);
}

export async function getZNToken() {
    return await contract.znToken();
}