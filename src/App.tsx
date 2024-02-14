import React from 'react';
import './App.css';
import {Route, BrowserRouter as Router, RouterProvider, Routes} from "react-router-dom";
import ProfileTable from "./pages/components/ProfileTable";
import Home from "./pages/Home";
import GroupTable from "./pages/components/Group";
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profiles" element={<ProfileTable />} />
                <Route path="/groups" element={<GroupTable />} />
            </Routes>
        </Router>
    );
};
export default App;
