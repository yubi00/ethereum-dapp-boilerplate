import { useContext } from 'react';
import './App.css';
import Token from './components/Token';
import { Web3Context } from './providers/Web3Provider';

function App() {
  const { account, connectToWallet } = useContext(Web3Context);

  if (!account)
    return (
      <div>
        <button onClick={connectToWallet}>Connect to Metamask Wallet</button>
      </div>
    );

  return <Token />;
}

export default App;
