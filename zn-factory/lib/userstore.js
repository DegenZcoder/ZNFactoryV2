import { ethers } from "ethers";

// ABI of UserStoreLogic
export const USERSTORE_ABI = [
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" },
            { "indexed": false, "internalType": "string", "name": "name", "type": "string" },
            { "indexed": false, "internalType": "uint256", "name": "price", "type": "uint256" },
            { "indexed": false, "internalType": "uint256", "name": "quantity", "type": "uint256" }
        ],
        "name": "ProductListed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" },
            { "indexed": false, "internalType": "address", "name": "buyer", "type": "address" },
            { "indexed": false, "internalType": "uint256", "name": "quantity", "type": "uint256" },
            { "indexed": false, "internalType": "uint256", "name": "fee", "type": "uint256" }
        ],
        "name": "ProductSold",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "feePerDayBP",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getStoreInfo",
        "outputs": [
            { "internalType": "address", "name": "", "type": "address" },
            { "internalType": "string", "name": "", "type": "string" },
            { "internalType": "uint256", "name": "", "type": "uint256" },
            { "internalType": "uint256", "name": "", "type": "uint256" },
            { "internalType": "uint256", "name": "", "type": "uint256" },
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "_owner", "type": "address" },
            { "internalType": "address", "name": "_znToken", "type": "address" },
            { "internalType": "string", "name": "_storeName", "type": "string" },
            { "internalType": "uint256", "name": "allocation", "type": "uint256" },
            { "internalType": "uint256", "name": "_maxProducts", "type": "uint256" },
            { "internalType": "uint256", "name": "_feePerDayBP", "type": "uint256" },
            { "internalType": "uint256", "name": "_maxListingDays", "type": "uint256" }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "initialized",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "string", "name": "name", "type": "string" },
            { "internalType": "uint256", "name": "price", "type": "uint256" },
            { "internalType": "uint256", "name": "quantity", "type": "uint256" }
        ],
        "name": "listProduct",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "maxListingDays",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "maxProducts",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "nextProductId",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "productId", "type": "uint256" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }, { "internalType": "address", "name": "buyer", "type": "address" }],
        "name": "sell",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "storeName",
        "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "znBalance",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "znToken",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    }
];

// Deployed contract address (UserStoreLogic)
export const USERSTORE_LOGIC_ADDRESS = "0x916241eCdC9e9c228b9591BCB57e15439a4B7790";

/**
 * Connect User Store contract
 * @param {string} address - Store address
 * @param {ethers.Signer | ethers.providers.Provider} signerOrProvider
 * @returns {ethers.Contract}
 */
export function connectUserStore(address, signerOrProvider) {
    return new ethers.Contract(address, USERSTORE_ABI, signerOrProvider);
}