// src/utils/loadBlockchain.js

import Web3 from "web3";
import Evoting from "../contracts/Evoting.json";

const loadBlockchain = async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();

    const deployedNetwork = Evoting.networks[networkId];

    if (!deployedNetwork) {
      throw new Error("Smart contract not deployed to the current network.");
    }

    const contract = new web3.eth.Contract(Evoting.abi, deployedNetwork.address);

    return { web3, accounts, contract };
  } else {
    alert("Please install MetaMask to use this application.");
  }
};

export default loadBlockchain;
