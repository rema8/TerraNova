// src/components/BadgeDisplay.jsx
import React, { useState, useEffect } from 'react';
import { badgeManager } from '../game/systems/BadgeManager';

const badgeStyle = {
    padding: '4px 8px',
    margin: '3px',
    background: '#1e6f5c', // Vert Thème
    color: 'gold', 
    borderRadius: '8px',
    fontSize: '0.85em',
    border: '1px solid #000',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
};

const notificationStyle = {
    position: 'fixed', 
    top: '50%', 
    left: '50%', 
    transform: 'translate(-50%, -50%)', 
    background: '#0b2d25', 
    padding: '30px 60px', 
    borderRadius: 12, 
    border: '3px solid gold',
    color: '#fff',
    fontSize: '1.5em',
    fontWeight: 'bold',
    zIndex: 9999, 
    textAlign: 'center',
    transition: 'opacity 0.5s ease-in-out',
};

const BadgeDisplay = () => {
  const [badges, setBadges] = useState(badgeManager.getBadges());
  const [newBadge, setNewBadge] = useState(null);

  useEffect(() => {
    const handleBadgeUnlocked = (badgeData) => {
      setBadges(badgeManager.getBadges());
      setNewBadge(badgeData.id);

      // Cache la notification après 3 secondes
      setTimeout(() => setNewBadge(null), 3000);
    };

    badgeManager.on('badgeUnlocked', handleBadgeUnlocked);

    return () => {
      badgeManager.off('badgeUnlocked', handleBadgeUnlocked);
    };
  }, []);

  // Fonction pour rendre le nom plus lisible (ex: badge-venise-protection-1 -> VENISE PROTECTION 1)
  const formatBadgeName = (id) => {
      return id.replace('badge-', '').replace(/-/g, ' ').toUpperCase();
  };

  return (
    <>
      {/* 1. SUIVI DES BADGES EN HAUT À DROITE */}
      <div style={{
          position: 'absolute', top: 10, right: 10, zIndex: 100, 
          color: '#fff', fontFamily: 'sans-serif', background: 'rgba(0, 0, 0, 0.5)',
          borderRadius: 8, padding: '5px', boxShadow: '0 0 10px rgba(0,0,0,0.5)',
      }}>
        <div style={{ borderBottom: '1px solid #1e6f5c', paddingBottom: 5, marginBottom: 5 }}>
          PROGRESSION TOTALE ({badges.length} / 8) :
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {badges.map(id => (
            <span key={id} style={badgeStyle}>
              ✨ {formatBadgeName(id)}
            </span>
          ))}
        </div>
      </div>

      {/* 2. NOTIFICATION DE NOUVEAU BADGE (Temporaire) */}
      {newBadge && (
        <div style={notificationStyle}>
          <div style={{color: 'gold', marginBottom: 10}}>🏆 NOUVEAU BADGE DÉBLOQUÉ 🏆</div>
          <div style={{fontSize: '1em'}}>
              {formatBadgeName(newBadge)}
          </div>
        </div>
      )}
    </>
  );
};

export default BadgeDisplay;