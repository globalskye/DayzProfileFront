import { createBrowserRouter } from 'react-router-dom';
import Home from './Home'
import ProfileTable from "./components/ProfileTable";
import GroupTable from "./components/Group";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        children: [
            { path: 'profiles', element: <ProfileTable /> },
            { path: 'groups', element: <GroupTable /> },

        ]
    },


]);

export default router;