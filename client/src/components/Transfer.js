import React, { useContext, useRef } from 'react';
import { Web3Context } from '../providers/Web3Provider';

function Transfer({ option }) {
  const { sendToken, loading } = useContext(Web3Context);
  const amountRef = useRef(null);
  const addressRef = useRef(null);

  return (
    <div>
      <h1>Send {option} </h1>;
      <input
        placeholder={`amount in ${option}`}
        ref={amountRef}
        onChange={(e) => {
          amountRef.current.value = e.target.value;
        }}
      />
      <input
        placeholder="address"
        ref={addressRef}
        onChange={(e) => {
          addressRef.current.value = e.target.value;
        }}
      />
      <button
        onClick={() =>
          sendToken(addressRef?.current?.value, amountRef?.current?.value)
        }
      >
        {loading ? 'Loading...' : 'Send'}
      </button>
    </div>
  );
}

export default Transfer;
