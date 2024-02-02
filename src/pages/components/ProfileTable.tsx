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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getProfileStates } from "../../services/cftoolsAPI";
import { ProfileState } from "../../models/models";
import { useAsyncError } from "react-router-dom";

const InputLine = (props : {
    onChange : (identifier : string) => void
}) => {
    const [identifier, setIdentifier] = useState<string>('');
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="nickname, steamID64, battleyeID"
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
      ></IconButton>
    </Paper>
  );
};



const Row = (props:  ProfileState, identifier : string ) => {

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

        <TableCell align="right">{props.identifier}</TableCell>
        <TableCell align="right">{props.displayName}</TableCell>
        <TableCell align="right">{props.playState.online}</TableCell>
        <TableCell align="right">{props.playState.server.name}</TableCell>
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
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {historyData.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const rows = [
  createData("global01", global, 6.0, 24, 4.0, 3.99),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
  createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
];

const ProfileTable = () => {
    const [identifier, setIdentifier] = useState('')
  useEffect(() => {
    // Replace the following with your actual data fetching logic
    getProfileStates(row.id)
      .then((data) => {
        console.log("Profile states:", data);
        setHistoryData(data.history); // Assuming data has a 'history' property
      })
      .catch((error) => {
        console.error("Error fetching profile states:", error);
      });
  }, [row.id]);

  return (
    <Grid>
      <InputLine onChange={identifier  => setValue(identifier)}></InputLine>

      <Paper sx={{ display: "flex", alignItems: "center" }}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>identifier</TableCell>
                <TableCell align="right">name</TableCell>
                <TableCell align="right">online</TableCell>
                <TableCell align="right">server</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );
};
export default ProfileTable;
