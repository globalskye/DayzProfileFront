import { Box, Grid } from "@mui/material";
import ProfileTable from "./components/ProfileTable";
import SidebarPage from "./components/sidebar";

const Home = () => {
    return (
        <Grid container>
      <SidebarPage />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          height: '100vh',
     
          
        }}
      >
        <Box
          sx={{
            width: '40%',
            
            padding: '20px', // Padding on all sides
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
            backgroundColor: 'grey',
            borderRadius: '8px', // Optional: Add border-radius for a rounded appearance
          }}
        >
          <ProfileTable />
        </Box>
      </Grid>
    </Grid>
    )
}
export default Home