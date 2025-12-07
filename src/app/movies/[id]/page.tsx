"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { movieService } from "@/services/movie.service";
import { reviewService } from "@/services/review.service";
import { useAuth } from "@/contexts/AuthContext";
import { useNotification } from "@/contexts/NotificationContext";
import { Movie, Review } from "@/types";
import Rating from "@/components/common/Rating/Rating";
import Button from "@/components/common/Button/Button";
import Textarea from "@/components/common/Textarea/Textarea";
import styles from "./page.module.css";

export default function MovieDetailPage() {
  const params = useParams();
  const { isAuthenticated  } = useAuth();
  const { warning, success } = useNotification();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [moviesGenres, setMoviesGenres] = useState<string>("");

  useEffect(() => {
    if (params.id) {
      fetchMovieData();
    }
  }, [params.id]);

  const fetchMovieData = async () => {
    setLoading(true);
    try {
      const movieData = await movieService.getMovieById(params.id as string);
      setMovie(movieData);

      const reviewsData = await reviewService.getMovieReviews(
        params.id as string
      );
      setReviews(reviewsData);
    } catch (error) {
      console.error("Film verileri yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      warning("Değerlendirme yapmak için giriş yapmalısınız");
      return;
    }

    if (rating === 0) {
      warning("Lütfen bir puan seçin");
      return;
    }

    setSubmitting(true);
    try {
      await reviewService.createOrUpdateRating({
        movieId: parseInt(params.id as string),
        rating,
        reviewText: comment,
      });

      success(
        userReview
          ? "Değerlendirmeniz güncellendi!"
          : "Değerlendirmeniz kaydedildi!"
      );

      // İnputları temizle
      setRating(0);
      setComment("");
      setUserReview(null);

      // Verileri yeniden yükle
      fetchMovieData();
    } catch (error) {
      console.error("Yorum gönderilirken hata:", error);
      warning("Yorum gönderilemedi. Lütfen tekrar deneyin.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Yükleniyor...</div>;
  }

  if (!movie) {
    return <div className={styles.error}>Film bulunamadı</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.movieHeader}>
        <div className={styles.posterContainer}>
          <Image
            src={movie.posterUrl || "/placeholder-movie.jpg"}
            alt={movie.title}
            fill
            className={styles.poster}
          />
        </div>
        <div className={styles.movieInfo}>
          <h1 className={styles.title}>{movie.title}</h1>
          <div className={styles.meta}>
            <span>{moviesGenres}</span>
            <span>•</span>
            <span>{movie.releaseYear}</span>
            <span>•</span>
            <span>{movie.duration} dk</span>
          </div>
          <div className={styles.rating}>
            <Rating
              value={movie.averageRating || 0}
              readonly
              size="large"
              showValue
            />
            <span className={styles.reviewCount}>
              ({movie.totalReviews || 0} değerlendirme)
            </span>
          </div>
          <p className={styles.director}>Yönetmen: {movie.director}</p>
          <p className={styles.description}>{movie.overview}</p>
        </div>
      </div>

      <div className={styles.reviewsSection}>
        <h2 className={styles.sectionTitle}>Değerlendirmeler</h2>

        {!isAuthenticated && (
          <div className={styles.loginPrompt}>
            <p>
              Değerlendirme yapmak için lütfen{" "}
              <Link href="/auth/login" className={styles.loginLink}>
                giriş yapın
              </Link>
              .
            </p>
          </div>
        )}

        {isAuthenticated && (
          <form onSubmit={handleSubmitReview} className={styles.reviewForm}>
            <h3 className={styles.formTitle}>
              {userReview
                ? "Değerlendirmenizi Düzenleyin"
                : "Değerlendirme Yapın"}
            </h3>
            <div className={styles.ratingInput}>
              <label>Puanınız:</label>
              <Rating value={rating} onChange={setRating} size="large" />
            </div>
            <Textarea
              label="Yorumunuz"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Bu film hakkında düşüncelerinizi paylaşın..."
              rows={4}
              fullWidth
            />
            <Button type="submit" loading={submitting}>
              {userReview ? "Güncelle" : "Gönder"}
            </Button>
          </form>
        )}

        <div className={styles.reviewsList}>
          {reviews.length === 0 ? (
            <p className={styles.noReviews}>Henüz değerlendirme yapılmamış.</p>
          ) : (
            reviews.map((review, key) => (
              <div key={key} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <strong>{review.username || "Anonim"}</strong>
                  <Rating value={review.rating} readonly size="small" />
                </div>
                <p className={styles.reviewComment}>{review.reviewText}</p>
                <span className={styles.reviewDate}>
                  {new Date(review.createdAt).toLocaleDateString("tr-TR")}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
