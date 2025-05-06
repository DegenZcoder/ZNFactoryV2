{storeAddress && storeAddress !== "0x0000000000000000000000000000000000000000" ? (
    <StoreHeader storeName={storeName} storeAddress={storeAddress} />
) : (
    <p className="text-gray-400">No Store yet. Please create your store.</p>
)}
