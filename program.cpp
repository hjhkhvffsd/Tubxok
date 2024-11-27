#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <algorithm>
#include <chrono>
#include <thread>

// Structure pour représenter une vidéo
struct Video {
    std::string title;
    std::string id;
    std::string timestamp; // Ajout d'un horodatage
};

// Fonction pour charger l'historique depuis un fichier
std::vector<Video> loadHistory(const std::string& filename) {
    std::vector<Video> history;
    std::ifstream file(filename);
    if (file.is_open()) {
        std::string title, id, timestamp;
        while (std::getline(file, id) && std::getline(file, title) && std::getline(file, timestamp)) {
            history.push_back({title, id, timestamp});
        }
        file.close();
    }
    return history;
}

// Fonction pour sauvegarder l'historique dans un fichier
void saveHistory(const std::vector<Video>& history, const std::string& filename) {
    std::ofstream file(filename, std::ios::trunc);
    if (file.is_open()) {
        for (const auto& video : history) {
            file << video.id << '\n' << video.title << '\n' << video.timestamp << '\n';
        }
        file.close();
    }
}

// Fonction pour ajouter une vidéo à l'historique
void addVideoToHistory(std::vector<Video>& history, const Video& video) {
    // Vérifier si la vidéo est déjà présente
    auto it = std::find_if(history.begin(), history.end(), [&](const Video& v) {
        return v.id == video.id;
    });

    // Si déjà présente, on la déplace en haut de l'historique
    if (it != history.end()) {
        history.erase(it);
    }

    // Ajouter la vidéo en haut de l'historique
    history.insert(history.begin(), video);

    // Limiter l'historique à un nombre maximal d'entrées (par exemple 10)
    const size_t maxHistorySize = 10;
    if (history.size() > maxHistorySize) {
        history.pop_back();
    }
}

// Fonction pour obtenir l'heure actuelle sous forme de chaîne
std::string getCurrentTimestamp() {
    auto now = std::chrono::system_clock::now();
    auto time = std::chrono::system_clock::to_time_t(now);
    char buffer[20];
    strftime(buffer, sizeof(buffer), "%Y-%m-%d %H:%M:%S", localtime(&time));
    return std::string(buffer);
}

// Fonction pour afficher l'historique
void displayHistory(const std::vector<Video>& history) {
    std::cout << "Historique des vidéos regardées :\n";
    for (size_t i = 0; i < history.size(); ++i) {
        std::cout << i + 1 << ". " << history[i].title << " (ID: " << history[i].id << ") - " << history[i].timestamp << "\n";
    }
    if (history.empty()) {
        std::cout << "Aucune vidéo regardée pour le moment.\n";
    }
}

int main() {
    const std::string historyFile = "video_history.txt";

    // Charger l'historique existant
    std::vector<Video> history = loadHistory(historyFile);

    // Simuler des vidéos regardées par un utilisateur
    // (Dans un vrai programme, cela viendrait d'une interaction utilisateur sur un site web)
    std::vector<Video> newVideos = {
        {"Vidéo de présentation", "123", getCurrentTimestamp()},
        {"Tutoriel C++", "456", getCurrentTimestamp()},
        {"Compilation de musique", "789", getCurrentTimestamp()},
    };

    // Ajouter les vidéos automatiquement à l'historique
    for (const auto& video : newVideos) {
        addVideoToHistory(history, video);
    }

    // Afficher l'historique
    displayHistory(history);

    // Sauvegarder l'historique dans le fichier
    saveHistory(history, historyFile);

    // Attendre un moment (simuler l'attente avant de refermer ou d'effectuer d'autres actions)
    std::this_thread::sleep_for(std::chrono::seconds(10)); // Attendre 10 secondes avant de fermer

    return 0;
}
