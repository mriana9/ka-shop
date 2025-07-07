import {
  Box,
  Grid,
  Stack,
  Skeleton,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function ProductDetailsSkeleton() {
  return (
    <Box p={4}>
      <Grid container spacing={4}>
        {/* Left Column (Images) */}
        <Grid item size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexDirection: { xs: "column-reverse", md: "row" },
            }}
          >
            {/* Thumbnail skeletons */}
            <Stack
              sx={{
                flexDirection: { xs: "row", md: "column" },
                gap: 2,
              }}
            >
              {[1, 2, 3, 4].map((i) => (
                <Skeleton
                  key={i}
                  variant="rounded"
                  width={60}
                  height={60}
                  animation="wave"
                />
              ))}
            </Stack>

            {/* Main Image skeleton */}
            <Skeleton
              variant="rectangular"
              height={500}
              sx={{
                flexGrow: 1,
                borderRadius: 2,
                Width: "90%",
              }}
              animation="wave"
            />
          </Box>
        </Grid>

        {/* Right Column (Details) */}
        <Grid item size={{ xs: 12, md: 6 }}>
          <Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Skeleton width="60%" height={32} />
              <IconButton disabled>
                <FavoriteBorderIcon />
              </IconButton>
            </Box>

            <Skeleton height={60} sx={{ mt: 3 }} />
            <Skeleton width="40%" height={28} sx={{ mt: 3 }} />

            {/* Rating */}
            <Skeleton width="30%" height={28} sx={{ mt: 2 }} />

            {/* Colors */}
            <Skeleton width="40%" height={28} sx={{ mt: 3 }} />
            <Box display="flex" gap={1} mt={1}>
              {[...Array(5)].map((_, idx) => (
                <Skeleton
                  key={idx}
                  variant="circular"
                  width={24}
                  height={24}
                  animation="wave"
                />
              ))}
            </Box>

            {/* Price */}
            <Skeleton width="30%" height={32} sx={{ mt: 3 }} />

            {/* Quantity and Buy */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
              <Skeleton variant="rectangular" width={100} height={40} />
              <Button
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                disabled
                sx={{ flexGrow: 1, height: "40px", backgroundColor: "#4fc4ca" }}
              >
                Buy
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
