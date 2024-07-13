# Utilise l'image officielle Node.js comme image de base
FROM node:18.17.1

# Crée et utilise le répertoire de l'application
WORKDIR /app

# Copie les fichiers de dépendances
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste des fichiers de l'application
COPY . .

# Expose le port que l'application utilise
EXPOSE 3000

# Commande pour démarrer l'application
CMD [ "node", "index.js" ]
