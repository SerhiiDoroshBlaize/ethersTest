import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useProvider } from "../context/Web3ProviderContext";

const NetworkSelector = () => {
  const { provider } = useProvider();
  const [selectNetwork, setSelectNetwork] = useState();
  const getNetwork = async () => {
    const chainId = await provider.send("eth_chainId");
    console.log(chainId);
    setSelectNetwork(chainId);
  };
  const switchNetwork = async (chainId) => {
    await provider.send("wallet_switchEthereumChain", [{ chainId }]);
  };

  useEffect(() => {
    getNetwork();
  }, []);

  useEffect(() => {
    if (selectNetwork) {
      switchNetwork(selectNetwork);
    }
  }, [selectNetwork]);
  return (
    <div>
      <div>{`Current Network: ${selectNetwork}`}</div>
      <select
        onChange={(e) => {
          setSelectNetwork(e.target.value);
        }}
        value={selectNetwork}
      >
        <option value="0x4">0x4</option>
        <option value="0x2a">0x2a</option>
        <option value="0x3">0x3</option>
      </select>
    </div>
  );
};

export default NetworkSelector;
