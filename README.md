# Icon Forge AI Studio

**Icon Forge AI Studio** est un projet développé dans le cadre d'un Hackathon d'AI Engineering. L'objectif est de proposer une interface permettant de générer et de valider des icônes SVG en suivant les contraintes graphiques d'une identité de marque.

## Technologies utilisées

Le projet est développé avec :

* React
* TypeScript
* Vite
* Tailwind CSS

L'application peut être exécutée localement avec les commandes suivantes :

```bash
npm install
npm run dev
```

À ce stade, seules des données fictives (mock) sont utilisées. Le backend sera ajouté ultérieurement avec **FastAPI**.

## Personnalisation

Le projet est conçu pour être facilement personnalisable.

Il est possible de modifier simplement :

* le logo (`logo_ispm.png`) ;
* la palette de couleurs de l'application ;
* les différents paramètres graphiques.

## Interface

L'application est composée d'une barre latérale donnant accès aux différentes fonctionnalités :

* Tableau de bord
* Génération d'icônes
* Spécification de la marque
* Validation
* Historique
* Paramètres

### Tableau de bord

Le tableau de bord présente un aperçu général de l'application avec :

* l'état du système ;
* le nombre d'icônes générées ;
* les dernières générations réalisées.

### Génération d'icônes

Cette page permet de créer une nouvelle icône à partir d'un concept.

Elle comprend notamment :

* un champ de saisie ;
* un bouton de génération ;
* un aperçu de l'icône au format SVG ;
* les actions Télécharger, Copier et Ouvrir ;
* un score de génération.

### Spécification de la marque

Cette section regroupe les principales informations relatives à l'identité graphique :

* palette de couleurs ;
* géométrie ;
* styles de traits ;
* style général ;
* éléments à éviter ;
* références visuelles.

### Validation

Après la génération, plusieurs contrôles sont affichés :

* validité du fichier SVG ;
* validité du XML ;
* présence de la ViewBox ;
* respect de la palette de couleurs ;
* vérification des traits (Stroke) ;
* nombre de couleurs utilisées ;
* score global.

### Historique

Cette page permet de consulter les générations précédentes.

### Paramètres

Les paramètres permettent notamment de :

* sélectionner le modèle d'IA ;
* changer le thème de l'application ;
* préparer la configuration de l'API FastAPI.

## Pipeline de génération

L'interface présente également les différentes étapes du processus de génération :

```
Concept
   ↓
Brand Reader
   ↓
SVG Analyzer
   ↓
Prompt Builder
   ↓
LLM
   ↓
Génération SVG
   ↓
Validation
   ↓
Score
```

## Objectif

Le projet vise à proposer une interface moderne, claire et responsive, pouvant être connectée facilement à un backend FastAPI lors des prochaines étapes du développement.
