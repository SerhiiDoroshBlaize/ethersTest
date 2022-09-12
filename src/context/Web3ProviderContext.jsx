import { ethers } from "ethers";
import React, { useCallback, useContext, useEffect, useState } from "react";

const WalletSelectorContext = React.createContext(null);

export const Web3ProviderContext = ({ children }) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return (
    <WalletSelectorContext.Provider value={{ provider }}>
      {children}
    </WalletSelectorContext.Provider>
  );
};

export const useProvider = () => {
  const context = useContext(WalletSelectorContext);

  if (!context) {
    throw new Error("Provider not found");
  }

  return context;
};
