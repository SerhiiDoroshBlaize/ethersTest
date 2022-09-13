import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useProvider } from "../context/Web3ProviderContext";
import networkData from "../contract/networkData.json";

const NetworkSelector = () => {
  const { provider } = useProvider();
  const [selectNetwork, setSelectNetwork] = useState();
  const getNetwork = async () => {
    const { chainId } = await provider.getNetwork()
    console.log(chainId);
    setSelectNetwork( chainId );
  };
  const switchNetwork = async (network) => {
    const data = networkData.filter((el)=>{
      return el.chainId === Number(network)
    })[0]
   
    if(network === 1 || network ===3|| network === 4 || network ===5 || network === 42 ) {
      await provider.send("wallet_switchEthereumChain", [
        { chainId: `0x${Number(data.chainId).toString(16)}` },
      ]);
    } else {
      await provider.send("wallet_addEthereumChain", [
        {
          chainId: `0x${Number(data.chainId).toString(16)}`,
          rpcUrls: [data.rpc[0]],
          chainName: data.name,
          nativeCurrency: data.nativeCurrency,
          blockExplorerUrls: data.explorers
            ? [data.explorers[0].url]
            : null,
        },
      ]);
    }
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
    <div className='networkChainId'>
      <div>{`Current Network: ${1}`}</div>
      <select
      className='select'
        onChange={(e) => {
          setSelectNetwork(Number(e.target.value));
        }}
        value={selectNetwork}
      >
        {networkData.map((el, i) => {
          return (
            <option key={i} value={el.chainId}>
              {el.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default NetworkSelector;
