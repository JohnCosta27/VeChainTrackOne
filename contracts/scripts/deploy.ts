import { ethers } from "hardhat";

async function deployMugshot() {
  const [owner] = await ethers.getSigners();
  const lock = await ethers.getContractFactory("Lock");

  const ecoEarnInstance = await lock.deploy(owner);

  const ecoEarnAddress = await ecoEarnInstance.getAddress();

  console.log(`EcoEarn deployed to: ${ecoEarnAddress}`);
}

deployMugshot()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
