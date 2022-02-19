import React, { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import getWeb3 from '../utils/web3';

export const Web3Context = createContext();

function Web3Provider({ children }) {
  const [web3, setWeb3] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return alert('Please install metamask');

    try {
      setLoading(true);
      const { web3, contract, signer } = await getWeb3();
      const connectedAccounts = await window.ethereum.request({
        method: 'eth_accounts',
      });
      setWeb3(web3);
      setContract(contract);
      setSigner(signer);
      setAccount(connectedAccounts[0]);
      setLoading(false);
      setError('');
    } catch (error) {
      console.log('error: ', error);
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectToWallet = async () => {
    console.log('Connecting to wallet...');

    setLoading(true);
    try {
      const connectedAccounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount(connectedAccounts[0]);
      setLoading(false);
      setError('');
    } catch (e) {
      console.error(e);
      setLoading(false);
      if (e.code === 4001) {
        setError(e.message);
      }
    }
  };

  const sendToken = async (address, amount) => {
    console.log(`Sending ${amount} YBC tokens to ${address}`);
    try {
      setLoading(true);
      const contractWithSigner = await contract.connect(signer);

      await contractWithSigner.transfer(
        address,
        ethers.utils.parseUnits(amount.toString(), 18)
      );
      setLoading(false);
    } catch (error) {
      console.log('error sending token: ', error);
      setLoading(false);
      setError(error.message);
    }
  };

  const sendEther = async (address, value) => {
    console.log(`Sending ${value} ETH to ${address}`);
    try {
      await signer.sendTransaction({
        to: address,
        value: ethers.utils.parseEther(value.toString()).toHexString(),
      });
    } catch (error) {
      console.log('error sending ether: ', error);
      setError(error.message);
    }
  };

  window.ethereum.on('accountsChanged', ([newAccount]) => {
    setAccount(newAccount);
  });

  return (
    <Web3Context.Provider
      value={{
        web3,
        loading,
        error,
        contract,
        signer,
        account,
        setError,
        sendToken,
        sendEther,
        connectToWallet,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export default Web3Provider;
