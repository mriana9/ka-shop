import { Box, Button, Typography } from "@mui/material";

export default function QuantityButton({ count, onIncrease, onDecrease }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: 1,
        overflow: "hidden",
        mt: 1,
      }}
    >
      <Button
        variant="text"
        sx={{ minWidth: 40, color: "#312d5f" }}
        onClick={onDecrease}
      >
        -
      </Button>
      <Typography
        sx={{
          px: 2,
          borderLeft: "1px solid #ccc",
          borderRight: "1px solid #ccc",
          minWidth: 32,
          textAlign: "center",
        }}
      >
        {count}
      </Typography>
      <Button
        variant="text"
        sx={{ minWidth: 40, color: "#312d5f" }}
        onClick={onIncrease}
      >
        +
      </Button>
    </Box>
  );
}
