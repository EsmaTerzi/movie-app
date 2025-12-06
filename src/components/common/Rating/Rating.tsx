import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import styles from './Rating.module.css';

interface RatingProps {
  value: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'small' | 'medium' | 'large';
  showValue?: boolean;
}

const Rating: React.FC<RatingProps> = ({
  value,
  onChange,
  readonly = false,
  size = 'medium',
  showValue = false,
}) => {
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const handleClick = (rating: number) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  const handleMouseEnter = (rating: number) => {
    if (!readonly) {
      setHoveredRating(rating);
    }
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const displayRating = hoveredRating || value;

  return (
    <div className={`${styles.rating} ${styles[size]}`}>
      <div className={styles.stars} onMouseLeave={handleMouseLeave}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`${styles.star} ${readonly ? '' : styles.interactive}`}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
          >
            {star <= displayRating ? (
              <FaStar className={styles.filled} />
            ) : (
              <FaRegStar className={styles.empty} />
            )}
          </span>
        ))}
      </div>
      {showValue && (
        <span className={styles.value}>
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;
