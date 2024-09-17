import { deriveChildNodePublic, fromSeed } from "./bip32-ed25519";
export { deriveChildNodePublic, fromSeed };
/**
 *
 */
export declare enum KeyContext {
    Address = 0,
    Identity = 1,
    Cardano = 2,
    TESTVECTOR_1 = 3,
    TESTVECTOR_2 = 4,
    TESTVECTOR_3 = 5
}
export declare enum BIP32DerivationType {
    Khovratovich = 32,
    Peikert = 9
}
export interface ChannelKeys {
    tx: Uint8Array;
    rx: Uint8Array;
}
export declare enum Encoding {
    MSGPACK = "msgpack",
    BASE64 = "base64",
    NONE = "none"
}
export interface SignMetadata {
    encoding: Encoding;
    schema: Object;
}
export declare const harden: (num: number) => number;
export declare const ERROR_BAD_DATA: Error;
export declare const ERROR_TAGS_FOUND: Error;
export declare class XHDWalletAPI {
    constructor();
    /**
     * Derives a child key from the root key based on BIP44 path
     *
     * @param rootKey - root key in extended format (kL, kR, c). It should be 96 bytes long
     * @param bip44Path - BIP44 path (m / purpose' / coin_type' / account' / change / address_index). The ' indicates that the value is hardened
     * @param isPrivate  - if true, return the private key, otherwise return the public key
     * @returns - The extended private key (kL, kR, chainCode) or the extended public key (pub, chainCode)
     */
    deriveKey(rootKey: Uint8Array, bip44Path: number[], isPrivate: boolean | undefined, derivationType: BIP32DerivationType): Promise<Uint8Array>;
    /**
     *
     *
     * @param context - context of the key (i.e Address, Identity)
     * @param account - account number. This value will be hardened as part of BIP44
     * @param keyIndex - key index. This value will be a SOFT derivation as part of BIP44.
     * @returns - public key 32 bytes
     */
    keyGen(rootKey: Uint8Array, context: KeyContext, account: number, keyIndex: number, derivationType?: BIP32DerivationType): Promise<Uint8Array>;
    /**
     * Raw Signing function called by signData and signTransaction
     *
     * Ref: https://datatracker.ietf.org/doc/html/rfc8032#section-5.1.6
     *
     * Edwards-Curve Digital Signature Algorithm (EdDSA)
     *
     * @param bip44Path
     * - BIP44 path (m / purpose' / coin_type' / account' / change / address_index)
     * @param data
     * - data to be signed in raw bytes
     *
     * @returns
     * - signature holding R and S, totally 64 bytes
     */
    private rawSign;
    /**
     * Ref: https://datatracker.ietf.org/doc/html/rfc8032#section-5.1.6
     *
     *  Edwards-Curve Digital Signature Algorithm (EdDSA)
     *
     * @param context - context of the key (i.e Address, Identity)
     * @param account - account number. This value will be hardened as part of BIP44
     * @param keyIndex - key index. This value will be a SOFT derivation as part of BIP44.
     * @param data - data to be signed in raw bytes
     * @param metadata - metadata object that describes how `data` was encoded and what schema to use to validate against
     * @param derivationType
     * - BIP32 derivation type, defines if it's standard Ed25519 or Peikert's ammendment to BIP32-Ed25519
     *
     * @returns - signature holding R and S, totally 64 bytes
     * */
    signData(rootKey: Uint8Array, context: KeyContext, account: number, keyIndex: number, data: Uint8Array, metadata: SignMetadata, derivationType?: BIP32DerivationType): Promise<Uint8Array>;
    /**
     * Sign Algorand transaction
     * @param context
     * - context of the key (i.e Address, Identity)
     * @param account
     * - account number. This value will be hardened as part of BIP44
     * @param keyIndex
     * - key index. This value will be a SOFT derivation as part of BIP44.
     * @param prefixEncodedTx
     * - Encoded transaction object
     * @param derivationType
     * - BIP32 derivation type, defines if it's standard Ed25519 or Peikert's ammendment to BIP32-Ed25519
     *
     * @returns sig
     * - Raw bytes signature
     */
    signAlgoTransaction(rootKey: Uint8Array, context: KeyContext, account: number, keyIndex: number, prefixEncodedTx: Uint8Array, derivationType?: BIP32DerivationType): Promise<Uint8Array>;
    /**
     * SAMPLE IMPLEMENTATION to show how to validate data with encoding and schema, using base64 as an example
     *
     * @param message
     * @param metadata
     * @returns
     */
    private validateData;
    /**
     * Detect if the message has Algorand protocol specific tags
     *
     * @param message - raw bytes of the message
     * @returns - true if message has Algorand protocol specific tags, false otherwise
     */
    private hasAlgorandTags;
    /**
     * Wrapper around libsodium basica signature verification
     *
     * Any lib or system that can verify EdDSA signatures can be used
     *
     * @param signature - raw 64 bytes signature (R, S)
     * @param message - raw bytes of the message
     * @param publicKey - raw 32 bytes public key (x,y)
     * @returns true if signature is valid, false otherwise
     */
    verifyWithPublicKey(signature: Uint8Array, message: Uint8Array, publicKey: Uint8Array): Promise<boolean>;
    /**
     * Function to perform ECDH against a provided public key
     *
     * ECDH reference link: https://en.wikipedia.org/wiki/Elliptic-curve_Diffie%E2%80%93Hellman
     *
     * It creates a shared secret between two parties. Each party only needs to be aware of the other's public key.
     * This symmetric secret can be used to derive a symmetric key for encryption and decryption. Creating a private channel between the two parties.
     *
     * @param context - context of the key (i.e Address, Identity)
     * @param account - account number. This value will be hardened as part of BIP44
     * @param keyIndex - key index. This value will be a SOFT derivation as part of BIP44.
     * @param otherPartyPub - raw 32 bytes public key of the other party
     * @param meFirst - defines the order in which the keys will be considered for the shared secret. If true, our key will be used first, otherwise the other party's key will be used first
     * @returns - raw 32 bytes shared secret
     */
    ECDH(rootKey: Uint8Array, context: KeyContext, account: number, keyIndex: number, otherPartyPub: Uint8Array, meFirst: boolean, derivationType?: BIP32DerivationType): Promise<Uint8Array>;
}
