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
  CircularProgress, // Добавлено для вращающегося кружка
} from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from "@mui/icons-material/Search";
import { getProfileStates } from "../../services/cftoolsAPI";
import { ProfileState } from "../../models/models";
import { useAsyncError } from "react-router-dom";

const InputLine = (props: { onChange: (identifier: string) => void }) => {
  const [inputValue, setInputValue] = useState('');

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
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
        onSubmit={handleSubmit}
      >
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
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

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{state.identifier}</TableCell>
        <TableCell align="center">{state.displayName}</TableCell>
        <TableCell align="center">{state.playState.online}</TableCell>
        <TableCell align="center">{state.playState.server.name}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center"> </TableCell>
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody></TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const ProfileTable = () => {
  const [loading, setLoading] = useState(false); // Добавлено состояние загрузки
  const [identifier, setIdentifier] = useState("");
  const [states, setStates] = useState<ProfileState[]>([]);

  useEffect(() => {
    setLoading(true); // Устанавливаем состояние загрузки при начале запроса
    getProfileStates(identifier)
      .then((data) => {
        console.log("Profile states:", data);
        setStates(data);
      })
      .catch((error) => {
        console.error("Error fetching profile states:", error);
      })
      .finally(() => {
        setLoading(false); // Сбрасываем состояние загрузки после получения данных
      });
  }, [identifier]);
  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      <Grid item xs={12} md={12}>
        <InputLine onChange={(identifier) => setIdentifier(identifier)} />
        <Paper>
          {loading ? (
            <Box p={2} display="flex" alignItems="center" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer >
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell align="center">identifier</TableCell>
                    <TableCell align="center">name</TableCell>
                    <TableCell align="center">online</TableCell>
                    <TableCell align="center">server</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {states.map((state: ProfileState) => (
                    <Row key={state.cftoolsId} state={state} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};
export default ProfileTable;
