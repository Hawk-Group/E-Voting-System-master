
import React from 'react';

const ConnectWallet = ({ setWallet }) => {
  const handleConnect = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWallet(accounts[0]);
      } catch (error) {
        console.error('User denied wallet connection');
      }
    } else {
      alert('MetaMask not detected! Please install MetaMask.');
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <button onClick={handleConnect} className="vote-button">
        Connect MetaMask Wallet
      </button>
    </div>
  );
};

export default ConnectWallet;