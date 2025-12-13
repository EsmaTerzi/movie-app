"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { watchlistService } from "@/services/watchlist.service";
import { useNotification } from "@/contexts/NotificationContext";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import Button from "@/components/common/Button";
import Rating from "@/components/common/Rating";
import styles from "./page.module.css";
import { Movie, WatchListMovies } from "@/types";

function WatchlistDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { success, error } = useNotification();
  const [watchlistData, setWatchlistData] = useState<WatchListMovies | null>(null);
  const [loading, setLoading] = useState(true);
  const [removingMovieId, setRemovingMovieId] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchWatchlistMovies();
    }
  }, [params.id]);

  const fetchWatchlistMovies = async () => {
    setLoading(true);
    try {
      const data = await watchlistService.getMoviesByWatchlist(
        params.id as string
      );
      setWatchlistData(data as unknown as WatchListMovies);
    } catch (err) {
      error("İzleme listesi yüklenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMovie = async (e: React.MouseEvent, movieId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    setRemovingMovieId(movieId);
    try {
      await watchlistService.removeMovieFromWatchlist(params.id as string, movieId);
      success('Film listeden çıkarıldı!');
      
      // Listeyi yeniden yükle
      const data = await watchlistService.getMoviesByWatchlist(params.id as string);
      setWatchlistData(data as unknown as WatchListMovies);
    } catch (err) {
      console.error('Film çıkarılırken hata:', err);
      error('Film çıkarılırken hata oluştu.');
    } finally {
      setRemovingMovieId(null);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className={styles.container}>
          <div className={styles.loading}>Yükleniyor...</div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <div className={styles.header}>
          <Button variant="secondary" onClick={() => router.back()}>
            ← Geri
          </Button>
          <h1 className={styles.title}>{watchlistData?.name || 'İzleme Listem'}</h1>
          <div></div>
        </div>

        {!watchlistData?.movies || watchlistData.movies.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🎬</div>
            <h2>Bu listede henüz film yok</h2>
            <p>Film detay sayfasından filmler ekleyebilirsiniz.</p>
            <Link href="/movies">
              <Button>Filmlere Göz At</Button>
            </Link>
          </div>
        ) : (
          <div className={styles.moviesGrid}>
            {watchlistData.movies.map((movie) => (
              <div key={movie.id} className={styles.movieCardWrapper}>
                <Link
                  href={`/movies/${movie.id}`}
                  className={styles.movieCard}
                >
                  <div className={styles.posterContainer}>
                    <Image
                      src={movie.posterUrl || "/placeholder-movie.jpg"}
                      alt={movie.title}
                      fill
                      className={styles.poster}
                    />
                  </div>
                  <div className={styles.movieInfo}>
                    <h3 className={styles.movieTitle}>{movie.title}</h3>
                    <div className={styles.movieMeta}>
                      <span className={styles.year}>{movie.releaseYear}</span>
                      <span className={styles.duration}>{movie.duration} dk</span>
                    </div>
                    <div className={styles.rating}>
                      <Rating
                        value={movie.averageRating || 0}
                        readonly
                        size="small"
                      />
                      <span className={styles.ratingText}>
                        {movie.averageRating?.toFixed(1) || "0.0"}
                      </span>
                    </div>
                    <p className={styles.overview}>
                      {movie.overview?.substring(0, 100)}
                      {movie.overview && movie.overview.length > 100 ? "..." : ""}
                    </p>
                  </div>
                </Link>
                <button
                  className={styles.removeBtn}
                  onClick={(e) => handleRemoveMovie(e, movie.id)}
                  disabled={removingMovieId === movie.id}
                  title="Listeden Çıkar"
                >
                  {removingMovieId === movie.id ? '⏳' : '✕'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

export default WatchlistDetailPage;
