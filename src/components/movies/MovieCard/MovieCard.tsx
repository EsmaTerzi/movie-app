import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types';
import Rating from '@/components/common/Rating/Rating';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link href={`/movies/${movie.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={movie.posterUrl || '/placeholder-movie.jpg'}
          alt={movie.title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.genre}>{movie.genre?.map(g => g).join(', ')}</p>
        <div className={styles.footer}>
          <Rating value={movie.averageRating || 0} readonly size="small" showValue />
          <span className={styles.reviews}>
            ({movie.totalReviews || 0} yorum)
          </span>
        </div>
        <p className={styles.year}>
          {movie.releaseYear}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
