import {
  Box,
  Grid,
  Typography,
  Container,
  Pagination,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import ProductCard from "../../components/cards/ProductCard";
import axiosAuth from "../../api/axiosAuthInstance";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductCardSkeleton from "../../components/loading/ProductCardSkeleton";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

export default function Products() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("price");
  const [sortOrder, setSortOrder] = useState("ASC");
  const limit = 2;
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    const endpoint = id
      ? `/categories/${id}/products`
      : `/products?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${sortOrder}&query=${search}`;
    const res = await axiosAuth.get(endpoint);
    return res.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["productsByCategory", id, page, sortBy, sortOrder, search],
    queryFn: fetchProducts,
    keepPreviousData: true,
  });

  const products = id ? data || [] : data?.data || [];
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setPage(1);
  };

  return (
    <Container sx={{ py: 3 }} className="best-sellers">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Products</Typography>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", mb: 2, gap: 2 }}
        >
          {/* Search Field */}
          <TextField
            label="Search products"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            sx={{
              minWidth: 250,
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#4fc4ca",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: "#4fc4ca" }} />
                </InputAdornment>
              ),
            }}
          />

          <FormControl
            size="small"
            sx={{
              minWidth: 150,
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#4fc4ca",
                },
              },
            }}
          >
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} onChange={handleSortChange} label="Sort By">
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="name">Name</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            size="small"
            sx={{
              minWidth: 120,
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#4fc4ca",
                },
              },
            }}
          >
            <InputLabel>Order</InputLabel>
            <Select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                setPage(1);
              }}
              label="Order"
            >
              <MenuItem value="ASC">Ascending</MenuItem>
              <MenuItem value="DESC">Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {isLoading ? (
        <Grid container spacing={2}>
          {[...Array(2)].map((_, index) => (
            <Grid item size={{ xs: 6, md: 3 }} key={index}>
              <ProductCardSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : isError ? (
        <Typography color="error">Error: {error.message}</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item size={{ xs: 6, md: 3 }} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
}
