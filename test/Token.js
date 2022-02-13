const { expect } = require('chai');

let Token;
let hardhatToken;
let owner;
let addr1;
let addr2;
let addrs;

beforeEach(async function () {
  Token = await ethers.getContractFactory('Token');
  [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

  hardhatToken = await Token.deploy();
});

describe('Token contract', () => {
  it('Deployment should assign the total supply of tokens to the owner', async () => {
    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });

  it('should transfer tokens between accounts', async () => {
    const ownerInitialBalance = await hardhatToken.balanceOf(owner.address);
    const amount = 150;

    await hardhatToken.transfer(addr1.address, amount);

    expect(await hardhatToken.balanceOf(owner.address)).to.equal(
      ownerInitialBalance.sub(amount)
    );

    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(amount);
  });

  it('Should fail if sender doesn’t have enough tokens', async function () {
    const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

    await expect(
      hardhatToken.connect(addr2).transfer(owner.address, 1)
    ).to.be.revertedWith('Not enough tokens');

    expect(await hardhatToken.balanceOf(owner.address)).to.equal(
      initialOwnerBalance
    );
  });
});
