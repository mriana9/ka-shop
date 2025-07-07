import { Box, Skeleton, Typography } from "@mui/material";

export function CategoryCardSkeleton() {
  return (
    <>
      <Box
        className="category-card"
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderRadius:"50%",
          alignItems: "center",
          height: {
            md: "200px",
            xs: "180px",
          },
          backgroundColor: "#f0f0f0",
        }}
      >
        <Skeleton
          variant="rectangular"
          width={{ md: 160, xs: 80 }}
          height={{ md: 120, xs: 80 }}
          animation="wave"
        />
      </Box>
    </>
  );
}
