import {
  Connection,
  PublicKey,
  Keypair,
  SystemProgram,
  VersionedTransaction,
  TransactionMessage,
} from "@solana/web3.js";
import {
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

// Utility to transfer SPL Tokens on Testnet
export const transferSplToken = async (
  senderKeypair: Keypair,
  recipientAddress: string,
  tokenMintAddress: string,
  amount: number
): Promise<string> => {
  try {
    console.log("Transfer SPL Token 0");
    // Connect to the Solana Testnet
    const network = "https://api.testnet.solana.com"; // Testnet cluster
    const connection = new Connection(network, "confirmed");
    const mintPublicKey = new PublicKey(tokenMintAddress);

    // Validate sender and token mint public keys
    console.log("Transfer SPL Token 1");
    const senderTokenAccount = await connection.getTokenAccountsByOwner(senderKeypair.publicKey, {
      mint: mintPublicKey,
    });
    const senderATA = await getAssociatedTokenAddress(mintPublicKey, senderKeypair.publicKey);
    if (!senderTokenAccount.value.length) {
      throw new Error("Sender token account does not exist.");
    }
    const senderAccountInfo = senderTokenAccount.value.find(
      account => account.pubkey.toBase58() === senderATA.toBase58()
    );
    if (!senderAccountInfo) {
      throw new Error("Sender's associated token account does not exist or is invalid.");
    }
    console.log("Sender Token Account:", senderAccountInfo);
    console.log("Transfer SPL Token 2");

    // Validate receipient and token mint public keys
    const recipientPublicKey = new PublicKey(recipientAddress);
    const recipientATA = await getAssociatedTokenAddress(
      mintPublicKey,
      recipientPublicKey
    );
    console.log("Transfer SPL Token 3");
    // Check if recipient's token account exists
    const recipientTokenAccount = await connection.getTokenAccountsByOwner(recipientPublicKey, {
      mint: mintPublicKey,
    });
    console.log("Transfer SPL Token 4");
    // Debugging logs for token accounts
    let instructions = [];
    // If recipient token account doesn't exist, create it
    if (!recipientTokenAccount.value.length) {
      console.log("Creating recipient token account");
      instructions.push(
        createAssociatedTokenAccountInstruction(
          senderKeypair.publicKey, // payer
          recipientATA, // associated token account address
          recipientPublicKey, // owner
          mintPublicKey // mint
        )
      );
    }
    console.log("Transfer SPL Token 5");
    // Add transfer instruction
    instructions.push(
      createTransferInstruction(
        new PublicKey(senderTokenAccount.value[0]?.pubkey),
        recipientATA,
        senderKeypair.publicKey,
        amount,
        [],
        TOKEN_PROGRAM_ID
      )
    );
    console.log("Transfer SPL Token 6");
    // Create a TransactionMessage for versioned transactions
    const blockhash = (await connection.getLatestBlockhash()).blockhash;
    const message = new TransactionMessage({
      payerKey: senderKeypair.publicKey,
      recentBlockhash: blockhash,
      instructions: instructions,
    }).compileToV0Message();
    console.log("Transfer SPL Token 7");
    // Create the VersionedTransaction
    const transaction = new VersionedTransaction(message);
    transaction.sign([senderKeypair]);

    // Send the transaction and get the signature
    const signature = await connection.sendTransaction(transaction, {
      skipPreflight: false,
      preflightCommitment: "confirmed",
    });
    console.log("Transfer SPL Token 8");
    // Confirm the transaction
    await connection.confirmTransaction(signature, "confirmed");
    console.log("Transfer SPL Token 9");
    console.log("SPL Token transaction successful, signature:", signature);
    return signature;
  } catch (error) {
    console.error("Error transferring SPL Tokens:", error);
    // If error is SendTransactionError, get logs for debugging
    if (error instanceof Error && 'logs' in error) {
      console.error("Transaction Logs:", error.logs);
    }
    throw error;
  }
};
