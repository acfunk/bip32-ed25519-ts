/// <reference types="node" />
/**
 *
 * Reference of BIP32-Ed25519 Hierarchical Deterministic Keys over a Non-linear Keyspace (https://acrobat.adobe.com/id/urn:aaid:sc:EU:04fe29b0-ea1a-478b-a886-9bb558a5242a)
 *
 * @see section V. BIP32-Ed25519: Specification;
 *
 * A) Root keys
 *
 * @param seed - 256 bite seed generated from BIP39 Mnemonic
 * @returns - Extended root key (kL, kR, c) where kL is the left 32 bytes of the root key, kR is the right 32 bytes of the root key, and c is the chain code. Total 96 bytes
 */
export declare function fromSeed(seed: Buffer): Uint8Array;
/**
 * This function takes an array of up to 256 bits and sets the last g trailing bits to zero
 *
 * @param array - An array of up to 256 bits
 * @param g - The number of bits to zero
 * @returns - The array with the last g bits set to zero
 */
export declare function trunc_256_minus_g_bits(array: Uint8Array, g: number): Uint8Array;
/**
 * @see section V. BIP32-Ed25519: Specification;
 *
 * subsections:
 *
 * B) Child Keys
 * and
 * C) Private Child Key Derivation
 *
 * @param extendedKey - extended key (kL, kR, c) where kL is the left 32 bytes of the root key the scalar (pvtKey). kR is the right 32 bytes of the root key, and c is the chain code. Total 96 bytes
 * @param index - index of the child key
 * @param g - Defines how many bits to zero in the left 32 bytes of the child key. Standard BIP32-ed25519 derivations use 32 bits.
 * @returns - (kL, kR, c) where kL is the left 32 bytes of the child key (the new scalar), kR is the right 32 bytes of the child key, and c is the chain code. Total 96 bytes
 */
export declare function deriveChildNodePrivate(extendedKey: Uint8Array, index: number, g?: number): Promise<Uint8Array>;
/**
 *  * @see section V. BIP32-Ed25519: Specification;
 *
 * subsections:
 *
 * D) Public Child key
 *
 * @param extendedKey - extend public key (p, c) where p is the public key and c is the chain code. Total 64 bytes
 * @param index - unharden index (i < 2^31) of the child key
 * @param g - Defines how many bits to zero in the left 32 bytes of the child key. Standard BIP32-ed25519 derivations use 32 bits.
 * @returns - 64 bytes, being the 32 bytes of the child key (the new public key) followed by the 32 bytes of the chain code
 */
export declare function deriveChildNodePublic(extendedKey: Uint8Array, index: number, g?: number): Uint8Array;
