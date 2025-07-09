import { useQuery } from "@tanstack/react-query";
import axiosAuth from "../../api/axiosAuthInstance";
import OrderCard from "../cards/OrderCard";
import { Typography } from "@mui/material";
import OrderCardSkeleton from "../loading/OrderCardSkeleton";

export default function MyOrders() {
  const fetchUserData = async () => {
    const res = await axiosAuth.get("/Orders");
    return res.data;
  };

  const { data: userOrders, isLoading } = useQuery({
    queryKey: ["userOrders"],
    queryFn: fetchUserData,
    staleTime: 0,
  });

  return (
    <>
      <Typography variant="h6">
        My Orders: ({userOrders?.length || 0}){" "}
      </Typography>

      {isLoading ? (
        <OrderCardSkeleton />
      ) : userOrders?.length > 0 ? (
        userOrders.map((order, index) => (
          <OrderCard key={index} order={order} />
        ))
      ) : (
        <Typography>No Orders Found.</Typography>
      )}
    </>
  );
}
