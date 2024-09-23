import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemonDetail } from '../api';
import './PokemonDetailPage.css';

const PokemonDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPokemonDetail = async () => {
            try {
                const data = await getPokemonDetail(id);
                setPokemon(data);
            } catch (err) {
                setError('Failed to load Pokémon details.');
            }
        };

        if (id) {
            fetchPokemonDetail();
        }
    }, [id]);

    const handleBackClick = () => {
        navigate('/'); // Assuming the list page is at the root URL
    };

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!pokemon) {
        return <p className="loading-message">Loading...</p>;
    }

    return (
        <div className="page-container">
            <div className="pokemon-card">
                <div className="card-header">
                    <div className="hp-badge">
                        HP {pokemon.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 'N/A'}
                    </div>
                </div>
                <div className="card-content">
                    <img 
                        src={pokemon.sprites.front_default} 
                        alt={pokemon.name} 
                        className="pokemon-image"
                    />
                    <h2 className="pokemon-name">{pokemon.name}</h2>
                    <div className="pokemon-type">
                        {pokemon.types[0].type.name}
                    </div>
                    <div className="stats-grid">
                        <div>
                            <p className="stat-value">{pokemon.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 'N/A'}</p>
                            <p className="stat-name">Attack</p>
                        </div>
                        <div>
                            <p className="stat-value">{pokemon.stats.find(stat => stat.stat.name === 'defense')?.base_stat || 'N/A'}</p>
                            <p className="stat-name">Defense</p>
                        </div>
                        <div>
                            <p className="stat-value">{pokemon.stats.find(stat => stat.stat.name === 'speed')?.base_stat || 'N/A'}</p>
                            <p className="stat-name">Speed</p>
                        </div>
                    </div>
                </div>
                <button className="back-button" onClick={handleBackClick}>
                    Back to List
                </button>
            </div>
        </div>
    );
};

export default PokemonDetailPage;