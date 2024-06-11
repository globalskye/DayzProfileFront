import React, { useState, useEffect } from 'react';
import {
    createGroup, deleteGroupByID,
    deleteGroupProfile,
    getGroupProfileInformation,
    getGroups,
    getProfileInformation, refreshGroupInformation

} from '../../services/cftoolsAPI';
import {Ban, Group, ProfileInformation, ProfileState} from '../../models/models';
import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    CircularProgress,
    TextField,
    Grid,
    Select,
    MenuItem,
    IconButton,
    Collapse,
    Avatar,
    Typography,
    Link,
    Dialog,
    DialogTitle,
    DialogContent, FormControl, InputLabel, DialogActions
} from '@mui/material';
import './styles.css';
import Row from './Row';
import ListItem from "@mui/material/ListItem";
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import GroupIcon from "@mui/icons-material/Group";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import SidebarPage from "./sidebar";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const GroupTable: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [states, setStates] = useState<ProfileState[] | null>(null);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(1900);
    const [groups, setGroups] = useState<Group[] | null>(null);
    const [groupID, setGroupID] = useState<string>('');
    const [newGroupName, setNewGroupName] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getGroups();
                setGroups(data);
            } catch (error) {
                console.error('Error fetching groups:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    const handleRefresh = async () => {
        try {
            setLoading(true);
            const data = await refreshGroupInformation(groupID);
            setStates(data);
            // Calculate total online players

        } catch (error) {
            console.error('Error refreshing information:', error);
        } finally {
            setLoading(false);
        }
    };

    const [totalOnline, setTotalOnline] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getGroupProfileInformation(groupID);
                setStates(data);
                const total = data.filter((state: ProfileState) => state.playState.online).length;
                setTotalOnline(total);
            } catch (error) {
                console.error('Error fetching groups:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [groupID]);


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleNewGroup = async () => {
        try {
            setLoading(true);
            const newGroup = await createGroup(newGroupName);
            setGroups(prevGroups => [...(prevGroups ?? []), newGroup]);
            setNewGroupName('');
        } catch (error) {
            console.error('Error creating group:', error);
        } finally {
            setLoading(false);
        }
    };
    const deleteGroupHandle = (groupID : number) => {
        try {

             deleteGroupByID(groupID.toString());

        } catch (error) {
            console.error('Error creating group:', error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div style={{ backgroundColor: 'black', height: '100vh' }}>
            <Grid container justifyContent="center" height="100%" spacing={2} padding={2}>
                <Grid item xs={2}>
                    <SidebarPage />
                </Grid>
                <Grid item xs={8}>
                    <Paper elevation={3} className="profile-table">
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <List component="nav" aria-label="group list">
                                    {groups &&
                                        groups.map((group) => (
                                            <div key={group.id}>
                                                <ListItemButton onClick={() => setGroupID(String(group.id))}>
                                                    <ListItemText primary={group.groupName} />
                                                    <IconButton onClick={() => deleteGroupHandle(group.id)} aria-label="delete">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </ListItemButton>
                                                <Divider />
                                            </div>
                                        ))}
                                </List>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="New Group Name"
                                    value={newGroupName}
                                    onChange={(e) => setNewGroupName(e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button variant="contained" onClick={handleNewGroup} fullWidth>
                                    Add Group
                                </Button>

                            </Grid>
                        </Grid>
                        <Paper>
                            <Typography variant="h5" gutterBottom component="div" alignItems="center" alignContent="center">
                                Total online : <>{totalOnline}</>
                            </Typography>
                            <Button variant="contained" onClick={handleRefresh} fullWidth>
                                Refresh INFO
                            </Button>
                        </Paper>
                        <TableContainer>
                            <Table aria-label="profile table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Last Nickname</TableCell>
                                        <TableCell>Last Playtime</TableCell>
                                        <TableCell>Server</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={3} align="center">
                                                <CircularProgress />
                                            </TableCell>
                                        </TableRow>
                                    ) : states && states.length ? (
                                        states
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((state: ProfileState, index: number) => (
                                              <GroupRow state={state} groupId={groupID} />
                                            ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={3} align="center">
                                                No data available
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>

                            </Table>
                        </TableContainer>

                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default GroupTable;

interface GroupRowProps {
    state: ProfileState;
    groupId: string;
}
const GroupRow: React.FC<GroupRowProps> = ({ state, groupId }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [profileInformation, setProfileInformation] = useState<any | null>(null);
    const [fetchInformationGo, setFetchInformationGo] = useState<string>('');

    useEffect(() => {
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
        if (fetchInformationGo === 'go') {
            fetchData();
        }
    }, [fetchInformationGo, state.cftoolsId]);

    const handleDeleteFromGroupClick = async () => {
        try {
            await deleteGroupProfile(groupId, state.cftoolsId);
            // Дополнительная логика после удаления профиля из группы
        } catch (error) {
            console.error('Error deleting profile from group:', error);
            // Обработка ошибок, если не удалось удалить профиль из группы
        }
    };
    const [isOpen1, setIsOpen] = useState(false);

    const toggleList = () => {
        setIsOpen(!isOpen1);
    };
    const formatLastPlaytime = (isoString: string | number | Date) => {
        const date = new Date(isoString);
        date.setHours(date.getHours() + 3);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
    const lastPlaytimeISO = profileInformation?.overview.omega.updated_at;
    const formattedLastPlaytime = formatLastPlaytime(lastPlaytimeISO);
    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={
                            () => {
                                setOpen(!open);
                                setFetchInformationGo('go');
                            }
                        }
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                <TableCell>{state.displayName}</TableCell>
                <TableCell>{state.possibleLastNickname}</TableCell>
                <TableCell>{state.updatedAt}</TableCell>
                <TableCell>{state.playState.server.name ? state.playState.server.name : 'Offline'}</TableCell>
                <TableCell>
                    <Button
                        onClick={()=>handleDeleteFromGroupClick()}
                        disabled={loading}
                        variant={'outlined'}
                    >
                        Delete
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <>
                                <Avatar alt="Steam Avatar" src={profileInformation?.steam?.profile?.avatarfull}/>

                                <Typography variant="h6" gutterBottom component="div">
                                    <Link
                                        href={'https://steamcommunity.com/profiles/' + profileInformation?.steam.steam64}
                                        target="_blank">
                                        {profileInformation?.steam?.profile?.personaname}'s Steam Profile
                                    </Link>
                                </Typography>
                                <Typography variant="h6" gutterBottom component="div">
                                    <Link href={'https://app.cftools.cloud/profile/' + state.cftoolsId} target="_blank">
                                        {profileInformation?.steam?.profile?.personaname}'s CFTools Profile
                                    </Link>
                                </Typography>
                                <ListItem>
                                    <ListItemText primary={'STEAMID : ' + profileInformation?.steam.profile.steamid}/>
                                    <ListItemText primary={'LAST PLAYTIME : ' + formattedLastPlaytime}/>
                                </ListItem>
                                <Typography variant="h6" gutterBottom component="div">
                                    Nicknames:
                                </Typography>
                                <Typography variant="body1" gutterBottom component="div">
                                    {profileInformation?.overview?.omega?.aliases?.join(' | ') || 'No nicknames available'}
                                </Typography>
                                <Typography variant="h6" gutterBottom component="div">
                                    Alternate accounts:
                                </Typography>
                                <div>
                                    <Button onClick={toggleList}>{isOpen1 ? 'Close List' : 'Open List'}</Button>
                                    {isOpen1 && (
                                        <Typography variant="body1" gutterBottom component="div">
                                            <List>
                                                {profileInformation?.overview.alternate_accounts.links.map((a: any) => (
                                                    <ListItem key={a.cftools_id}>
                                                        <Link href={'https://app.cftools.cloud/profile/' + a.cftools_id}
                                                              target="_blank">
                                                            {a.cftools_id}
                                                        </Link>

                                                        <ListItemText />
                                                        <ListItemText primary={'Confirmed: ' + a.confirmed}/>
                                                        <ListItemText primary={'Trusted: ' + a.trusted}/>
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Typography>
                                    )}
                                </div>

                                <ListItem>
                                    <ListItemText primary={'VAC : ' + profileInformation?.steam.bans.NumberOfVACBans}/>
                                    <ListItemText primary={'EAC : ' + profileInformation?.steam.bans.NumberOfGameBans}/>
                                </ListItem>
                                <Typography variant="h6" gutterBottom component="div">
                                    Bans:
                                </Typography>
                                <List>
                                    {profileInformation?.bans?.map((ban: Ban, index: number) => (
                                        <ListItem key={index}>
                                            <ListItemText primary={`${ban.banList} - ${ban.reason}`}
                                                          secondary={`Issued on: ${ban.issueDate}`}/>
                                        </ListItem>
                                    ))}
                                </List>
                                <List>
                                    {profileInformation?.banStatus.records?.map((ban: any, index: number) => (
                                        <ListItem key={index}>
                                            <ListItemText primary={` Battleye  - ${ban.id}`}
                                                          secondary={`Issued on: ${ban.date}`}/>
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
