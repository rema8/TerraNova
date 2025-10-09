import React, { useState, useEffect, useRef } from 'react';

export default function Chat({ socket, username }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null); // Pour le scroll automatique

    // Effet pour scroller au bas de la fenêtre de chat
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    // Gère les écouteurs de socket pour les messages
    useEffect(() => {
        if (!socket) return;

        // Fonction pour ajouter un message à l'état
        const addMessage = (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        };

        // Écouteur pour les messages du chat envoyés par les joueurs
        socket.on('chat message', (data) => addMessage(data));
        
        // Écouteur pour les messages du serveur (connexion/déconnexion)
        socket.on('server message', (text) => addMessage({ sender: 'SERVER', text }));

        // Nettoyage : retirer les écouteurs lorsque le composant est démonté
        return () => {
            socket.off('chat message');
            socket.off('server message');
        };
    }, [socket]);
    
    // Scrolle vers le bas chaque fois qu'un nouveau message arrive
    useEffect(() => {
        scrollToBottom();
    }, [messages]); 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() && socket) {
            // Envoi du message au serveur
            socket.emit('chat message', input.trim());
            setInput(''); // Efface l'input
        }
    };

    return (
        <div 
            id="chat-container" 
            style={{ 
                position: 'fixed', 
                bottom: '10px', 
                right: '10px', 
                width: '300px', 
                background: 'rgba(0, 30, 20, 0.9)', 
                border: '1px solid #1e6f5c', 
                padding: '10px', 
                borderRadius: '8px',
                zIndex: 100 
            }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#66ffcc' }}>Chat Multijoueur</h4>
            
            <div id="chat-window" style={{ height: '150px', overflowY: 'auto', border: '1px solid #1e6f5c', padding: '5px', marginBottom: '10px', background: '#001a14', color: '#eafff3', borderRadius: '4px' }}>
                {messages.map((msg, index) => (
                    <p key={index} style={{ margin: '2px 0', fontSize: '0.8rem', wordWrap: 'break-word' }}>
                        {msg.sender === 'SERVER' ? (
                            <em style={{ color: 'gray' }}>{msg.text}</em>
                        ) : (
                            <><strong>{msg.sender}:</strong> {msg.text}</>
                        )}
                    </p>
                ))}
                <div ref={messagesEndRef} /> {/* Marqueur pour le scroll */}
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
                <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Tapez votre message..."
                    style={{ flexGrow: 1, padding: '8px', fontSize: '0.9rem', border: '1px solid #1e6f5c', borderRadius: '4px 0 0 4px', background: '#002b22', color: '#eafff3' }}
                    maxLength={100}
                />
                <button type="submit" style={{ padding: '8px 10px', background: '#66ffcc', color: '#001a14', border: 'none', borderRadius: '0 4px 4px 0', cursor: 'pointer' }}>
                    Envoyer
                </button>
            </form>
        </div>
    );
}