import {
  Box,
  Skeleton,
  Divider,
  Typography,
  List,
  ListItem,
} from "@mui/material";

export default function OrderDetailsSkeleton() {
  return (
    <Box>
      {/* Heading */}
      <Typography variant="h6" gutterBottom>
        <Skeleton width="40%" />
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {/* Order Info Skeleton */}
      <Box mb={2}>
        <Skeleton width="60%" height={24} />
        <Skeleton width="50%" height={24} />
        <Skeleton width="40%" height={24} />
        <Skeleton width="70%" height={24} />
        <Skeleton width="60%" height={24} />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Products Section */}
      <Typography variant="subtitle1" gutterBottom>
        <Skeleton width="30%" />
      </Typography>

      <List dense>
        {Array.from({ length: 2 }).map((_, index) => (
          <ListItem key={index} disablePadding sx={{ mb: 1 }}>
            <Box width="100%">
              <Skeleton width="70%" height={22} />
              <Skeleton width="40%" height={18} />
            </Box>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />
      <Skeleton width="50%" height={32} />
    </Box>
  );
}
