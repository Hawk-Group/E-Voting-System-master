const Evoting = artifacts.require("Evoting");
const fs = require('fs');
const path = require('path');

module.exports = async function (deployer) {
  await deployer.deploy(Evoting);
  const instance = await Evoting.deployed();

  // Save contract address to file
  const contractAddress = instance.address;
  const contractAddressPath = path.join(__dirname, 'frontend', 'src', 'config', 'contract-address.json');

  // Create 'frontend/src/config' folder if not exists
  fs.mkdirSync(path.dirname(contractAddressPath), { recursive: true });

  fs.writeFileSync(contractAddressPath, JSON.stringify({ contractAddress }));

  console.log(`Contract deployed to: ${contractAddress}`);
};
