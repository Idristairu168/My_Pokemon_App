import React from 'react';
import { Link } from 'react-router-dom';
import './PokemonCard.css'; // Add CSS for styling the card

const PokemonCard = ({ name, image, lastPokemonElementRef }) => {
    return (
        <div className="pokemon-card" ref={lastPokemonElementRef}>
            <Link to={`/pokemon/${name}`}>
                <img src={image} alt={name} className="pokemon-image" />
                <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
            </Link>
        </div>
    );
};

export default PokemonCard;
