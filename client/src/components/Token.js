import React, { useContext, useEffect } from 'react';
import { Web3Context } from '../providers/Web3Provider';
import { Link } from 'react-router-dom';

function Token() {
  const { contract, account, getBalance, balance } = useContext(Web3Context);

  useEffect(() => {
    getBalance(account);
  }, [account]);

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
