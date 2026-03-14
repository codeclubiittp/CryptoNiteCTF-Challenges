# Can't Catch Me Write-up

We just check the metadata of the image to get a link to a GitHub repository. On checking commit history and the changes in the latest commit, we find the owner has a Reddit account by the name `u/11t_tpt_d4_g04t`.

This account has a description in their profile as:

> "Congrats you found me. Here: VEFDSFlPTntTMGMxNGxfbTNkMTRfdHI0aWw1XzRyM19zYzRyeV8yZnczZzR9"

On base64 decoding this string, it gives us `TACHYON{S0c14l_m3d14_tr4il5_4r3_sc4ry_2fw3g4}` as the flag.

**Flag:** `TACHYON{S0c14l_m3d14_tr4il5_4r3_sc4ry_2fw3g4}`
