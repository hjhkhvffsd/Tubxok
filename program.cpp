#include <iostream>

// Fonction pour calculer le factoriel
long long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    int number;
    std::cin >> number;  // Lecture depuis l'entrée standard
    std::cout << factorial(number) << std::endl;  // Résultat en sortie standard
    return 0;
}
