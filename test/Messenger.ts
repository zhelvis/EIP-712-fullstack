import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers, network } from 'hardhat';
import { Messenger } from '../typechain-types';
import { DataSigner } from '../app';

describe('Messenger', function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployValidatorFixture() {
        const [alice, bob] = await ethers.getSigners();

        const Messenger = await ethers.getContractFactory('Messenger');
        const messenger = await Messenger.deploy();

        const chainId = await network.provider.send('eth_chainId');

        const dataSigner = new DataSigner(messenger.address, chainId);

        return { messenger, dataSigner, alice, bob };
    }

    describe('Send', function () {
        it('Should emit message on valid signature', async function () {
            const { alice, bob, messenger, dataSigner } = await loadFixture(deployValidatorFixture);

            const message: Messenger.MessageStruct = {
                from: alice.address,
                to: bob.address,
                contents: 'hello!',
            };

            const signature = dataSigner.sign(message, alice);

            expect(await messenger.connect(alice).send(message, signature))
                .to.emit(messenger, 'Send')
                .withArgs(message.from, message.to, message.contents);

            expect(await messenger.connect(bob).send(message, signature))
                .to.emit(messenger, 'Send')
                .withArgs(message.from, message.to, message.contents);
        });

        it('Should revert on invalid signature', async function () {
            const { alice, bob, messenger, dataSigner } = await loadFixture(deployValidatorFixture);

            const message: Messenger.MessageStruct = {
                from: alice.address,
                to: bob.address,
                contents: 'hello!',
            };

            const signature = dataSigner.sign(message, bob);

            await expect(messenger.connect(alice).send(message, signature)).to.be.revertedWith('Invalid signature');
        });

        it('Should revert on invalid data', async function () {
            const { alice, bob, messenger, dataSigner } = await loadFixture(deployValidatorFixture);

            const message: Messenger.MessageStruct = {
                from: alice.address,
                to: bob.address,
                contents: 'hello!',
            };

            const signature = dataSigner.sign(message, alice);

            message.contents = 'Good bye!';

            await expect(messenger.connect(alice).send(message, signature)).to.be.revertedWith('Invalid signature');
        });
    });
});
