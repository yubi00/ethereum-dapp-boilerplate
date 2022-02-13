import React, { useContext } from 'react';
import { Web3Context } from '../providers/Web3Provider';

function Token() {
  const { loading, contract, account } = useContext(Web3Context);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2> Yubi Token address: {contract?.address}</h2>
      {account && <h2> Account: {account} </h2>}
    </div>
  );
}

export default Token;
