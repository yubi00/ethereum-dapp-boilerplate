import { ethers } from 'ethers';
import getAbi from './abi';

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        console.log('connected to metamask');
        const web3 = new ethers.providers.Web3Provider(window.ethereum);
        const signer = web3.getSigner();
        try {
          const token = await getAbi();
          const contract = new ethers.Contract(
            token.address,
            token.abi,
            signer
          );

          // Acccounts now exposed
          resolve({ web3, signer, contract });
        } catch (error) {
          reject(error);
        }
      }
      // Fallback to localhost or public eth network such as infura; use dev console port by default...
      else {
        console.log('connected to infura');
        //for connection to main net
        // provider = new ethers.providers.getDefaultProvider()
        const provider = new ethers.providers.InfuraProvider(
          'ropsten',
          process.env.REACT_APP_INFURA_PRIVATE_KEY
        );
        const web3 = new ethers.providers.Web3Provider(provider);
        const signer = web3.getSigner();
        const token = await getAbi();
        const contract = new ethers.Contract(token.address, token.abi, signer);
        console.log('web3 loaded from infura');
        resolve({ web3, signer, contract });
      }
    });
  });

export default getWeb3;
