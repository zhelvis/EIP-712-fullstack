import { isAddress } from 'ethers';
import type { Signer, TypedDataField, TypedDataDomain } from 'ethers';
import type { Messenger } from '../typechain-types';

/**
 * Helper for off-chain signing {@link Messenger.MessageStruct} based on EIP 712 standard.
 * This class defined EIP712 domain separator and contract structure types for {@link Messenger} contract.
 *
 * @see https://eips.ethereum.org/EIPS/eip-712
 *
 * The {@link sign} method wraps ethers._signTypedData function, that call JSON RPC method `eth_signTypedDataV4`
 * under the hood.
 *
 * @see https://docs.metamask.io/guide/signing-data.html
 */
export class DataSigner {
    // EIP712 domain separator name
    public static readonly domainName = 'Crypto Messenger';

    // EIP712 domain separator version
    public static readonly domainVersion = '1';

    // signed struct data types
    public static readonly types: Record<string, TypedDataField[]> = {
        Message: [
            { name: 'from', type: 'address' },
            { name: 'to', type: 'address' },
            { name: 'contents', type: 'string' },
        ],
    };

    // EIP712 domain separator
    public readonly domain: TypedDataDomain;

    /**
     * Create EIP712 domain separator with specified verifying contract address and chain id.
     *
     * @param verifyingContract - address of contract, that verify signatures
     * @param chainId - id of blockchain network. @see https://eips.ethereum.org/EIPS/eip-155
     */
    constructor(verifyingContract: string, chainId: number) {
        if (!isAddress(verifyingContract)) {
            throw new Error('verifying contract argument is not address');
        }

        this.domain = {
            name: DataSigner.domainName,
            version: DataSigner.domainVersion,
            verifyingContract,
            chainId,
        };
    }

    /**
     * Create ECDSA signature for {@link Messenger.MessageStruct} and specified {@link domain}.
     *
     * call JSON RPC method `eth_signTypedDataV4` under the hood
     *
     * @param message - Message struct. @see {@link Messenger.MessageStruct}
     * @param signer - Abstraction of an blockchain account,
     * which can be used to sign messages and transactions
     * and send signed transactions to the network. @see https://docs.ethers.org/v6/api/providers/#Signer
     */
    public async sign(message: Messenger.MessageStruct, signer: Signer): Promise<string> {
        return signer.signTypedData(this.domain, DataSigner.types, message);
    }
}
