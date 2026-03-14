# AES Stuff Write-up

The challenge gives a url: `https://aes-challenge-thingy.vercel.app/api/oracle`

What this does is basically pad the input along with a flag and encrypt this using electronic codebook (ECB) encryption. However, what this means is that by varying the input we can recover the flag byte by byte using a script as given in `script.js`.

**Flag:** `TACHYON{w3lp_3cp_1s_bu5t3ed_L0l_d23d3cf}`
