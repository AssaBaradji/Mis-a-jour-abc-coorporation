# Gestion Commerciale - Node.js & MySQL

## Description du projet

Ce projet est une application de gestion commerciale permettant de gérer des **clients**, des **produits**, des **commandes**, et des **paiements**. Développée en Node.js avec une base de données MySQL, elle permet d'effectuer des opérations CRUD (Créer, Lire, Mettre à jour, Supprimer) via une interface en ligne de commande.

## Fonctionnalités principales

- **Clients** : Ajouter, afficher, mettre à jour et supprimer des clients.
- **Produits** : Gérer les produits disponibles (ajouter, afficher, modifier et supprimer).
- **Commandes** : Créer des commandes pour les clients sur les produits et gérer les details commandes.
- **Paiements** : Enregistrer et gérer les paiements associés aux commandes.

## Comment démarrer avec le projet

### Prérequis

- Node.js (version 14+)
- MySQL (version 5.7+)

### Installation

1. Clonez le projet sur votre machine :

```bash
   git clone https://github.com/AssaBaradji/mis-jour-abc-coorporation.git
```

2.Installez les dépendances :

```bash
  npm install
```

3.Créez la base de données MySQL en utilisant les scripts SQL fournis dans le fichier `productManager.sql`.
4.Configurez les informations de connexion MySQL dans le fichier `db.js`.

### Lancement de l'application

Une fois les étapes d'installation terminées, démarrez l'application via la commande suivante :

```bash
node start
```

## Auteur

- Assa Baradji [https://github.com/AssaBaradji]
