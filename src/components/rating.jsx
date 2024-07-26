import React from "react";

const StarRating = ({ rating, width, height }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  const clipWidth = halfStar ? (rating - fullStars) * 100 : 0;

  const renderStar = (key, filled = false, isHalf = false) => (
    <svg
      key={key}
      width={width}
      height={height}
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      {isHalf ? (
        <defs>
          <clipPath id={`halfStarClip-${key}`}>
            <rect x="0" y="0" width={`${clipWidth}%`} height="100%" />
          </clipPath>
        </defs>
      ) : null}
      <polygon
        points="20,1 25,14 39,14 27,22 32,35 20,27 8,35 13,22 1,14 15,14"
        fill={filled || isHalf ? "gold" : "none"}
        stroke="gold"
        strokeWidth="1"
        clipPath={isHalf ? `url(#halfStarClip-${key})` : ""}
      />
    </svg>
  );

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {[...Array(fullStars)]?.map((_, i) => renderStar(i, true))}
      {halfStar ? renderStar(fullStars, false, true) : null}
      {[...Array(emptyStars)]?.map((_, i) =>
        renderStar(fullStars + halfStar + i)
      )}
    </div>
  );
};

export { StarRating };
