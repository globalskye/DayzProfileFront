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
const SidebarPage = () => {


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
                <ListItemButton >
                    <ListItemIcon>
                    <PersonSearchIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Search profiles"} />
                </ListItemButton>
            </ListItem>
            </List>
            <Divider />
            <GroupItem />
            <ContactMe />
        </Box>
    );
};



export default SidebarPage;
const ContactMe = () => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List>
            <ListItem disablePadding>
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <GroupIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Contact Me"} />
                </ListItemButton>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="https://t.me/globa0029">
                            <ListItemIcon>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19c-.14.75-.42 1-.68 1.03c-.58.05-1.02-.38-1.58-.75c-.88-.58-1.38-.94-2.23-1.5c-.99-.65-.35-1.01.22-1.59c.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02c-.09.02-1.49.95-4.22 2.79c-.4.27-.76.41-1.08.4c-.36-.01-1.04-.2-1.55-.37c-.63-.2-1.12-.31-1.08-.66c.02-.18.27-.36.74-.55c2.92-1.27 4.86-2.11 5.83-2.51c2.78-1.16 3.35-1.36 3.73-1.36c.08 0 .27.02.39.12c.1.08.13.19.14.27c-.01.06.01.24 0 .38"/>
                                </svg>
                            </ListItemIcon>
                            <ListItemText primary={"Telegram"}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="https://discord.com/global01">
                            <ListItemIcon>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m22 24l-5.25-5l.63 2H4.5A2.5 2.5 0 0 1 2 18.5v-15A2.5 2.5 0 0 1 4.5 1h15A2.5 2.5 0 0 1 22 3.5V24M12 6.8c-2.68 0-4.56 1.15-4.56 1.15c1.03-.92 2.83-1.45 2.83-1.45l-.17-.17c-1.69.03-3.22 1.2-3.22 1.2c-1.72 3.59-1.61 6.69-1.61 6.69c1.4 1.81 3.48 1.68 3.48 1.68l.71-.9c-1.25-.27-2.04-1.38-2.04-1.38S9.3 14.9 12 14.9s4.58-1.28 4.58-1.28s-.79 1.11-2.04 1.38l.71.9s2.08.13 3.48-1.68c0 0 .11-3.1-1.61-6.69c0 0-1.53-1.17-3.22-1.2l-.17.17s1.8.53 2.83 1.45c0 0-1.88-1.15-4.56-1.15m-2.07 3.79c.65 0 1.18.57 1.17 1.27c0 .69-.52 1.27-1.17 1.27c-.64 0-1.16-.58-1.16-1.27c0-.7.51-1.27 1.16-1.27m4.17 0c.65 0 1.17.57 1.17 1.27c0 .69-.52 1.27-1.17 1.27c-.64 0-1.16-.58-1.16-1.27c0-.7.51-1.27 1.16-1.27Z"/>
                                </svg>
                            </ListItemIcon>
                            <ListItemText primary={"Discord"}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Collapse>
        </List>
    );
};

const GroupItem = () => {
    const [loading, setLoading] = useState(true);
    const [groups, setGroups] = useState<Group[]>([]);
    const [newGroupName, setNewGroupName] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getGroups();
                setGroups(data);
            } catch (error) {
                console.error('Error fetching groups:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [open]);

    const handleNewGroup = async () => {
        try {
            setLoading(true);
            const newGroup = await createGroup(newGroupName);
            setGroups(prevGroups => [...prevGroups, newGroup]);
            setNewGroupName('');
        } catch (error) {
            console.error('Error creating group:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleOpen = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItem disablePadding onClick={toggleOpen}>
                <ListItemButton>
                    <ListItemIcon>
                        <GroupIcon />
                    </ListItemIcon>
                    <ListItemText primary="Groups" />
                </ListItemButton>
            </ListItem>
            <Divider />
            {open && (
                <>
                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            <List>
                                {groups.map((group, index) => (
                                    <ListItem key={group.id} disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <GroupIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={group.groupName} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                            <Divider />
                            <List>
                                <ListItem disablePadding>
                                    <TextField
                                        value={newGroupName}
                                        onChange={e => setNewGroupName(e.target.value)}
                                        label="New Group Name"
                                        variant="outlined"
                                        fullWidth
                                    />
                                </ListItem>
                                <ListItem disablePadding>
                                    <Button
                                        variant="outlined"

                                        onClick={handleNewGroup}
                                        fullWidth
                                        sx={{ mt: 1 }}
                                    >
                                        Create New Group
                                    </Button>
                                </ListItem>
                            </List>
                        </>
                    )}
                </>
            )}
        </>
    );
};

