import { Program } from "@coral-xyz/anchor";
import { BankrunProvider } from "anchor-bankrun";
import { AddedAccount, startAnchor } from "solana-bankrun";
import { Marketplace } from "../../target/types/marketplace";
import idl from "../../target/idl/marketplace.json";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { MPL_TOKEN_METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import {
  collectionAddress,
  masterEditionAddress,
  metadataAddress,
  mintAddress,
  mintAtaAddress,
} from "./constants";

// TODO: create mainnet connection instance

// TODO: fetch mainnet accounts: mintAddress, collectionAddress, masterEditionAddress, metadataAddress, mintAtaAddress

export async function getBankrunSetup(accounts: AddedAccount[] = []) {
  const context = await startAnchor(
    "",
    [
      // TODO: pre-deploy Token Metadata program
    ],
    [
      ...accounts,
      // TODO: pre-load fetched accounts
    ]
  );
  const provider = new BankrunProvider(context);
  const program = new Program<Marketplace>(idl, provider);

  return {
    context,
    provider,
    program,
  };
}
