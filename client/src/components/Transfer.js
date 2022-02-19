import React, { useContext, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

function Transfer({ option, send }) {
  const { loading, error, setError } = useContext(Web3Context);
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount === '' || address === '') {
      setError('Please enter both of the address and amount');
      return;
    }

    send(address, amount);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Send {option} </h1>
      {error && <h3>{error}</h3>}
      <input
        value={amount}
        placeholder={`amount in ${option}`}
        onChange={(e) => {
          setAmount(e.target.value);
          setError('');
        }}
      />
      <input
        value={address}
        placeholder="address"
        onChange={(e) => {
          setAddress(e.target.value);
          setError('');
        }}
      />
      <button type="submit">{loading ? 'Loading...' : 'Send'}</button>
    </form>
  );
}

export default Transfer;
