const fs = require('fs');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  console.log('Account balance:', (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory('Token');
  const token = await Token.deploy();

  console.log('Token address:', token.address);

  const data = {
    address: token.address,
    abi: JSON.parse(token.interface.format('json')),
  };

  fs.writeFileSync('client/public/Token.json', JSON.stringify(data));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
