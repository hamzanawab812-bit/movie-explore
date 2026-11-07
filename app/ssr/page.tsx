
import Image from "next/image";
import Link from "next/link";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
}

interface MovieResponse {
  Search?: Movie[];
  Response: string;
  Error?: string;
}

async function getMovies(): Promise<Movie[]> {
  try {
    const apiKey = process.env.OMDB_API_KEY;

    const response = await fetch(
      `https://www.omdbapi.com/?s=Avengers&apikey=${apiKey}`,
      { cache: "no-store" }
    );

    const data: MovieResponse = await response.json();

    if (data.Response === "True") {
      return data.Search || [];
    }

    return [];
  } catch {
    return [];
  }
}

export default async function SSRPage() {
  const movies = await getMovies();

  return (
    <main className="min-h-screen bg-gray-950 px-6 py-10 text-white">
      <h1 className="mb-4 text-center text-4xl font-bold text-red-500">
        Movie Explorer - SSR
      </h1>

      <p className="mb-8 text-center text-gray-400">
        Movies fetched on the server
      </p>

      <div className="movie-grid">
        {movies.map((movie, index) => (
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
                unoptimized
                loading={index === 0 ? "eager" : "lazy"}
                className="h-64 w-full rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-64 items-center justify-center rounded-lg bg-gray-800">
                No Poster Available
              </div>
            )}

            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
          </Link>
        ))}
      </div>

      {movies.length === 0 && (
        <p className="mt-8 text-center text-red-400">
          No movies found!
        </p>
      )}
    </main>
  );
}
