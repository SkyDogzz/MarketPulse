# Market Pulse

Market Pulse est une plateforme e-commerce moderne et réactive, conçue pour offrir une expérience utilisateur exceptionnelle. Cette application permet aux utilisateurs de parcourir, rechercher et acheter des produits en toute simplicité.

## Caractéristiques

- **Catalogue de produits** : Explorez une vaste gamme de produits, avec des options de tri et de filtrage.
- **Panier d'achat** : Ajoutez des articles à votre panier et gérez-les facilement.
- **Processus de commande simplifié** : Achetez en toute sécurité avec un processus de commande intuitif.
- **Gestion de compte utilisateur** : Inscrivez-vous, connectez-vous, et gérez vos informations personnelles.
- **Interface d'administration** : Gérez les produits, les commandes et visualisez les statistiques de vente.

## Technologies Utilisées

- **Front-end** : React, Redux pour la gestion d'état, React Router.
- **Back-end** : Node.js avec Express, Sequelize pour l'interaction avec la base de données PostgreSQL.
- **Système de paiement** : Intégration de Stripe pour des transactions sécurisées.
- **Authentification** : JWT pour une authentification sécurisée et efficace.

## Installation

Pour mettre en place et lancer le projet localement, suivez ces étapes :

1. **Cloner le dépôt**

   ```bash
   git clone https://example.com/market-pulse.git
   cd market-pulse
   ```

2. **Installer les dépendances**

Dans le dossier du projet :

    ```bash
    cd server
    npm install

    cd ../client
    npm install
    ```

4. **Configurer les variables d'environnement**

Créez un fichier .env et configurez les variables nécessaires 

    ```bash
    # Variable for React server
    CLIENT_PORT=80

    # Variables for Node/Express server
    SERVER_PORT=3000

    # Variables for PostgreSQL
    POSTGRES_DB=databasename
    POSTGRES_USER=user
    POSTGRES_PASSWORD=password
    POSTGRES_PORT=5432

    # Variables for Adminer
    ADMINER_PORT=8080

    # Environment variables
    ENVIRONMENT=development
    ```

5. **Lancer l'application**

Lancer le serveur :

    ```bash
    docker compose up -d
    ```
