import { useContext } from 'react';
import './App.css';
import Token from './components/Token';
import Transfer from './components/Transfer';
import { Web3Context } from './providers/Web3Provider';

function App() {
  const { account, connectToWallet } = useContext(Web3Context);

  if (!account)
    return (
      <div>
        <button onClick={connectToWallet}>Connect to Metamask Wallet</button>
      </div>
    );

  return (
    <>
      <Token />
      <Transfer option="token" />
      <Transfer option="ether" />
    </>
  );
}

export default App;
