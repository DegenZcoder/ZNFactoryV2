import { ethers } from "ethers";

// ABI of ZNFactory
export const FACTORY_ABI = [
    {
        "inputs": [
            { "internalType": "address", "name": "_treasury", "type": "address" },
            { "internalType": "address", "name": "_userStoreImplementation", "type": "address" }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "address", "name": "user", "type": "address" },
            { "indexed": false, "internalType": "address", "name": "store", "type": "address" },
            { "indexed": false, "internalType": "enum ZNStoreFactory.Tier", "name": "tier", "type": "uint8" },
            { "indexed": false, "internalType": "string", "name": "storeName", "type": "string" }
        ],
        "name": "StoreCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "address", "name": "store", "type": "address" }
        ],
        "name": "StoreRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "enum ZNStoreFactory.Tier", "name": "tier", "type": "uint8" },
            { "indexed": false, "internalType": "uint256", "name": "allocation", "type": "uint256" },
            { "indexed": false, "internalType": "uint256", "name": "maxProducts", "type": "uint256" },
            { "indexed": false, "internalType": "uint256", "name": "feePerDayBP", "type": "uint256" },
            { "indexed": false, "internalType": "uint256", "name": "maxListingDays", "type": "uint256" }
        ],
        "name": "TierRuleUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "address", "name": "newTreasury", "type": "address" }
        ],
        "name": "TreasuryChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "address", "name": "newImplementation", "type": "address" }
        ],
        "name": "UserStoreImplementationChanged",
        "type": "event"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "name": "allStores",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "_treasury", "type": "address" }],
        "name": "changeTreasury",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "_implementation", "type": "address" }],
        "name": "changeUserStoreImplementation",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "enum ZNStoreFactory.Tier", "name": "tier", "type": "uint8" },
            { "internalType": "string", "name": "storeName", "type": "string" }
        ],
        "name": "createStore",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllStores",
        "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }],
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
        "inputs": [{ "internalType": "address", "name": "store", "type": "address" }],
        "name": "removeStore",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "name": "storeNames",
        "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "enum ZNStoreFactory.Tier", "name": "", "type": "uint8" }],
        "name": "tierRules",
        "outputs": [
            { "internalType": "uint256", "name": "allocation", "type": "uint256" },
            { "internalType": "uint256", "name": "maxProducts", "type": "uint256" },
            { "internalType": "uint256", "name": "feePerDayBP", "type": "uint256" },
            { "internalType": "uint256", "name": "maxListingDays", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "treasury",
        "outputs": [{ "internalType": "contract IZNTreasury", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "enum ZNStoreFactory.Tier", "name": "tier", "type": "uint8" },
            { "internalType": "uint256", "name": "allocation", "type": "uint256" },
            { "internalType": "uint256", "name": "maxProducts", "type": "uint256" },
            { "internalType": "uint256", "name": "feePerDayBP", "type": "uint256" },
            { "internalType": "uint256", "name": "maxListingDays", "type": "uint256" }
        ],
        "name": "updateTierRule",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "userStoreImplementation",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "name": "userStores",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    }
];

// Factory contract address
export const FACTORY_ADDRESS = "0x2A55BEd0A7D78Ea2cea49A118beAEFe116C9dd5b";

/**
 * Connect Factory contract
 * @param {ethers.Signer | ethers.providers.Provider} signerOrProvider
 * @returns {ethers.Contract}
 */
export function connectFactory(signerOrProvider) {
    return new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, signerOrProvider);
}