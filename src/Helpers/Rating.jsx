import React from "react";
import { FaRegStarHalfStroke, FaStar, FaRegStar } from "react-icons/fa6";

function Rating({ rating = 0 }) { // Default rating to 0
  // Ensure rating is a valid number
  const safeRating = Math.max(0, Math.min(5, parseFloat(rating) || 0));

  // Calculate the number of full, half, and empty stars
  const fullStars = Math.floor(safeRating);
  const halfStar = safeRating % 1 !== 0; // Check if there's a half star
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Calculate remaining empty stars

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {/* Render full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} style={{ color: "#f39c12" }} />
      ))}
      {/* Render half star if applicable */}
      {halfStar && <FaRegStarHalfStroke style={{ color: "#f39c12" }} />}
      {/* Render empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index + fullStars + (halfStar ? 1 : 0)} style={{ color: "#f39c12" }} />
      ))}
    </div>
  );
}

export default Rating;
