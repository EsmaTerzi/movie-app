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
  const [imageSrc, setImageSrc] = React.useState<string>('');
  
  React.useEffect(() => {
    const getValidImageSrc = (url: string | undefined) => {
      if (!url || url.trim().length === 0) {
        return '/movie-placeholder.svg';
      }
      // Sadece http/https ile başlayan URL'leri kabul et
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
      }
      // Eğer / ile başlıyorsa local path olarak kabul et
      if (url.startsWith('/')) {
        return url;
      }
      // Diğer durumlar için placeholder
      return '/movie-placeholder.svg';
    };
    setImageSrc(getValidImageSrc(movie.posterUrl));
  }, [movie.posterUrl]);

  const handleImageError = () => {
    setImageSrc('/movie-placeholder.svg');
  };

  return (
    <Link href={`/movies/${movie.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={imageSrc}
          alt={movie.title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={handleImageError}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.genre}>{movie.genresNames?.join(', ')}</p>
        <div className={styles.footer}>
          <Rating value={movie.averageRating || 0} readonly size="small" showValue />
        </div>
        <p className={styles.year}>
          {movie.releaseYear}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
