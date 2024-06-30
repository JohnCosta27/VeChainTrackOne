import { ethers } from "hardhat";

async function deployMugshot() {
  const [owner] = await ethers.getSigners();
  const lock = await ethers.getContractFactory("SimpleDeposit", owner);

  const ecoEarnInstance = await lock.deploy();

  const ecoEarnAddress = await ecoEarnInstance.getAddress();

  console.log(`FundA deployed to: ${ecoEarnAddress}`);
}

deployMugshot()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
