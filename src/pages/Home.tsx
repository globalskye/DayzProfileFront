import { Box, Grid } from "@mui/material";
import ProfileTable from "./components/ProfileTable";
import SidebarPage from "./components/sidebar";

const Home = () => {
  return (
    <Grid
    container
    justifyContent="center"
    alignItems="center"
    width="50%"
    sx={{
      height: "100vh",
      margin: "auto",
    }}
  >
    <ProfileTable />
  </Grid>
  );
};
export default Home;
