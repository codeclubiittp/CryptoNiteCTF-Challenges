# Mustard and Mangoes Write-up

`Mangoes and Mustard` was a challenge where you were given a text file full of `6`s and `7`s (which itself is questionable in '26). 

The file in actuality is the binary for a file image with `6` corresponding to `0` and `7` corresponding to `1`. 

So, on converting the text into a file and inspecting the header bytes, we find that it is a PNG file (here, `TaskFile.png`). 

Now we inspect it, to find nothing much BUT the challenge suggests there is some "missing part" which could be trailing strings after the `IEND` chunk or a portion of the image which is "cut out" because of manipulated Checksum and `IHDR` chunk of a PNG image. 

Changing those quantities to increase the height of the image we get `Image_for_67.png`.
