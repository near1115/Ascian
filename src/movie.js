import React, { useState } from "react";
import axios from "axios";

const MovieSearch = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMovie = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        "https://imdb-top-100-movies.p.rapidapi.com/",
        {
          headers: {
            "X-RapidAPI-Key":
              "8d964e6930mshbe793652a519173p14e284jsn8624e6ef0bad",
            "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
          },
        }
      );

      if (res.data) {
        setMovies(res.data);
      } else {
        setError("No movies found");
      }
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="p-5">
      
     {movies.length < 1 && <form onSubmit={getMovie} className="text-center mb-5">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Check IMDb Top Movies
        </button>
      </form>}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
    

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.length > 0 &&
          movies.map((movie, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xl font-semibold text-gray-800">
                    #{movie.rank}
                  </span>
                  <span className="text-sm text-gray-500">{movie.rating}</span>
                </div>
                <h3 className="text-black text-lg mb-2 font-bold">{movie.title}</h3>
                <div className="flex gap-2">{movie.genre.map((genreType) => {return <p className="text-gray-600 text-sm mb-2 bg-blue-200 border px-3 py-2 rounded-xl">{genreType}</p>})}</div>
                
                
                <p className="text-gray-700 text-sm">{movie.description}</p>
              </div>
            </div>
          ))}
      </div>
      
    </div>
  );
};

export default MovieSearch;
