import { Box, Card, CardContent, Skeleton, Avatar } from "@mui/material";

export default function ReviewCardSkeleton() {
  return (
    <Card sx={{ mb: 2, boxShadow: 1 }}>
      <CardContent>
        {/* Reviewer Name & Avatar */}
        <Box display="flex" alignItems="center" gap={2} mb={1}>
          <Skeleton variant="circular">
            <Avatar sx={{ width: 36, height: 36 }} />
          </Skeleton>

          <Skeleton width="40%" height={24} />
        </Box>

        {/* Comment */}
        <Skeleton width="100%" height={20} sx={{ mb: 1 }} />
        <Skeleton width="90%" height={20} sx={{ mb: 1 }} />
        <Skeleton width="60%" height={20} sx={{ mb: 2 }} />

        {/* Rating & Date */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Skeleton width={80} height={20} />
          <Skeleton width={60} height={20} />
        </Box>
      </CardContent>
    </Card>
  );
}
