"use client";

import React, { useEffect, useState } from "react";
import MovieList from "@/components/movies/MovieList/MovieList";
import { movieService } from "@/services/movie.service";
import { Genre, Movie } from "@/types";
import styles from "./page.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    fetchGenres();
    fetchMovies();
  }, []);

  const fetchGenres = async () => {
    try {
      const genreList = await movieService.getGenres();
      setGenres(genreList);
    } catch (error) {
      console.error("Türler yüklenirken hata:", error);
    }
  };

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await movieService.searchMoviesAdvanced(
        searchQuery || undefined,
        selectedYear ? parseInt(selectedYear) : undefined,
        selectedGenre ? parseInt(selectedGenre) : undefined,
        selectedRating ? parseFloat(selectedRating) : undefined
      );
      setMovies(response);
    } catch (error) {
      console.error("Filmler yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMovies();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Filmler</h1>

      <div className={styles.filters}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            placeholder="Film ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            Ara
          </button>
        </form>

        <div className={styles.filterSelects}>
          <div className={styles.selectWrapper}>
            <label className={styles.selectLabel}>Tür</label>
            <select
              value={selectedGenre}
              onChange={(e) => {
                setSelectedGenre(e.target.value);
              }}
              className={styles.select}
            >
              <option value="">Tüm Türler</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.selectWrapper}>
            <label className={styles.selectLabel}>Yıl</label>
            <input
              type="number"
              placeholder="Örn: 2024"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className={styles.input}
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>

          <div className={styles.selectWrapper}>
            <label className={styles.selectLabel}>Min. Puan</label>
            <input
              type="number"
              placeholder="1-5 arası"
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className={styles.input}
              min="1"
              max="5"
              step="0.1"
            />
          </div>

          <button onClick={fetchMovies} className={styles.applyButton}>
            Filtrele
          </button>

          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedGenre("");
              setSelectedYear("");
              setSelectedRating("");
              fetchMovies();
            }}
            className={styles.clearButton}
          >
            Temizle
          </button>
        </div>
      </div>

      <MovieList movies={movies} loading={loading} />
    </div>
  );
}
