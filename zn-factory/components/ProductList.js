"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";

const userStoreAbi = [
    "function nextProductId() view returns (uint256)",
    "function products(uint256) view returns (uint256 id, string name, uint256 price, uint256 quantity, uint256 listedAt, bool active)"
];

export default function ProductList({ userStoreAddress }) {
    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        if (!userStoreAddress || !window.ethereum) return;

        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(userStoreAddress, userStoreAbi, provider);

        try {
            const total = await contract.nextProductId();
            const loadedProducts = [];

            for (let i = 0; i < total; i++) {
                const product = await contract.products(i);
                loadedProducts.push(product);
            }

            setProducts(loadedProducts);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load products.");
        }
    };

    useEffect(() => {
        loadProducts();
    }, [userStoreAddress]);

    return (
        <div className="p-6 bg-gray-800 rounded-lg space-y-4 w-full max-w-3xl text-white">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">Product List</h2>

            {products.length === 0 && <p>No products listed yet.</p>}

            {products.map((p) => (
                <div key={p.id} className="p-4 border rounded bg-gray-900">
                    <h3 className="text-lg font-bold">{p.name}</h3>
                    <p>Price: {p.price.toString()} ZN</p>
                    <p>Quantity: {p.quantity.toString()}</p>
                    <p>Status: {p.active ? "Active" : "Expired"}</p>
                </div>
            ))}
        </div>
    );
}