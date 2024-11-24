import subprocess

def run_cpp_program(input_value):
    # Appelle un programme C++ compilé
    result = subprocess.run(
        ['./program'],  # Nom de l'exécutable C++
        input=str(input_value),
        capture_output=True,
        text=True
    )
    return result.stdout.strip()

if __name__ == "__name__":
   test .
