import { createBrowserRouter } from 'react-router-dom';
import Home from './Home'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        // children: [
        //     { path: 'login', element: <Login /> },
        //     { path: 'register', element: <Register /> },
        //     { path: 'shop-cart', element: <ShopCart /> },
        //     { path: 'home', element: <Home /> }
        // ]
    },

]);

export default router;