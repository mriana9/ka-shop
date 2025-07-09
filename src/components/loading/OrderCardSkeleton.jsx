import { Box, Skeleton, Stack, Divider } from "@mui/material";

export default function OrderCardSkeleton() {
  return (
    <Box
      border="1px solid #ddd"
      borderRadius={2}
      p={2}
      my={2}
      sx={{ backgroundColor: "#fff" }}
    >
      {/* Header Row */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Skeleton width={120} height={24} />
          <Skeleton width={60} height={16} sx={{ mt: 1 }} />
        </Box>
        <Skeleton
          variant="rounded"
          width={100}
          height={30}
          sx={{ borderRadius: 1 }}
        />
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* Order Progress */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {[...Array(4)].map((_, idx) => (
          <Box key={idx} textAlign="center" width="100%">
            <Skeleton
              variant="circular"
              width={30}
              height={30}
              sx={{ mx: "auto" }}
            />
            <Skeleton width={60} height={10} sx={{ mt: 1, mx: "auto" }} />
            <Skeleton width={70} height={10} sx={{ mx: "auto" }} />
          </Box>
        ))}
      </Stack>

      {/* Dates and Payment */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        spacing={2}
        mt={3}
      >
        {[...Array(3)].map((_, idx) => (
          <Box key={idx}>
            <Skeleton width={100} height={14} />
            <Skeleton width={120} height={12} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
