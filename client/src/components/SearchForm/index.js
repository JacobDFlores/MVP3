import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/SearchBar.css';
import Comments from './Comments'; // Import Comments component
import Rating from './Rating.js'; // Import Rating component
import API from "../../utils/api";

const SearchForm = (props) => {
//   const [search, setSearch] = useState('');
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

//   let previousSearch = '';

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     setLoading(true);
//     setError(null);

//     try {
//         const response = await API.searchMusic(search);
//         setResults(response.data.tracks.items);

//         previousSearch = search;
//         setSearch('');
//     } catch (error) {
//         console.error("Error fetching music:", error);
//         setError("Failed to fetch music. Please try again.");
//     } finally {
//         setLoading(false);
//     }
//   };

    const searchMusic = async () => {
        setLoading(true);
        setError(null);
        try {
        const response = await API.searchMusic(query);
        setResults(response.data.tracks.items);
        } catch (error) {
        console.error("Error fetching music:", error);
        setError("Failed to fetch music. Please try again.");
        } finally {
        setLoading(false);
        }
    };

  const handleRatingChange = (rating) => {
    console.log('Selected Rating:', rating);
    // Here you can handle the selected rating
  };

  return (
    <div>
      <h4>Search for your favorite music here.</h4>
        {/* { <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          <div className="col-12 col-lg-9">
            <input
              placeholder={previousSearch? previousSearch: "What are you vibing with tonight?" }
              value={search}
              className="form-input w-100"
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="col-12 col-lg-3">
            <button className="btn btn-info btn-block py-3" type="submit">
              Search!
            </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </form> } */}
        <div className="search-bar">
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter music or artist" />
        <button onClick={searchMusic} disabled={loading}>Search</button>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        </div>
        <div>
            {results.slice(0, 5).map((item) => (
                <div className="music-card" key={item.id}>
                <img className="album-cover" src={item.album.images[0]?.url} alt="Album Cover" />
                <div className="music-details">
                    <h3>{item.name} by {item.artists[0].name}</h3>
                    <p>Release Date: {item.album.release_date}</p>
                    {item.preview_url && (
                    <audio controls>
                        <source src={item.preview_url} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    )}
                    <Rating onRatingChange={handleRatingChange} />
                    <Comments />
                </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default SearchForm;