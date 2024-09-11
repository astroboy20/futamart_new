import React from "react";

const StarRating = ({ rating, width, height }) => {
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
        fill={filled || isHalf ? "#FFAD33" : "none"}
        stroke="#FFAD33"
        strokeWidth="1"
        clipPath={isHalf ? `url(#halfStarClip-${key})` : ""}
      />
    </svg>
  );

  if (rating === 0) {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {Array.from({ length: 5 }).map((_, i) => renderStar(i))}
      </div>
    );
  }

  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
  let emptyStars = Math.max(0, 5 - fullStars - halfStar);
  const clipWidth = halfStar ? (rating - fullStars) * 100 : 0;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {Array.from({ length: fullStars }).map((_, i) => renderStar(i, true))}
      {halfStar ? renderStar(fullStars, false, true) : null}
      {Array.from({ length: emptyStars }).map((_, i) =>
        renderStar(fullStars + halfStar + i)
      )}
    </div>
  );
};

export { StarRating };
