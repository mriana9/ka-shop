import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ProductCard from "../../components/cards/ProductCard";
import axiosAuth from "../../api/axiosAuthInstance";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductCardSkeleton from "../../components/loading/ProductCardSkeleton";

export default function Products() {
  //const [searchTerm, setSearchTerm] = useState("");

  // Filter products by search term (case insensitive)
  // const filteredProducts = productsData.filter((product) =>
  //   product.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const handleSearchChange = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  // const handleFilterClick = () => {
  //   // Implement filter functionality here if you want
  //   alert("Filter button clicked!");
  // };

  const { id } = useParams();
  //const queryClient = useQueryClient();

  const fetchProductByCategory = async (id) => {
    const res = await axiosAuth.get(`/categories/${id}/products`);
    return res.data;
  };

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["productsByCategory", id],
    queryFn: () => fetchProductByCategory(id),
  });

  return (
    <Container sx={{ py: 3 }} className="best-sellers">
      {isLoading ? (
        <Grid container spacing={2}>
          {[...Array(5)].map((_, index) => (
            <Grid size={{ xs: 6, md: 3 }} key={index}>
              <ProductCardSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : isError ? (
        <Typography color="error">Error: {error.message}</Typography>
      ) : (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid size={{ xs: 6, md: 3 }} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
