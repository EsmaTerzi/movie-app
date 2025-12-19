"use client";

import React, { useEffect, useState } from "react";
import { movieService } from "@/services/movie.service";
import { Movie, Genre } from "@/types";
import Table, { Column } from "@/components/common/Table";
import Button from "@/components/common/Button";
import MovieAddModal from "./modal/MovieAddModal";
import MovieEditModal from "./modal/MovieEditModal";
import MovieDeleteModal from "./modal/MovieDeleteModal";
import styles from "./page.module.css";
import { adminService } from "@/services/admin.service";
import { useNotification } from "@/contexts/NotificationContext";

export default function DashboardMoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { success , error } = useNotification();

  // Form state
  const [formData, setFormData] = useState<Partial<Movie>>({
    title: "",
    overview: "",
    releaseYear: "",
    posterUrl: "",
    director: "",
    duration: 0,
    genreIds: [],
  });

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const data = await movieService.getAllMovies();
      setMovies(data);
      
    } catch (error) {
      console.error("Filmler yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGenres = async () => {
    try {
      const data = await movieService.getGenres();
      setGenres(data);
    } catch (error) {
      console.error("Türler yüklenirken hata:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      overview: "",
      releaseYear: "",
      posterUrl: "",
      director: "",
      duration: 0,
      genreIds: [],
    });
  };

  const handleAddMovie = async () => { 
    setSubmitting(true);
    try {
      await adminService.createMovie(formData);
      await fetchMovies();
      success("Yeni film başarıyla eklendi!");
      setShowAddModal(false);
      resetForm();
    } catch (error) {
      console.error("Film eklenirken hata:", error);
      error("Film eklenirken bir hata oluştu.");
    } finally {
      setSubmitting(false);
    }
  };
  const handleGenreToggle = (genreId: number) => {
    const currentGenres = formData.genreIds || [];
    if (currentGenres.includes(genreId)) {
      setFormData({
        ...formData,
        genreIds: currentGenres.filter((id) => id !== genreId),
      });
    } else {
      setFormData({
        ...formData,
        genreIds: [...currentGenres, genreId],
      });
    }
  };

  const handleEdit = async (movie: Movie) => {
   
    setSelectedMovie(movie);
    try {
      // Film detaylarını API'den al (genreIds dahil)
      const movieDetails = await movieService.getMovieById(movie.id);
      
      // API'den gelen genreIds veya genresIds'i kontrol et
      let genreIds = [];
      if (movieDetails.genresIds) {
        genreIds = movieDetails.genresIds;
      } else if (movieDetails.genreIds) {
        genreIds = movieDetails.genreIds;
      } else if (movie.genreIds) {
        genreIds = movie.genreIds;
      }
      
      const newFormData = {
        title: movie.title,
        overview: movie.overview,
        releaseYear: movie.releaseYear,
        posterUrl: movie.posterUrl,
        director: movie.director,
        duration: movie.duration,
        genreIds: genreIds,
      };
      setFormData(newFormData);
    } catch (error) {
      console.error('Film detayları alınırken hata:', error);
      setFormData({
        title: movie.title,
        overview: movie.overview,
        releaseYear: movie.releaseYear,
        posterUrl: movie.posterUrl,
        director: movie.director,
        duration: movie.duration,
        genreIds: movie.genreIds || [],
      });
    }
    setShowEditModal(true);
  };

  const handleDelete = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowDeleteModal(true);
  };

  const columns: Column<Movie>[] = [
    {
      key: "id",
      header: "ID",
      width: "80px",
    },
    {
      key: "title",
      header: "Film Adı",
      width: "250px",
    },
    {
      key: "director",
      header: "Yönetmen",
      width: "180px",
    },
    {
      key: "releaseYear",
      header: "Yıl",
      width: "100px",
    },
    {
      key: "duration",
      header: "Süre",
      width: "100px",
      render: (movie) => `${movie.duration} dk`,
    },
    {
      key: "averageRating",
      header: "Puan",
      width: "100px",
      render: (movie) => movie.averageRating?.toFixed(1) || "-",
    },
    {
      key: "actions",
      header: "İşlemler",
      width: "200px",
      render: (movie) => (
        <div className={styles.actionButtons}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(movie);
            }}
            className={styles.editBtn}
          >
            Düzenle
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(movie);
            }}
            className={styles.deleteBtn}
          >
            Sil
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Filmler</h1>
          <p className={styles.subtitle}>Film koleksiyonunu yönetin</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>+ Yeni Film Ekle</Button>
      </div>

      <Table
        columns={columns}
        data={movies}
        loading={loading}
        emptyMessage="Henüz film eklenmemiş"
      />

      <MovieAddModal
        open={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          resetForm();
        }}
        genres={genres}
        formData={formData}
        setFormData={setFormData}
        submitting={submitting}
        onSubmit={handleAddMovie}
        handleGenreToggle={handleGenreToggle}
      />

      <MovieEditModal
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          resetForm();
        }}
        genres={genres}
        formData={formData}
        setFormData={setFormData}
        submitting={submitting}
        onSubmit={async () => {
          if (!selectedMovie) return;
          setSubmitting(true);
          try {
            await adminService.updateMovie(selectedMovie.id, formData);
            await fetchMovies();
            success("Film başarıyla güncellendi!");
            setShowEditModal(false);
            resetForm();
          } catch (err) {
            error("Film güncellenirken bir hata oluştu.");
          } finally {
            setSubmitting(false);
          }
        }}
        handleGenreToggle={handleGenreToggle}
        selectedMovie={selectedMovie}
      />

      <MovieDeleteModal
        open={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          resetForm();
        }}
        submitting={submitting}
        onSubmit={async () => {
          if (!selectedMovie) return;
          setSubmitting(true);
          try {
            await adminService.deleteMovie(selectedMovie.id);
            await fetchMovies();
            success("Film başarıyla silindi!");
            setShowDeleteModal(false);
            resetForm();
          } catch (err) {
            error("Film silinirken bir hata oluştu.");
          } finally {
            setSubmitting(false);
          }
        }}
        selectedMovie={selectedMovie}
      />
    </div>
  );
}
