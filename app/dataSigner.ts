import { Signer, TypedDataField, TypedDataDomain } from 'ethers';
import { ethers } from 'hardhat';
import { Messenger } from '../typechain-types';

export interface TypedDataSigner extends Signer {
    _signTypedData(
        domain: TypedDataDomain,
        types: Record<string, Array<TypedDataField>>,
        value: Record<string, unknown>
    ): Promise<string>;
}

export class DataSigner {
    public static readonly domainName = 'Crypto Messenger';

    public static readonly domainVersion = '1';

    public static readonly types: Record<string, TypedDataField[]> = {
        Message: [
            { name: 'from', type: 'address' },
            { name: 'to', type: 'address' },
            { name: 'contents', type: 'string' },
        ],
    };

    public readonly domain: TypedDataDomain;

    constructor(verifyingContract: string, chainId: number) {
        if (!ethers.utils.isAddress(verifyingContract)) {
            throw new Error('verifying contract argument is not address');
        }

        this.domain = {
            name: DataSigner.domainName,
            version: DataSigner.domainVersion,
            verifyingContract,
            chainId,
        };
    }

    public sign(message: Messenger.MessageStruct, signer: TypedDataSigner): Promise<string> {
        return signer._signTypedData(this.domain, DataSigner.types, message);
    }
}
