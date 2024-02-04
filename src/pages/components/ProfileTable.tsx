import {
  Grid,
  Paper,
  Box,
  IconButton,
  InputBase,
  Divider,
  TableRow,
  TableCell,
  Collapse,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  CircularProgress,
  TablePagination,
  List,
  ListItemText,
  ListItem,
  Avatar,
  Link, // Добавлено для вращающегося кружка
} from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from "@mui/icons-material/Search";
import {
  getProfileInformation,
  getProfileStates,
} from "../../services/cftoolsAPI";
import { Ban, ProfileInformation, ProfileState } from "../../models/models";
import { useAsyncError } from "react-router-dom";

const InputLine = (props: { onChange: (identifier: string) => void }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    props.onChange(inputValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <Box mb={2} mt={2}>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
        onSubmit={handleSubmit}
      >
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>

        <InputBase
          onChange={(e) => setInputValue(e.target.value)}
          sx={{ ml: 1, flex: 1 }}
          placeholder="nickname, steamID64, battleyeID"
        />
      </Paper>
    </Box>
  );
};

interface RowProps {
  state: ProfileState;
}

const Row = ({ state }: RowProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setID] = useState("");
  const [profileInformation, setProfileInformation] = useState<
    ProfileInformation | undefined
  >(undefined);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getProfileInformation(id);
      setProfileInformation(data);
    } catch (error) {
      console.error("Error fetching profile states:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open, id]);

  const renderAvatar = () => {
    const avatarUrl = profileInformation?.steam?.profile?.avatarfull;
    const personaname = profileInformation?.steam?.profile?.personaname;
    const steamProfileUrl = `https://steamcommunity.com/profiles/${profileInformation?.steam?.steam64}`;

    return (
      <Grid item xs={3}>
        <Avatar
          alt="Steam Avatar"
          src={avatarUrl}
          sx={{ width: 200, height: 200, borderRadius: 1, marginLeft: 2 }}
        />
      </Grid>
    );
  };

  const renderNicknames = () => {
    const nicknames = profileInformation?.overview?.omega?.aliases || [];
    return (
      <Typography variant="body1" gutterBottom component="div">
        {nicknames.join(" | ")}
      </Typography>
    );
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open);
              setID(state.cftoolsId);
            }}
          >
            {loading ? (
              <CircularProgress size={20} />
            ) : (
              <>{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</>
            )}
          </IconButton>
        </TableCell>
        <TableCell align="center">{state.identifier}</TableCell>
        <TableCell align="center">
          <Link
            href={`https://steamcommunity.com/profiles/${profileInformation?.steam?.steam64}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {state.playState.online}
          </Link>
        </TableCell>
        <TableCell align="center">{state.playState.server.name}</TableCell>
      </TableRow>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 1, flexDirection: "column" }}>
          {renderAvatar()}
          {renderNicknames()}

          <Typography variant="h6" gutterBottom component="div">
            DAYZ
          </Typography>
          <List>
            {profileInformation?.overview?.omega?.aliases.map(
              (nickname: string, index: number) => (
                <ListItem key={index}>
                  <ListItemText primary={nickname} />
                </ListItem>
              )
            )}
            <ListItem>
              <ListItemText
                primary={`Created At: ${profileInformation?.overview?.omega?.created_at}`}
              />
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom component="div">
            Steam
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary={`Steam ID: ${profileInformation?.steam?.steam64}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Profile URL: https://steamcommunity.com/profiles/${profileInformation?.steam?.steam64}`}
              />
            </ListItem>
            {/* Добавьте другие поля Steam, которые вы хотите отобразить */}
          </List>

          <Typography variant="h6" gutterBottom component="div">
            Bans
          </Typography>
          {profileInformation?.bans ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Ban List</TableCell>
                    <TableCell>Ban Reason</TableCell>
                    <TableCell>Ban Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {profileInformation.bans.map((ban: Ban, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{ban.banList}</TableCell>
                      <TableCell>{ban.reason}</TableCell>
                      <TableCell>{ban.issueDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>No Bans</Typography>
          )}
        </Box>
      </Collapse>
    </React.Fragment>
  );
};

const ProfileTable = () => {
  const [loading, setLoading] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [states, setStates] = useState<ProfileState[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProfileStates(identifier);
        setStates(data);
      } catch (error) {
        console.error("Error fetching profile states:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [identifier]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      <Grid item xs={12} md={12}>
        <InputLine onChange={(identifier) => setIdentifier(identifier)} />
        <Paper>
          {loading ? (
            <Box
              p={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell align="center" sx={{ fontSize: "20px" }}>
                        identifier
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "20px" }}>
                        name
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "20px" }}>
                        online
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "20px" }}>
                        server
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {states
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((state: ProfileState) => (
                        <Row key={state.cftoolsId} state={state} />
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                component="div"
                count={states.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProfileTable;
