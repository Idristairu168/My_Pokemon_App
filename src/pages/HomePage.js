import React, { useState, useEffect } from 'react';
import { getPokemonList, getPokemonDetail } from '../api'; 
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import './HomePage.css';

const HomePage = () => {
    const [pokemon, setPokemon] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasMore, setHasMore] = useState(true);

    // Fetch Pokémon data from the API
    const fetchPokemon = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const data = await getPokemonList(20, offset);
            const detailedPokemonPromises = data.results.map(async (p) => {
                const details = await getPokemonDetail(p.name);
                return {
                    name: p.name,
                    image: details.sprites.front_default,
                };
            });

            const detailedPokemon = await Promise.all(detailedPokemonPromises);

            if (detailedPokemon.length === 0) {
                setHasMore(false); // No more Pokémon to load
            } else {
                setPokemon((prev) => [...prev, ...detailedPokemon]);
            }

            setLoading(false);
        } catch (err) {
            setError('Failed to load Pokémon.');
            setLoading(false);
        }
    };

    // Check if the user has scrolled to the bottom of the page
    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight && hasMore && !loading) {
            setOffset((prevOffset) => prevOffset + 20); // Load more Pokémon
        }
    };

    useEffect(() => {
        fetchPokemon(); // Fetch Pokémon on component mount or when offset changes
    }, [offset]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll); // Attach scroll event listener
        return () => window.removeEventListener('scroll', handleScroll); // Clean up event listener on component unmount
    }, [loading, hasMore]);

    const handleSearch = (query) => {
        const filteredPokemon = pokemon.filter((p) => p.name.includes(query.toLowerCase()));
        setPokemon(filteredPokemon);
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            {error && <p>{error}</p>}
            <div className="pokemon-grid">
                {pokemon.map((p) => (
                    <PokemonCard key={p.name} name={p.name} image={p.image} />
                ))}
            </div>
            {loading && <p>Loading more Pokémon...</p>}
            {!hasMore && <p>No more Pokémon to load.</p>}
        </div>
    );
};

export default HomePage;
