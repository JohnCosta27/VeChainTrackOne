import { ethers } from "hardhat";

async function deployMugshot() {
  const [owner] = await ethers.getSigners();
  const lock = await ethers.getContractFactory("Lock", owner);

  const ecoEarnInstance = await lock.deploy(30000000000000000n);

  const ecoEarnAddress = await ecoEarnInstance.getAddress();

  console.log(`EcoEarn deployed to: ${ecoEarnAddress}`);
}

deployMugshot()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
