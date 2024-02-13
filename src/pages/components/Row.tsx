// Row.tsx
import React, { useState, useEffect } from 'react';
import { getProfileInformation } from '../../services/cftoolsAPI';
import { ProfileState, ProfileInformation } from '../../models/models';
import { TableRow, TableCell, Collapse, IconButton, CircularProgress, Avatar, Typography, Link, List, ListItem, ListItemText } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface RowProps {
    state: ProfileState;
    handleAddToGroup: (state: ProfileState) => void;
}

const Row: React.FC<RowProps> = ({ state, handleAddToGroup }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [profileInformation, setProfileInformation] = useState<ProfileInformation | null>(null);

    useEffect(() => {
        if (open) {
            fetchData();
        }
    }, [open]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getProfileInformation(state.cftoolsId);
            setProfileInformation(data);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{state.identifier}</TableCell>
                <TableCell>{state.displayName}</TableCell>
                <TableCell>{state.playState.online ? 'Online' : 'Offline'}</TableCell>
                <TableCell>{state.playState.server.name}</TableCell>
                <TableCell>
                    <button
                        className="button add"
                        onClick={() => handleAddToGroup(state)}
                        disabled={loading}
                    >
                        Add to Group
                    </button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <>
                                <Avatar alt="Steam Avatar" src={profileInformation?.steam?.profile?.avatarfull} />
                                <Typography variant="h6" gutterBottom component="div">
                                    <Link href={profileInformation?.steam?.profile?.profileurl} target="_blank">
                                        {profileInformation?.steam?.profile?.personaname}'s Steam Profile
                                    </Link>
                                </Typography>
                                <Typography variant="h6" gutterBottom component="div">
                                    Nicknames:
                                </Typography>
                                <Typography variant="body1" gutterBottom component="div">
                                    {profileInformation?.overview?.omega?.aliases?.join(' | ') || 'No nicknames available'}
                                </Typography>
                                <Typography variant="h6" gutterBottom component="div">
                                    Bans:
                                </Typography>
                                <List>
                                    {profileInformation?.bans?.map((ban, index) => (
                                        <ListItem key={index}>
                                            <ListItemText primary={`${ban.banList} - ${ban.reason}`} secondary={`Issued on: ${ban.issueDate}`} />
                                        </ListItem>
                                    ))}
                                </List>
                            </>
                        )}
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default Row;
