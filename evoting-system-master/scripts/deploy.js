async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Evoting = await ethers.getContractFactory("Evoting");
  const evoting = await Evoting.deploy();

  console.log("Evoting contract deployed to:", evoting.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
  // Deploying contracts with the account: 0x07CC4E6C47146615fea39BB0beB5AC1111766C33
 