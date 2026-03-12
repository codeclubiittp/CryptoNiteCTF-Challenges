const ORACLE_URL = "https://aes-challenge-thingy.vercel.app/api/oracle";
const BLOCK_SIZE = 16;

// ===== Oracle Call =====
async function oracle(input) {
  const res = await fetch(ORACLE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input })
  });

  const data = await res.json();
  return Buffer.from(data.ciphertext, "hex");
}

// ===== Detect Block Size =====
async function detectBlockSize() {
  const baseLength = (await oracle("")).length;

  for (let i = 1; i < 64; i++) {
    const len = (await oracle("A".repeat(i))).length;
    if (len > baseLength) {
      return len - baseLength;
    }
  }
  throw new Error("Block size not found");
}

// ===== Byte-at-a-Time ECB Decryption =====
async function recoverFlag() {
  const blockSize = await detectBlockSize();
  console.log("Block size:", blockSize);

  let recovered = "";

  while (true) {
    const paddingLength =
      blockSize - (recovered.length % blockSize) - 1;

    const padding = "A".repeat(paddingLength);

    const ciphertext = await oracle(padding);

    const blockIndex = Math.floor(
      recovered.length / blockSize
    );

    const targetBlock = ciphertext.slice(
      blockIndex * blockSize,
      (blockIndex + 1) * blockSize
    );

    let found = false;

    for (let i = 0; i < 256; i++) {
      const guess =
        padding +
        recovered +
        String.fromCharCode(i);

      const guessCipher = await oracle(guess);

      const guessBlock = guessCipher.slice(
        blockIndex * blockSize,
        (blockIndex + 1) * blockSize
      );

      if (targetBlock.equals(guessBlock)) {
        recovered += String.fromCharCode(i);
        process.stdout.write(String.fromCharCode(i));
        found = true;
        break;
      }
    }

    if (!found) break;

    // stop if we see typical CTF flag ending
    if (recovered.endsWith("}")) break;
  }

  console.log("\nRecovered:", recovered);
}

recoverFlag();