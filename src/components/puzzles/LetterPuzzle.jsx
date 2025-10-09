// src/components/puzzles/LetterPuzzle.jsx
import React, { useState } from 'react';

export default function LetterPuzzle({ data, onSolve }) {
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState('');
    const [showHint, setShowHint] = useState(false);

    const handleSubmit = () => {
        // Normalisation de la réponse (sans espace et en minuscules)
        const normalizedInput = inputValue.trim().toLowerCase();
        const normalizedAnswer = data.answer.trim().toLowerCase();

        if (normalizedInput === normalizedAnswer) {
            setMessage("✅ Correct ! Badge débloqué.");
            // Délai pour permettre à l'utilisateur de lire le succès avant de fermer la modale
            setTimeout(() => onSolve({ success: true }), 1000);
        } else {
            setMessage("❌ Incorrect. Veuillez essayer à nouveau.");
        }
    };
    
    const handleRetry = () => {
        setMessage('');
        setInputValue('');
        setShowHint(false); // Réinitialise aussi l'indice
    };

    const isSolved = message.startsWith('✅');

    return (
        <div style={{ padding: '10px' }}>
            <p style={{ marginBottom: '15px', fontSize: '1.1em' }}>{data.prompt}</p>

            {/* Champ de saisie */}
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Entrez le mot manquant"
                disabled={isSolved}
                style={{
                    padding: '10px', width: '80%', margin: '10px 0',
                    borderRadius: 4, border: '1px solid #ccc',
                    textAlign: 'center', fontSize: '1em',
                }}
            />

            <div style={{ marginTop: '20px' }}>
                <button 
                    onClick={handleSubmit} 
                    disabled={isSolved}
                    style={{ 
                        padding: '10px 20px', background: isSolved ? '#27ae60' : '#f39c12', 
                        color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', marginRight: '10px'
                    }}
                >
                    {isSolved ? "Badge Débloqué" : "Soumettre"}
                </button>
                
                {/* 🚨 BOUTON RÉESSAYER */}
                {message.startsWith('❌') && (
                    <button 
                        onClick={handleRetry} 
                        style={{ 
                            padding: '10px 20px', background: '#e74c3c', 
                            color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer'
                        }}
                    >
                        Réessayer
                    </button>
                )}
            </div>

            {/* MESSAGE DE RÉTROACTION */}
            {message && (
                <p style={{ marginTop: '15px', color: isSolved ? '#2ecc71' : '#e74c3c', fontWeight: 'bold' }}>
                    {message}
                </p>
            )}

            {/* --- SECTION INDICES (comme dans QuizPuzzle) --- */}
            {data.hints && data.hints.length > 0 && !isSolved && (
                <div style={{ marginTop: '25px', borderTop: '1px solid #333', paddingTop: '10px' }}>
                    
                    <button 
                        onClick={() => setShowHint(!showHint)} 
                        style={{ 
                            background: '#34495e', color: '#fff', border: 'none', padding: '8px 15px', 
                            borderRadius: 4, cursor: 'pointer', fontSize: '0.9em'
                        }}
                    >
                        {showHint ? 'Masquer les Indices' : 'Indice (Cliquez ici)'}
                    </button>
                    
                    {showHint && (
                        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px', textAlign: 'left', fontSize: '0.9em' }}>
                            {data.hints.map((hint, index) => (
                                <li key={index} style={{ marginBottom: '5px', color: '#ccc' }}>{hint}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}