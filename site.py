from flask import Flask, request, jsonify
import subprocess  # Pour appeler le programme C++ (optionnel)
import ctypes  # Pour charger une bibliothèque partagée (si nécessaire)

app = Flask(__name__)

# Exemple simple d'accueil
@app.route("/")
def home():
    return "<h1>Bienvenue sur Tubxok!</h1><p>Votre plateforme vidéo améliorée.</p>"

# Exemple de route pour rechercher une vidéo
@app.route("/search", methods=["GET"])
def search():
    query = request.args.get("query", "")
    if not query:
        return jsonify({"error": "Aucun terme de recherche fourni."}), 400
    # Ici, vous pourriez ajouter une logique pour chercher dans une base de données
    return jsonify({"message": f"Résultats pour la recherche '{query}'."})

# Exemple de route pour calculs intensifs (appel à un programme C++)
@app.route("/intensive-task", methods=["POST"])
def intensive_task():
    data = request.json
    number = data.get("number", 1)
    
    # Appeler un exécutable C++ (option 1 : appel via subprocess)
    result = subprocess.run(["./intensive_task", str(number)], capture_output=True, text=True)
    return jsonify({"result": result.stdout.strip()})

# Exemple avec une bibliothèque partagée C++ (option 2 : ctypes)
@app.route("/cpp-task", methods=["POST"])
def cpp_task():
    number = request.json.get("number", 1)
    cpp_library = ctypes.CDLL("./libtasks.so")  # Charger la bibliothèque
    cpp_library.factorial.restype = ctypes.c_long  # Définir le type de retour
    factorial_result = cpp_library.factorial(ctypes.c_int(number))  # Appeler la fonction C++
    return jsonify({"result": factorial_result})

if __name__ == "__main__":
    app.run(debug=True)
