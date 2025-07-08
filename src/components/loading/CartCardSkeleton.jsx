import { Box, Skeleton } from "@mui/material";

export default function CartCardSkeleton() {
  return (
    <Box
      display="flex"
      sx={{
        flexDirection: {
          xs: "column",
          md: "row",
        },
        alignItems: {
          xs: "flex-start",
          md: "center",
        },
      }}
      gap={2}
      mb={2}
    >
      {/* Image Skeleton */}
      <Skeleton
        variant="rectangular"
        sx={{
          height: { xs: 100, md: 120 },
          width: 120,
          flexShrink: 0,
        }}
      />

      {/* Info Skeleton */}
      <Box flex={1}>
        <Skeleton width="60%" height={28} />
        <Skeleton width="80%" height={20} sx={{ mt: 1 }} />
        <Box mt={1} display="flex" gap={1}>
          <Skeleton width={40} height={20} />
          <Skeleton width={60} height={20} />
        </Box>
      </Box>

      {/* Actions Skeleton */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: {
            xs: "flex-start",
            md: "flex-end",
          },
          gap: 1,
        }}
      >
        <Skeleton variant="circular" width={36} height={36} />
        <Skeleton variant="circular" width={36} height={36} />
        <Skeleton width={80} height={30} />
      </Box>
    </Box>
  );
}
