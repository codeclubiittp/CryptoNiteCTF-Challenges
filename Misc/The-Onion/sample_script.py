import os
import shutil
import tarfile
import gzip
from pathlib import Path

def process_folder(input_path, output_dir, iterations=100):
    """
    Unzips, untars, and un-gzips a folder 100 times.

    Args:
        input_path (str): Path to the input file (zip, tar, or gz).
        output_dir (str): Directory to store intermediate and final outputs.
        iterations (int): Number of times to repeat the process.
    """
    input_path = Path(input_path)
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    for i in range(1, iterations + 1):
        iteration_dir = output_dir / f"iteration_{i}"
        iteration_dir.mkdir(parents=True, exist_ok=True)

        # Unzip
        if input_path.suffix == ".zip":
            shutil.unpack_archive(input_path, iteration_dir)
        
        # Untar
        elif input_path.suffix == ".tar":
            with tarfile.open(input_path, "r") as tar:
                tar.extractall(path=iteration_dir)
        
        # Un-gzip
        elif input_path.suffix == ".gz":
            with gzip.open(input_path, "rb") as gz:
                output_file = iteration_dir / input_path.stem
                with open(output_file, "wb") as out_f:
                    shutil.copyfileobj(gz, out_f)

        else:
            print(f"Unsupported file type: {input_path.suffix}")
            return

        print(f"Iteration {i} completed: Extracted to {iteration_dir}")

if __name__ == "__main__":
    # Example usage
    input_path = "path/to/your/file.zip"  # Replace with your file path
    output_dir = "path/to/output/directory"  # Replace with your output directory
    process_folder(input_path, output_dir)
