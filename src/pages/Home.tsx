import { Box, Grid } from "@mui/material";
import ProfileTable from "./components/ProfileTable";
import SidebarPage from "./components/sidebar";

const Home = () => {
    return (
        <div style={{ backgroundColor: 'black', height: '400vh' }}>
            <Grid
                container
                justifyContent="center"
                height="100%"
                spacing={2}
                padding={2}
            >
                <Grid item xs={2}>
                    <SidebarPage />
                </Grid>
                <Grid item xs={8}>
                    <ProfileTable />
                </Grid>
            </Grid>
        </div>
    );
};
export default Home;