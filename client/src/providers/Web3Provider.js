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
  const [balance, setBalance] = useState(undefined);

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

      const tx = await contractWithSigner.transfer(address, amount.toString());
      const txReceipt = await tx.wait();
      console.log('receipt: ', txReceipt);

      await getBalance(account);

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
      const tx = await signer.sendTransaction({
        to: address,
        value: ethers.utils.parseEther(value.toString()).toHexString(),
      });
      await tx.wait();
      await getBalance(account);
    } catch (error) {
      console.log('error sending ether: ', error);
      setError(error.message);
    }
  };

  const getBalance = async (account) => {
    console.log(`getting balance of ${account}`);
    try {
      const tokenBalance = await contract.balanceOf(account.toString());
      const etherBalance = await web3.getBalance(account);
      console.log('ether balance: ', etherBalance.toString());
      console.log('token balance: ', tokenBalance.toString());
      setBalance({
        eth: ethers.utils.formatEther(etherBalance.toString()),
        token: tokenBalance.toString(),
      });
    } catch (error) {
      setError('error retrievng balance');
      console.log(error);
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
        balance,
        setBalance,
        setError,
        sendToken,
        sendEther,
        getBalance,
        connectToWallet,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export default Web3Provider;
