import React from 'react';
import { Link } from 'react-router-dom';
import './PokemonList.css';

const PokemonList = ({ pokemon, lastPokemonElementRef }) => {
    return (
        <div className="pokemon-list">
            {pokemon.map((p, index) => {
                if (pokemon.length === index + 1) {
                    // Attach the lastPokemonElementRef to the last Pokémon card
                    return (
                        <div className="pokemon-card" ref={lastPokemonElementRef} key={index}>
                            <Link to={`/pokemon/${p.name}`}>
                                <h3>{p.name}</h3>
                            </Link>
                        </div>
                    );
                } else {
                    return (
                        <div className="pokemon-card" key={index}>
                            <Link to={`/pokemon/${p.name}`}>
                                <h3>{p.name}</h3>
                            </Link>
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default PokemonList;
