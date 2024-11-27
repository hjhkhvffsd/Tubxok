import time
import random

# Nom du fichier pour stocker l'historique
HISTORY_FILE = "video_history.txt"

def save_video_to_history(video_title):
    """
    Enregistre automatiquement le titre d'une vidéo dans l'historique.
    """
    with open(HISTORY_FILE, "a", encoding="utf-8") as file:
        file.write(video_title + "\n")
    print(f"[Historique] Vidéo enregistrée : {video_title}")

def get_video_history():
    """
    Récupère l'historique des vidéos regardées.
    """
    try:
        with open(HISTORY_FILE, "r", encoding="utf-8") as file:
            return [line.strip() for line in file.readlines()]
    except FileNotFoundError:
        return []

def simulate_video_watching():
    """
    Simule le visionnage automatique de vidéos.
    """
    videos = [
        "Découvrir Python pour les débutants",
        "Tutoriel CSS avancé",
        "Introduction à l'IA avec des exemples",
        "Top 10 des astuces JavaScript",
        "Design UI/UX : meilleures pratiques"
    ]
    while True:
        # Simulation du visionnage aléatoire
        video_to_watch = random.choice(videos)
        save_video_to_history(video_to_watch)
        
        # Pause entre chaque visionnage simulé
        time.sleep(random.randint(3, 6))  # Pause entre 3 et 6 secondes

def display_video_history():
    """
    Affiche l'historique des vidéos regardées.
    """
    history = get_video_history()
    if history:
        print("\n=== Historique des vidéos ===")
        for idx, video in enumerate(history, start=1):
            print(f"{idx}. {video}")
    else:
        print("Aucun historique disponible.")

def main():
    """
    Menu principal pour démarrer ou afficher le système automatisé.
    """
    while True:
        print("\n=== Gestion automatique de l'historique des vidéos ===")
        print("1. Démarrer la simulation de visionnage")
        print("2. Afficher l'historique")
        print("3. Quitter")
        choice = input("Choisissez une option : ")

        if choice == "1":
            print("Démarrage de la simulation de visionnage. Appuyez sur CTRL+C pour arrêter.")
            try:
                simulate_video_watching()
            except KeyboardInterrupt:
                print("\nSimulation arrêtée.")
        elif choice == "2":
            display_video_history()
        elif choice == "3":
            print("Au revoir !")
            break
        else:
            print("Option invalide. Veuillez réessayer.")

if __name__ == "__main__":
    main()
