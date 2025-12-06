import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import { Movie } from '@/types';
import styles from './MovieList.module.css';

interface MovieListProps {
  movies: Movie[];
  loading?: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ movies, loading = false }) => {
  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Filmler yükleniyor...</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Henüz film bulunmamaktadır.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
