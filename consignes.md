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

Remplissez le fichier `AI_context.md` avec les éléments contextuels pour que l'IA avec laquelle vous interagissez soit la plus performante possible.
Utilisez le format `markdown` et essayez de respecter le format que l'on a vu ensemble.
A chaque fois que vous interagirez avec l'IA pensez à ajouter ce fichier au contexte.

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

### 7. Mission 4 : Tests Unitaires de Sécurité & Validation des Correctifs

Après avoir corrigé les failles, il est crucial de s'assurer que ces correctifs sont pérennes et que de nouvelles régressions n'introduisent pas de vulnérabilités.

#### 🎯 Objectif 1 : Création de Tests Unitaires de Sécurité

Développez des tests unitaires pour les fonctionnalités qui étaient vulnérables. Ces tests doivent spécifiquement vérifier que les attaques de type XSS, SQL Injection et IDOR ne sont plus possibles.

*   **Framework de Test :** Utilisez un framework de test Node.js comme Jest ou Mocha (souvent utilisé avec `supertest` pour les requêtes HTTP).
*   **Scénarios de Test :**
    *   **XSS :** Écrivez des tests qui tentent d'injecter des payloads XSS (par exemple, `<script>alert('XSS')</script>`) dans les champs de saisie et vérifiez que le contenu est correctement échappé ou que le script n'est pas exécuté dans la réponse HTML.
    *   **SQL Injection :** Créez des tests qui essaient d'utiliser des payloads SQLi (par exemple, `' OR '1'='1`) dans les formulaires de connexion ou d'autres points d'entrée de données. Vérifiez que ces tentatives d'injection échouent (par exemple, la connexion n'est pas réussie, aucune donnée inattendue n'est retournée, ou une erreur sécurisée est gérée).
    *   **IDOR :** Implémentez des tests qui simulent des requêtes pour accéder à des ressources d'autres utilisateurs en manipulant les identifiants dans les URL ou les corps de requête. Assurez-vous que l'application renvoie des erreurs d'autorisation (par exemple, 401 Unauthorized ou 403 Forbidden) et non les données sensibles.

#### 🎯 Objectif 2 : Réintégration d'une Faille pour Validation

Pour prouver l'efficacité de vos tests unitaires de sécurité :

1.  **Choisissez une faille :** Sélectionnez l'une des vulnérabilités que vous avez corrigées (XSS, SQL Injection ou IDOR).
2.  **Réintroduisez-la :** Modifiez temporairement le code dans `app.js` pour réintroduire *intentionnellement* cette faille.
3.  **Exécutez les tests :** Lancez vos tests unitaires. Le test correspondant à la faille réintroduite devrait maintenant échouer. Cela valide que votre test est capable de détecter la vulnérabilité.
4.  **Annulez la modification :** N'oubliez pas de revenir sur la modification du code pour supprimer la faille réintroduite après cette validation.

Cette étape est cruciale pour garantir que vos tests sont robustes et qu'ils serviront de filet de sécurité pour les développements futurs.

---

### 💡 Rappel : Les 3 Piliers du Prompt de Dev

* **Ne soyez pas vagues :** "Trouve les bugs" < "Analyse les failles de sécurité OWASP".
* **Forcez la réflexion :** Utilisez le *Chain-of-Thought* en demandant à l'IA d'analyser le flux de données avant de proposer une solution.
* **Structurez la sortie :** Demandez des blocs de code clairs ou des formats JSON/XML pour une intégration facile.
