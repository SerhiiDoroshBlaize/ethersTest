import { useState } from "react";
import { ethers } from "ethers";
import { useProvider } from "../context/Web3ProviderContext";
import "../App.css";

const Header = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [account, setAccounts] = useState("");
  const { provider } = useProvider();
  const signIn = async () => {
    const account = await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setSignedIn(true);
    setAccounts(account[0]);
  };

  const signOut = () => {
    setSignedIn(false);
    setAccounts("");
  };
  return (
    <>
      {signedIn ? (
        <div className="header">
          <button className="button" onClick={signOut}>
            Disconnect
          </button>
          <div>{account}</div>
        </div>
      ) : (
        <div className="header">
          <button className="button" onClick={signIn}>
            Connect
          </button>
        </div>
      )}
    </>
  );
};

export default Header;
