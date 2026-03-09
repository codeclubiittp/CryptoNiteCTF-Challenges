First we view the image, and try steghide extract on it, it asks for passphrase.

We look for clues

We then read the Tachyon2.txt file 


This reveals a possibility of stegsnow which hides data in the spaces(“nothing”) being used to hide the passphrase of steghide.

Use steghide on Tachyon2.txt file:

As expected we find the passphrase for Steghide

We find a zip file and extract its contents

We find a lot of flags inside the secret folder. Recalling what was written in the question : “buried in noise”, we expect the flag to be one among these







