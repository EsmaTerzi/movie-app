'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MovieList from '@/components/movies/MovieList/MovieList';
import { movieService } from '@/services/movie.service';
import { Movie } from '@/types';
import styles from './page.module.css';

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    fetchGenres();
    fetchMovies();
  }, []);

  const fetchGenres = async () => {
    try {
      const genreList = await movieService.getGenres();
      setGenres(genreList);
    } catch (error) {
      console.error('Türler yüklenirken hata:', error);
    }
  };

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const filters = {
        search: searchQuery || undefined,
        genre: selectedGenre || undefined,
      };
      const response = await movieService.getAllMovies(filters, { page: 1, limit: 20 });
      setMovies(response.data);
    } catch (error) {
      console.error('Filmler yüklenirken hata:', error);
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

        <select
          value={selectedGenre}
          onChange={(e) => {
            setSelectedGenre(e.target.value);
            fetchMovies();
          }}
          className={styles.genreSelect}
        >
          <option value="">Tüm Türler</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <MovieList movies={movies} loading={loading} />
    </div>
  );
}
