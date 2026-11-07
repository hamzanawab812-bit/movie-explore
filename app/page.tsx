
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError("");

      try {
        const query = search.trim() || "Avengers";

        const response = await fetch(
          `/api/movies?search=${encodeURIComponent(query)}`
        );

        const data = await response.json();

        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setMovies([]);
          setError(data.Error || "No movies found");
        }
      } catch {
        setMovies([]);
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [search]);

  return (
    <main className="min-h-screen bg-gray-950 px-6 py-10 text-white">
      <h1 className="mb-4 text-center text-4xl font-bold text-red-500">
        Movie Explorer
      </h1>

      <p className="mb-8 text-center text-gray-400">
        Discover your favorite movies
      </p>

      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {loading && (
        <p className="mb-6 text-center text-gray-300">
          Loading movies...
        </p>
      )}

      {error && (
        <p className="mb-6 text-center text-red-500">{error}</p>
      )}

      {!loading && !error && movies.length === 0 && (
        <p className="text-center text-gray-300">No Movies Found!</p>
      )}

      <div className="movie-grid">
        {!loading &&
          movies.map((movie) => (
            <Link
              href={`/movie/${movie.imdbID}`}
              key={movie.imdbID}
              className="movie-card"
            >
              {movie.Poster !== "N/A" ? (
                <Image
                  src={movie.Poster}
                  alt={movie.Title}
                  width={300}
                  height={400}
                  loading='eager'
                  unoptimized
                  className="h-64 w-full rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-64 items-center justify-center rounded-lg bg-gray-800 text-gray-400">
                  No Poster Available
                </div>
              )}

              <h2>{movie.Title}</h2>
              <p>{movie.Year}</p>
            </Link>
          ))}
      </div>
    </main>
  );
}
