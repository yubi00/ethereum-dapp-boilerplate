import React, { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';

function Token() {
  const { contract, account, web3 } = useContext(Web3Context);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const tokenBalance = await contract.balanceOf(account.toString());
        const balance = await web3.getBalance(account);
        setBalance({
          eth: ethers.utils.formatEther(balance),
          token: ethers.utils.formatUnits(tokenBalance, 18),
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [web3, contract, account]);

  return (
    <div>
      <h2> Yubi Token address: {contract?.address}</h2>
      {account && <h2> Account: {account} </h2>}
      {balance && <h2>Balance (ETH): {balance.eth} ETH</h2>}
      {balance && <h2>Balance (YBC): {balance.token} YBC</h2>}

      <Link to="/send-token">Send Token</Link>
      <Link to="/send-ether">Send Ether</Link>
    </div>
  );
}

export default Token;
