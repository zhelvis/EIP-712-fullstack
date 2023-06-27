import { task } from 'hardhat/config';

task('deploy', 'Deploy example contract').setAction(async (_, { ethers }) => {
    const Messenger = await ethers.getContractFactory('Messenger');
    const messenger = await Messenger.deploy();
    await messenger.waitForDeployment();
    const address = await messenger.getAddress();
    console.log('Contract address: ', address);
});
