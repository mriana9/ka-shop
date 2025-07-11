import {
  Card,
  CardContent,
  Typography,
  Box,
  Rating,
  Avatar,
} from "@mui/material";

export default function ReviewCard({ review }) {
  // Extract initials
  const getInitials = (name) => {
    const parts = name.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return `${first}${last}`.toUpperCase();
  };

  return (
    <Card sx={{ mb: 2, boxShadow: 1 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={1}>
          <Avatar
            sx={{
              bgcolor: "gray",
              color: "#fff",
              fontSize: 14,
              width: 36,
              height: 36,
            }}
          >
            {getInitials(review.reviewerName)}
          </Avatar>

          <Typography variant="subtitle2" sx={{fontWeight:600}}>{review.reviewerName}</Typography>
        </Box>

        <Typography variant="body2" mb={1}>
          {review.comment}
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Rating value={review.rate} readOnly size="small" />
          <Typography variant="caption" color="text.secondary">
            {new Date(review.reviewDate).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
