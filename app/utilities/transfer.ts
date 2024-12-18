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
  } from "@solana/spl-token";
  
  // Utility to transfer SPL Tokens on Testnet
  export const transferSplToken = async (
    senderKeypair: Keypair,
    recipientAddress: string,
    tokenMintAddress: string,
    amount: number
  ): Promise<string> => {
    try {
      const network = "https://api.testnet.solana.com"; // Testnet cluster
      const connection = new Connection(network, "confirmed");
  
      // Validate recipient and token mint public keys
      const recipientPublicKey = new PublicKey(recipientAddress);
      const mintPublicKey = new PublicKey(tokenMintAddress);
  
      // Fetch associated token accounts
      const senderTokenAccount = await connection.getTokenAccountsByOwner(senderKeypair.publicKey, {
        mint: mintPublicKey,
      });
      const recipientTokenAccount = await connection.getTokenAccountsByOwner(recipientPublicKey, {
        mint: mintPublicKey,
      });
  
      // Debugging logs for token accounts
      console.log("Sender Token Account:", senderTokenAccount.value[0]?.pubkey.toBase58());
      console.log("Recipient Token Account:", recipientTokenAccount.value[0]?.pubkey.toBase58());
  
      if (!senderTokenAccount.value.length || !recipientTokenAccount.value.length) {
        throw new Error("Token accounts do not exist.");
      }
  
      // Construct the transfer instruction
      const transferInstruction = createTransferInstruction(
        new PublicKey(senderTokenAccount.value[0]?.pubkey),
        new PublicKey(recipientTokenAccount.value[0]?.pubkey),
        senderKeypair.publicKey,
        amount,
        [],
        TOKEN_PROGRAM_ID
      );
  
      // Create a TransactionMessage for versioned transactions
      const blockhash = (await connection.getLatestBlockhash()).blockhash;
      const message = new TransactionMessage({
        payerKey: senderKeypair.publicKey,
        recentBlockhash: blockhash,
        instructions: [transferInstruction],
      }).compileToV0Message();
  
      // Create the VersionedTransaction
      const transaction = new VersionedTransaction(message);
      transaction.sign([senderKeypair]);
  
      // Send the transaction and get the signature
      const signature = await connection.sendTransaction(transaction, {
        skipPreflight: false,
        preflightCommitment: "confirmed",
      });
  
      // Confirm the transaction
      await connection.confirmTransaction(signature, "confirmed");
  
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
  