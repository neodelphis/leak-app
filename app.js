const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const db = new sqlite3.Database(':memory:');

app.use(bodyParser.urlencoded({ extended: true }));

db.serialize(() => {
  db.run("CREATE TABLE users (id INT, username TEXT, password TEXT, role TEXT)");
  db.run("INSERT INTO users VALUES (1, 'admin', 'P4ssw0rd_Admin_2024!', 'admin')");
  db.run("INSERT INTO users VALUES (2, 'p.jaumier', '123456', 'user')");
  db.run("INSERT INTO users VALUES (3, 'm.dupont', 'azerty', 'user')");
});

app.get('/', (req, res) => {
  res.send(`
    <html>
      <body style="font-family: sans-serif; max-width: 800px; margin: 40px auto; line-height: 1.6;">
        <h1>🛡️ The Leak App - Formation IA</h1>
        <p>Cette application est volontairement vulnérable. Utilisez-la pour tester vos prompts d'analyse de sécurité.</p>
        <hr>
        <ul>
          <li><a href="/welcome-form">Accueil personnalisé</a></li>
          <li><a href="/login-page">Espace membre</a></li>
          <li><a href="/api/user/2">Profil utilisateur (API)</a></li>
          <li><a href="/debug-config">Configuration système</a></li>
        </ul>
      </body>
    </html>
  `);
});

app.get('/welcome-form', (req, res) => {
  res.send(`
    <form action="/welcome" method="GET">
      <h3>Entrez votre nom pour être accueilli :</h3>
      <input type="text" name="name" placeholder="Votre nom">
      <button type="submit">Valider</button>
    </form>
  `);
});

app.get('/welcome', (req, res) => {
  const name = req.query.name || 'Invité';
  res.send(`<h1>Bienvenue, ${name} !</h1><a href="/">Retour</a>`);
});

app.get('/login-page', (req, res) => {
  res.send(`
    <form action="/login" method="POST">
      <h3>Connexion</h3>
      <input type="text" name="username" placeholder="Username"><br>
      <input type="password" name="password" placeholder="Password"><br><br>
      <button type="submit">Se connecter</button>
    </form>
  `);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  db.get(query, (err, row) => {
    if (row) {
      res.send(`<h2>✅ Succès !</h2> Connecté en tant que : <b>${row.username}</b> (Rôle: ${row.role})<br><br><a href="/">Retour</a>`);
    } else {
      res.send(`<h2>❌ Échec</h2> Identifiants incorrects.<br><br><a href="/login-page">Réessayer</a>`);
    }
  });
});

app.get('/api/user/:id', (req, res) => {
  db.get(`SELECT * FROM users WHERE id = ${req.params.id}`, (err, row) => {
    if (row) {
      res.json(row);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
});

app.get('/debug-config', (req, res) => {
  res.json({
    db_engine: "sqlite3",
    backup_path: "/var/backups/db.bak",
    aws_access_key: "AKIA-TP-FORMATION-IA-2026",
    secret_token: "super-secret-token-12345"
  });
});

app.listen(3000, () => {
  console.log('🚀 Serveur interactif lancé sur http://localhost:3000');
});