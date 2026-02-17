# Nexus IoT - Plateforme de Surveillance Environnementale Mondiale

Nexus IoT est un tableau de bord de monitoring en temps réel permettant la visualisation et la gestion de nœuds IoT à l'échelle internationale. Ce projet met en œuvre une architecture React moderne, une intégration d'APIs asynchrones et une interface utilisateur haute performance.

---

## Fonctionnalités Principales

### Exploration Mondiale et Géocodage
* **Autocomplétion intelligente** : Intégration de l'API Geocoding pour la suggestion de villes en temps réel, optimisée par une fonction de debouncing pour limiter les appels réseau.
* **Mise à jour contextuelle** : Actualisation dynamique de l'ensemble des métriques, graphiques et cartes selon la localisation sélectionnée par l'utilisateur.

### Visualisation de Données (DataViz)
* **Analytique Temporelle** : Utilisation de Recharts pour afficher l'évolution de la température et de l'humidité sur un cycle de 12 heures.
* **Indicateurs de Performance** : Suivi de la charge CPU des terminaux et des tendances environnementales via des composants de données dynamiques.

### Centre de Sécurité et Contrôle
* **Protocole Lockdown** : Système de gestion d'état global permettant le basculement de l'interface en mode sécurité critique (modification du thème, alertes visuelles et restriction simulée des accès).
* **Journalisation (Logs)** : Surveillance des événements système et des tentatives d'accès avec classification par niveau de criticité.

### Gestion Cartographique
* **Cartographie Interactive** : Déploiement de Leaflet.js pour la localisation spatiale des capteurs.
* **Filtrage des Terminaux** : Système de recherche instantanée au sein du parc de terminaux par identifiant ou par nom.

---

## Stack Technique

| Technologie | Usage |
| :--- | :--- |
| **React 18** | Bibliothèque UI principale et gestion du Virtual DOM |
| **Vite** | Build tool et environnement de développement rapide |
| **SASS (SCSS)** | Préprocesseur CSS pour une gestion modulaire des styles |
| **Framer Motion** | Moteur d'animation pour les transitions d'états |
| **Open-Meteo API** | Source de données météorologiques et géographiques |
| **React-Leaflet** | Intégration de cartes interactives OpenStreetMap |

---

## Architecture du Projet

Le projet adopte une structure modulaire par fonctionnalités (Feature-based architecture) :

* **src/assets/** : Configuration du thème global et des variables SCSS.
* **src/components/** : Composants d'interface génériques et réutilisables.
* **src/features/Dashboard/** : Logique métier spécifique au tableau de bord.
* **src/hooks/** : Encapsulation de la logique d'appel API (useDashboardData).

---

## Optimisations Techniques

1. **Performance** : Mise en place d'un délai de latence (debouncing) sur les champs de saisie pour optimiser la consommation de l'API.
2. **Modularité** : Séparation stricte entre les composants de présentation et la logique de récupération de données (Separation of Concerns).
3. **Responsive Design** : Utilisation de grilles flexibles pour garantir une compatibilité totale sur différents formats d'écran.

---

## Installation

```bash
# Cloner le dépôt
git clone [https://github.com/leo-na/smart-city-dashboard.git](https://github.com/leo-na/smart-city-dashboard.git)

# Installer les dépendances
npm install

# Lancer l'environnement de développement
npm run dev
