"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Movie {
  Title: string;
  Year: string;
  Released: string;
  Plot: string;
  imdbRating: string;
  Poster: string;
  Genre: string;
  Director: string;
  Actors: string;
  Response: string;
  Error?: string;
}

export default function MovieDetails() {
  const params = useParams();
  const id = params.id as string;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`/api/movies?i=${id}`);
        const data = await response.json();

        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "Movie not found");
        }
      } catch {
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <p className="p-10 text-center text-white">Loading...</p>;
  }

  if (error || !movie) {
    return <p className="p-10 text-center text-red-500">{error}</p>;
  }

  return (
    <main className="min-h-screen bg-gray-950 p-8 text-white">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 md:flex-row">
        {movie.Poster !== "N/A" && (
          <Image
            src={movie.Poster}
            alt={movie.Title}
            width={300}
            height={450}
            unoptimized
            className="rounded-xl"
          />
        )}

        <div>
          <h1 className="mb-4 text-4xl font-bold text-red-500">
            {movie.Title}
          </h1>

          <p className="mb-2">Year: {movie.Year}</p>
          <p className="mb-2">Released: {movie.Released}</p>
          <p className="mb-2">Rating: ⭐ {movie.imdbRating}</p>
          <p className="mb-2">Genre: {movie.Genre}</p>
          <p className="mb-2">Director: {movie.Director}</p>
          <p className="mb-4">Actors: {movie.Actors}</p>

          <h2 className="mb-2 text-xl font-bold">Description</h2>
          <p className="text-gray-300">{movie.Plot}</p>
        </div>
      </div>
    </main>
  );
}