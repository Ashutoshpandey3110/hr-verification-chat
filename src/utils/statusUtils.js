export const getStatus = count =>
  count >= 4 ? "completed" : count > 0 ? "partial" : "pending";
