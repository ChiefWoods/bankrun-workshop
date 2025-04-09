import { PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import idl from "../../target/idl/escrow.json";

export function getEscrowPdaAndBump(maker: PublicKey, seed: BN) {
  // TODO: derive PDA for Escrow account
}
