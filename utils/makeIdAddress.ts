import { ethers } from 'ethers';

function makeIdAddress():string| null {
  try {
    const wallet = ethers.Wallet.createRandom();
    return wallet.address;
  } catch (error) {
    console.error("Error generating random address:", error);
    return null; // Handle errors or return null on failure
  }
}

export default makeIdAddress
