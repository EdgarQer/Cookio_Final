import React, { useState } from "react";
import "./SearchPage.css";

type Recipe = {
    id: number;
    title: string;
    description: string;
    image: string;
};
//для пошуку рецептів
const SearchPage: React.FC = () => {
    const [query, setQuery] = useState<string>(""); //запит 
    const [results, setResults] = useState<Recipe[]>([]); //результат у вигляд об'єкта
    const [loading, setLoading] = useState<boolean>(false); //показує чи пошук в обробці
    //коли юзер клікає на кнопку пошуку або натискає Enter
    //робить GET request до бекенду з запитом
    const handleSearch = async () => {
        if (!query) return;

        setLoading(true);

        try {
            const response = await fetch(`http://localhost:8080/api/recipes/search?query=${query}`);
            if (!response.ok) {
                throw new Error("Failed to fetch search results");
            }
            const data: Recipe[] = await response.json();
            setResults(data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="search-page">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for recipes..."
                    value={query}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">
                    Search
                </button>
            </div>
            {loading && <div className="loading">Loading...</div>}
            <div className="results">
                {results.length > 0 ? (
                    results.map((recipe) => (
                        <div key={recipe.id} className="result-card">
                            <img src={recipe.image} alt={recipe.title} className="result-image" />
                            <div className="result-details">
                                <h3>{recipe.title}</h3>
                                <p>{recipe.description}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && <div className="no-results">No results found</div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
