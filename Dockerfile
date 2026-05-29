# Utilisation d'une image légère de Node.js
FROM node:18-slim

# Création du répertoire de travail
WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du code source
COPY . .

# Exposition du port
EXPOSE 3000

# Commande de lancement
CMD ["node", "app.js"]
