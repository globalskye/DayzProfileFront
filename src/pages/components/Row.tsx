// Row.tsx
import React, { useState, useEffect } from 'react';
import {addGroupProfile, getGroups, getProfileInformation} from '../../services/cftoolsAPI';
import {ProfileState, ProfileInformation, Group, Ban} from '../../models/models';
import {
    TableRow,
    TableCell,
    Collapse,
    IconButton,
    CircularProgress,
    Avatar,
    Typography,
    Link,
    List,
    ListItem,
    ListItemText,
    Button, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, MenuItem, DialogActions, TextField
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface RowProps {
    state: ProfileState;
    handleAddToGroup: (state: ProfileState) => void;
}

interface RowProps {
    state: ProfileState;
    handleAddToGroup: (state: ProfileState) => void;
}

const Row: React.FC<RowProps> = ({ state, handleAddToGroup }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [profileInformation, setProfileInformation] = useState<ProfileInformation | null>(null);
    const [alias, setAlias] = useState<string>('');
    const [selectedGroup, setSelectedGroup] = useState<string>('');
    const [groups, setGroups] = useState<Group[]>([]);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [fetchInformationGo, setFetchInformationGo] = useState<string>('')
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

    }, [fetchInformationGo]);

    useEffect(() => {
        const fetchGroupsData = async () => {
            try {
                const groups = await getGroups();
                setGroups(groups);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        fetchGroupsData();
    }, []);

    const handleAddClick = () => {
        setDialogOpen(true);
    };

    const handleAddToGroupClick = async () => {
        try {
            await addGroupProfile(selectedGroup,state.cftoolsId, alias);
            setDialogOpen(false);
            // Вы можете добавить дополнительную логику здесь, например, обновление списка профилей
        } catch (error) {
            console.error('Error adding profile to group:', error);
            // Обработка ошибок, если не удалось добавить профиль в группу
        }
    };
    const formatLastPlaytime = (isoString: string ) => {
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
    const [isOpen1, setIsOpen] = useState(false);

    const toggleList = () => {
        setIsOpen(!isOpen1);
    };
    // @ts-ignore
    const lastPlaytimeISO = profileInformation?.overview.omega.updated_at;
    // @ts-ignore
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
                <TableCell>{state.identifier}</TableCell>
                <TableCell>{state.displayName}</TableCell>
                <TableCell>{state.playState.server.name ? state.playState.server.name : 'Offline'}</TableCell>
                <TableCell>
                    <Button
                        onClick={handleAddClick}
                        disabled={loading}
                        variant={'outlined'}
                    >
                        Add to Group
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
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Add to Group</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel id="group-select-label">Group</InputLabel>
                        <Select
                            labelId="group-select-label"
                            id="group-select"
                            value={selectedGroup}
                            onChange={(e) => setSelectedGroup(e.target.value as string)}
                        >
                            {groups.map((group) => (
                                <MenuItem key={group.id} value={group.id}>{group.groupName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="alias"
                        label="Alias"
                        type="text"
                        fullWidth
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddToGroupClick}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Row;
