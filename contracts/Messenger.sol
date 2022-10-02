// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol';
import '@openzeppelin/contracts/utils/cryptography/ECDSA.sol';

string constant DOMAIN_NAME = 'Crypto Messenger';
string constant DOMAIN_VERSION = '1';

/**
 * This example demonstrates on-chain typed data signature verification
 * based on EIP 712 standart (https://eips.ethereum.org/EIPS/eip-712).
 * 
 * Users can send off-chain signed messages to contract via the relayer. This approach allows relayer to pay a gas per user.
 * The protocol requires message creator signature to prevent message forgery by the relayer.
 * Verificaton function creates fully encoded EIP712 message for specified domain, restore address from signature and match signer with message creator.
 * If signature is valid, new 'Send' event will be created.
 * 
 * The contract extends Openzeppelin EIP 712 generic domain separator implementation.
 * Type-specific encoding for messages were implemented using a combination of `abi.encode` and `keccak256`.
 * 
 * This contract implements the version of the encoding known as "v4", as implemented on client side by the JSON RPC method
 * `eth_signTypedDataV4` (https://docs.metamask.io/guide/signing-data.html).
 */
contract Messenger is EIP712 {
    using ECDSA for bytes32;

    struct Message {
        address from;
        address to;
        string contents;
    }

    bytes32 constant MESSAGE_TYPEHASH = keccak256('Message(address from,address to,string contents)');

    event Send(address from, address to, string contents);

    constructor() EIP712(DOMAIN_NAME, DOMAIN_VERSION) {}

    /**
     * Creates 'Send' event.
     * If message signature is not valid, throws error.
     */
    function send(Message memory message, bytes memory signature) public {
        require(_verify(message, signature), 'Invalid signature');

        emit Send(message.from, message.to, message.contents);
    }

    /**
     * Encodes type-specific message data.
     */
    function _hash(Message memory message) internal pure returns (bytes32) {
        return keccak256(abi.encode(MESSAGE_TYPEHASH, message.from, message.to, keccak256(bytes(message.contents))));
    }

    /**
     * Creates fully encoded EIP712 message for specified domain, restore address from signature 
     * and match signer with message creator.
     */
    function _verify(Message memory message, bytes memory signature) internal view returns (bool) {
        bytes32 digest = _hashTypedDataV4(_hash(message));
        address signer = ECDSA.recover(digest, signature);

        return signer == message.from;
    }
}
