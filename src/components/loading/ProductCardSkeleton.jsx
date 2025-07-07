import { Box, Skeleton, Card } from "@mui/material";

export default function ProductCardSkeleton() {
  return (
    <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
      <Skeleton variant="rectangular" height={200} animation="wave" />
      <Box sx={{ p: 2 }}>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="40%" />
      </Box>
    </Card>
  );
}
