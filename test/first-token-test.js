const { expect } = require("chai");
const { ethers } = require("hardhat");

let owner, addr1, addr2, Token, hardhatToken;

beforeEach(async () => {
  [owner, addr1, addr2] = await ethers.getSigners();
  Token = await ethers.getContractFactory("FirstToken");
  hardhatToken = await Token.deploy(365);
});

describe("Token contract", () => {
  describe("when we deploy the contract", () => {
    it("should assign the total supply of tokens to the owner", async () => {
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("when we transfer tokens from owner to another account", async () => {
    describe("and the owner has enough tokens", () => {
      it("should reduce the owner balance and increase the receiver balance by the amount", async () => {
        const transferAmount = 100;
        const originalOwnerBalance = await hardhatToken.balanceOf(
          owner.address
        );
        const originalAddr1Balance = await hardhatToken.balanceOf(
          addr1.address
        );
        await hardhatToken.transfer(addr1.address, transferAmount);
        const newOwnerBalance = await hardhatToken.balanceOf(owner.address);
        const newAddr1Balance = await hardhatToken.balanceOf(addr1.address);
        expect(newOwnerBalance).to.equal(originalOwnerBalance - transferAmount);
        expect(newAddr1Balance).to.equal(
          Number(originalAddr1Balance) + Number(transferAmount)
        );
      });
    });

    describe("and the owner has not enough tokens", () => {
      it("should revert the transfer", async () => {
        const transferAmount = 400;
        await expect(hardhatToken.transfer(addr1.address, transferAmount)).to.be
          .reverted;
      });
    });
  });

  describe("when we allow an account to transfer tokens on behalf of another", async () => {
    it("should add the delegate account to list of allowed delegates", async () => {
      const approvedAmount = 100;
      await hardhatToken.approve(addr1.address, approvedAmount);
      const allowedAmount = await hardhatToken.allowance(
        owner.address,
        addr1.address
      );
      expect(approvedAmount).to.equal(allowedAmount);
    });

    it("should authorize a transfer made by a delegate on behalf of an account", async () => {
      const approvedAmount = 100;
      const transferAmount = approvedAmount;
      await hardhatToken.approve(addr1.address, approvedAmount);

      const originalOwnerBalance = await hardhatToken.balanceOf(owner.address);
      const originalAddr2Balance = await hardhatToken.balanceOf(addr2.address);

      await hardhatToken
        .connect(addr1)
        .transferFrom(owner.address, addr2.address, transferAmount);

      const newOwnerBalance = await hardhatToken.balanceOf(owner.address);
      const newAddr2Balance = await hardhatToken.balanceOf(addr2.address);

      expect(newOwnerBalance).to.equal(originalOwnerBalance - approvedAmount);
      expect(newAddr2Balance).to.equal(
        Number(originalAddr2Balance) + Number(approvedAmount)
      );
    });

    it("should not allow a transfer if the token amount is bigger than the allowed amount", async () => {
      const approvedAmount = 100;
      const transferAmount = 200;
      await hardhatToken.approve(addr1.address, approvedAmount);

      await expect(
        hardhatToken
          .connect(addr1)
          .transferFrom(owner.address, addr2.address, transferAmount)
      ).to.be.reverted;
    });

    it("should not allow a transfer if the initiator is not allowed", async () => {
      const transferAmount = 100;
      await expect(
        hardhatToken
          .connect(addr2)
          .transferFrom(owner.address, addr2.address, transferAmount)
      ).to.be.reverted;
    });
  });
});
