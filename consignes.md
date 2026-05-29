# 🛠️ TP : Audit de Sécurité Assisté par l'IA

## Chapitre 2 : Prompting Avancé & Patterns de Code

### 1. Objectif du TP

L'objectif est d'apprendre à transformer un assistant IA en un **Auditeur de Sécurité Senior**. Vous allez utiliser des techniques de prompting structuré pour identifier, analyser et corriger des failles de sécurité critiques dans une application Node.js réelle.

### 2. L'Application : "The Leak App"

Vous allez travailler sur une application volontairement vulnérable appelée **The Leak App**. Elle contient plusieurs failles majeures du **Top 10 OWASP** (Open Web Application Security Project).

### 3. Mise en route (Setup)

1. Assurez-vous que **Docker** et **Docker Compose** sont installés sur votre machine.
2. Dans le dossier du projet, lancez l'application :

```bash
docker-compose up --build

```


3. Accédez à l'interface via votre navigateur : `http://localhost:3000`

### 4. Mission 1 : Exploration Manuelle

Avant d'utiliser l'IA, testez l'application comme un utilisateur (ou un attaquant) :

* **XSS :** Allez sur "Test XSS" et essayez d'injecter une balise `<script>`.
* **SQL Injection :** Essayez de vous connecter sans mot de passe en utilisant un pattern d'injection (`' OR '1'='1`).
* **IDOR :** Manipulez l'ID dans l'URL de l'API pour voir si vous pouvez accéder aux données de l'administrateur (ID 1).

### 5. Mission 2 : L'Audit Assisté par IA (Cœur du TP)

Votre tâche est de rédiger un **Prompt Structuré** pour faire analyser le fichier `app.js` par votre assistant IA (ChatGPT, Claude, ou Cursor).

#### 📋 Consignes de Prompting :

Vous devez utiliser le framework **S.C.O.P.E** pour obtenir le meilleur résultat :

* **S (Système) :** Définissez l'IA comme un expert en cybersécurité.
* **C (Contexte) :** Précisez qu'il s'agit d'une application Node.js/Express/SQLite3.
* **O (Objectif) :** Demandez une revue complète basée sur le Top 10 OWASP.
* **P (Paramètres) :** Exigez un rapport structuré (ex: Format XML ou Markdown avec sévérité).
* **E (Exemple) :** (Optionnel) Montrez le format de sortie souhaité.

#### 🎯 Résultat attendu :

Pour chaque faille trouvée, l'IA doit vous fournir :

1. Le nom de la faille (catégorie OWASP).
2. L'explication du risque technique.
3. Le correctif de code (le "Patch").

### 6. Mission 3 : Correction & Validation

Une fois l'audit terminé :

1. Appliquez les correctifs suggérés par l'IA dans votre fichier `app.js`.
2. Relancez l'application (`docker-compose up --build`).
3. Vérifiez manuellement que les attaques précédentes ne fonctionnent plus.

---

### 💡 Rappel : Les 3 Piliers du Prompt de Dev

* **Ne soyez pas vagues :** "Trouve les bugs" < "Analyse les failles de sécurité OWASP".
* **Forcez la réflexion :** Utilisez le *Chain-of-Thought* en demandant à l'IA d'analyser le flux de données avant de proposer une solution.
* **Structurez la sortie :** Demandez des blocs de code clairs ou des formats JSON/XML pour une intégration facile.
