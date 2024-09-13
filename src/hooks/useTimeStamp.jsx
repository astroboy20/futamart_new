export const useTimestamp = ({ timestamp }) => {
  const now = new Date();
  const timeDiff = now - new Date(timestamp);

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years}yr${years > 1 ? "s" : ""} ago`;
  } else if (months > 0) {
    return `${months}mo${months > 1 ? "s" : ""} ago`;
  } else if (weeks > 0) {
    return `${weeks}wk${weeks > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days}d${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours}hr${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes}min${minutes > 1 ? "s" : ""} ago`;
  } else if (seconds > 0) {
    return `${seconds}s ago`;
  } else {
    return `${timeDiff}ms ago`;
  }
};
