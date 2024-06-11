import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupIcon from '@mui/icons-material/Group';
import { getGroups,createGroup } from '../../services/cftoolsAPI';
import {Group} from '../../models/models';
import {Button, CircularProgress, Collapse, TextField} from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';


import { Link } from 'react-router-dom';
const Sidebar = () => {
    const [authorization, setAuthorization] = useState(localStorage.getItem('authorization') || '');

    const handleAuthorizationChange = (event: { target: { value: any; }; }) => {
        const value = event.target.value;
        setAuthorization(value);
        localStorage.setItem('authorization', value);
    };

    return (
        <Box
            sx={{
                width: 300,
                height: '100vh',
                borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                position: 'fixed',
                top: 0,
                left: 0,
                backgroundColor: '#f9f9f9',
                zIndex: 1000,
                padding: '16px'
            }}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/profiles">
                        <ListItemIcon>
                            <PersonSearchIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Search profiles"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/groups">
                        <ListItemIcon>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Search groups"} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <ListItemButton href={'https://t.me/globa0029'}>
                <ListItemIcon>
                    <ContactSupportIcon />
                </ListItemIcon>
                <ListItemText primary={"Contact Me"} />
            </ListItemButton>
            <TextField
                label="Authorization"
                value={authorization}
                onChange={handleAuthorizationChange}
                fullWidth
                variant="outlined"
                margin="normal"
                type="password"

            />
        </Box>
    );
};

export default Sidebar;