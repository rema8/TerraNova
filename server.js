// server.js - Version corrigée avec syntaxe ES Module (import)

import express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io"; 

// Port sur lequel le serveur va écouter
const PORT = process.env.PORT || 3001; 
// 🚨 Le port 3001 doit correspondre à celui utilisé dans votre App.jsx
// (io('http://localhost:3001', ...))

const app = express();
const server = createServer(app); 

// Initialisation de Socket.IO
const io = new Server(server, {
  cors: {
    // Permet toutes les connexions pour le développement
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

// ------------------------------------------------------------------
// Logique du JEU et du CHAT (GESTION DES SOCKETS)
// ------------------------------------------------------------------
io.on('connection', (socket) => {
    // 1. Authentification Simplifiée (Récupération du pseudo)
    const username = socket.handshake.query.username;

    if (!username) {
        console.log('Connexion rejetée : pseudo manquant');
        socket.disconnect();
        return;
    }

    // Stocke le pseudo directement sur l'objet socket
    socket.username = username;
    console.log(`${username} s'est connecté (ID: ${socket.id})`);

    // 📢 Informe tous les clients de la nouvelle connexion
    io.emit('server message', `${username} a rejoint le jeu.`);

    
    // 2. Écouteur pour le Chat
    socket.on('chat message', (msg) => {
        if (msg && socket.username) {
            console.log(`[CHAT] ${socket.username}: ${msg}`);
            
            // Diffuse le message à TOUS les clients connectés
            io.emit('chat message', {
                sender: socket.username,
                text: msg.substring(0, 100)
            });
        }
    });
    
    // 3. Gestion de la Déconnexion
    socket.on('disconnect', () => {
        if (socket.username) { 
            console.log(`${socket.username} s'est déconnecté.`);
            // Informe tous les clients de la déconnexion
            io.emit('server message', `${socket.username} a quitté le jeu.`);
        }
    });

    // ------------------------------------------------------------------
    // Vos autres écouteurs de jeu existants vont ici
    // ------------------------------------------------------------------
});

// Démarrage du serveur
server.listen(PORT, () => {
  console.log(`Serveur Socket.IO/Express démarré sur le port ${PORT}`);
  console.log(`Client (React) doit se connecter à http://localhost:${PORT}`);
});