import { Box, Grid, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ProductCard from "../../components/cards/ProductCard";

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

  return (
    <Box sx={{ p: 2 }}>
      {/* Search + Filter Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        <TextField
          size="small"
          placeholder="Search"
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
          sx={{ minWidth: 200 }}
        />
        <Button variant="outlined" startIcon={<FilterListIcon />}>
          Filters
        </Button>
      </Box>

      {/* Products Grid */}
      {/* <Grid container spacing={2}>
        {filteredProducts.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}

        {filteredProducts.length === 0 && (
          <Box sx={{ p: 2, width: "100%", textAlign: "center", color: "gray" }}>
            No products found.
          </Box>
        )}
      </Grid> */}
    </Box>
  );
}
