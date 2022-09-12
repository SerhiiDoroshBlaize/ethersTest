import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useProvider } from "../context/Web3ProviderContext";
import { CONTRACT_ADDRESS } from "../contract/contractConstants";
import contractABI from "../contract/contractABI.json";

const EthersBlock = () => {
  const { provider } = useProvider();
  const [network, setNetwork] = useState("");
  const getNetwork = async () => {
    const networkData = await provider.getNetwork();
    setNetwork(networkData);
  };

  window.ethereum.on("chainChanged", (_chainId) => window.location.reload());
  useEffect(() => {
    getNetwork();
  }, [provider]);
  //   getNetwork();
  console.log(network);

  const handleSetCustomNetwork = () => {
    provider.send("wallet_addEthereumChain", [
      {
        chainId: "0x61",
        rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
        chainName: "Smart Chain - Testnet",
        nativeCurrency: {
          name: "BNB",
          symbol: "BNB",
          decimals: 18,
        },
        blockExplorerUrls: ["https://testnet.bscscan.com"],
      },
    ]);
  };

  const switchNetwork = async (chainId) => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });
  };

  const handleShowContractName = async () => {
    if (network.chainId && network.chainId === 4) {
      console.log("I here");
      const name = await contract.name();
      console.log(name);
    } else {
      switchNetwork("0x4");
    }
  };

  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
  return (
    <div className="block">
      <h2>This is network data</h2>
      <h4>{`chainId: ${network.chainId}`}</h4>
      <button className="button" onClick={handleSetCustomNetwork}>
        Change network to BSC -testnet
      </button>
      <button className="button" onClick={handleShowContractName}>
        Show contract name
      </button>
    </div>
  );
};

export default EthersBlock;
