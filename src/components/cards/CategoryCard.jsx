import { Box, Typography } from "@mui/material";
import CategoryImage from "../../assets/category.png";
import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <>
      <Box
        className="category-card"
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: {
            md: "200px",
            xs: "180px",
          },
        }}
      >
        <Box
          component="img"
          src={category.image || CategoryImage}
          alt={category.name}
          sx={{
            m: "auto",
            width: {
              md: "160px",
              xs: "80px",
            },
            height: {
              md: "120px",
              xs: "80px",
            },
          }}
        />
      </Box>

      <Box
        mt={2}
        sx={{
          textAlign: "center",
          fontWeight: 500,
        }}
      >
        <Link
          to={`/categories/${category.id}/products`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography variant="body2">{category.name}</Typography>
        </Link>
      </Box>
    </>
  );
}
