import { beforeEach, describe, expect, test } from "bun:test";
import { Program } from "@coral-xyz/anchor";
import { Escrow } from "../../target/types/escrow";
import { ProgramTestContext } from "solana-bankrun";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";
import { BankrunProvider } from "anchor-bankrun";
import {
  ACCOUNT_SIZE,
  AccountLayout,
  getAccount,
  getAssociatedTokenAddressSync,
  MINT_SIZE,
  MintLayout,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { BN } from "bn.js";
import { randomBytes } from "crypto";
import { getBankrunSetup } from "./setup";
import { getEscrowPdaAndBump } from "./pda";
import { getEscrowAcc } from "./accounts";

describe("escrow", () => {
  let { context, provider, program } = {} as {
    context: ProgramTestContext;
    provider: BankrunProvider;
    program: Program<Escrow>;
  };

  const [mintA, mintB, maker, taker] = Array.from(
    { length: 4 },
    Keypair.generate
  );

  const [makerAtaA, makerAtaB, takerAtaA, takerAtaB] = [maker, taker]
    .map((kp) => {
      return [mintA, mintB].map((mint) => {
        return getAssociatedTokenAddressSync(
          mint.publicKey,
          kp.publicKey,
          false
        );
      });
    })
    .flat();

  const [seedA, seedB] = Array.from(
    { length: 2 },
    () => new BN(randomBytes(8))
  );

  const depositAmount = 1;
  const receiveAmount = 1;

  beforeEach(async () => {
    const [mintAData, mintBData] = Array.from({ length: 2 }, () => {
      // TODO: define buffer size for mint accounts
    });


    [mintAData, mintBData].forEach((data) => {
      // TODO: encode data into mint accounts
    });

    const [ataAXData, ataBYData] = Array.from({ length: 2 }, () => {
      // TODO: define buffer size for associated token accounts
    });

    // TODO: encode data into associated token accounts

    ({ context, provider, program } = await getBankrunSetup([
      // TODO: pre-load system, mint and ATA accounts
    ]));
  });

  test("make an escrow", async () => {
    // TODO: invoke make instruction
    // TODO: assert Escrow and ATA accounts
  });

  test("take an escrow", async () => {
    await program.methods
      .make(seedA, new BN(depositAmount), new BN(receiveAmount))
      .accounts({
        maker: maker.publicKey,
        mintA: mintA.publicKey,
        mintB: mintB.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .signers([maker])
      .rpc();

    const [escrowPda] = getEscrowPdaAndBump(maker.publicKey, seedA);

    await program.methods
      .take()
      .accounts({
        escrow: escrowPda,
        taker: taker.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .signers([taker])
      .rpc();

    const vaultAta = getAssociatedTokenAddressSync(
      mintA.publicKey,
      escrowPda,
      true
    );
    const vaultAtaAcc = await context.banksClient.getAccount(vaultAta);

    expect(vaultAtaAcc).toBeNull();

    const ataAYAcc = await getAccount(provider.connection, takerAtaA);

    expect(Number(ataAYAcc.amount)).toEqual(receiveAmount);

    const ataBXAcc = await getAccount(provider.connection, makerAtaB);

    expect(Number(ataBXAcc.amount)).toEqual(depositAmount);

    const ataBYAcc = await getAccount(provider.connection, takerAtaB);

    expect(Number(ataBYAcc.amount)).toEqual(0);
  });

  test("cancel an escrow", async () => {
    await program.methods
      .make(seedB, new BN(depositAmount), new BN(receiveAmount))
      .accounts({
        maker: maker.publicKey,
        mintA: mintA.publicKey,
        mintB: mintB.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .signers([maker])
      .rpc();

    const [escrowPda] = getEscrowPdaAndBump(maker.publicKey, seedB);

    await program.methods
      .cancel()
      .accountsPartial({
        maker: maker.publicKey,
        escrow: escrowPda,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .signers([maker])
      .rpc();

    const vaultAta = getAssociatedTokenAddressSync(
      mintA.publicKey,
      escrowPda,
      true
    );
    const vaultAtaAcc = await context.banksClient.getAccount(vaultAta);

    expect(vaultAtaAcc).toBeNull();

    const ataAXAcc = await getAccount(provider.connection, makerAtaA);

    expect(Number(ataAXAcc.amount)).toEqual(depositAmount);
  });
});
