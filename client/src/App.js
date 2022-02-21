import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Token from './components/Token';
import Transfer from './components/Transfer';
import { Web3Context } from './providers/Web3Provider';

function App() {
  const { account, connectToWallet, sendEther, sendToken } =
    useContext(Web3Context);

  if (!account)
    return (
      <div>
        <button onClick={connectToWallet}>Connect to Metamask Wallet</button>
      </div>
    );

  return (
    <BrowserRouter>
      <Token />
      <Routes>
        <Route
          path="/send-token"
          element={<Transfer option="Token" send={sendToken} />}
        />
        <Route
          path="/send-ether"
          element={<Transfer option="Ether" send={sendEther} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
