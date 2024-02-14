import React, { useState, useEffect } from 'react';
import { getProfileStates } from '../../services/cftoolsAPI';
import { ProfileState } from '../../models/models';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, CircularProgress, Box, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './styles.css';
import Row from './Row';
import InputLine from './InputLine'; // Импорт компонента InputLine

const ProfileTable: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [identifier, setIdentifier] = useState<string>('');
  const [states, setStates] = useState<ProfileState[] | null>(null);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProfileStates(identifier);
        setStates(data);
      } catch (error) {
        console.error('Error fetching profile states:', error);
      } finally {
        setLoading(false);
      }
    };

    if (identifier) {
      fetchData();
    } else {
      setStates(null);
    }
  }, [identifier]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = () => {
    if (identifier) {
      fetchData();
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getProfileStates(identifier);
      setStates(data);
    } catch (error) {
      console.error('Error fetching profile states:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToGroup = (state: ProfileState) => {
    // Implement your add to group functionality here
    console.log('Adding', state, 'to group');
  };

  return (
      <Paper elevation={3} className="profile-table">
        {/* Вот компонент InputLine */}
        <InputLine onChange={setIdentifier} />
        <TableContainer>
          <Table aria-label="profile table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Identifier</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Server</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
              ) : (
                  states && states
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((state: ProfileState, index: number) => (
                          <Row key={index} state={state} handleAddToGroup={handleAddToGroup} />
                      ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="pagination">
          <Button
              variant="contained"
              onClick={() => handleChangePage(null, page - 1)}
              disabled={page === 0}
          >
            Prev
          </Button>
          <Button
              variant="contained"
              onClick={() => handleChangePage(null, page + 1)}
              disabled={page >= Math.ceil((states?.length ?? 0) / rowsPerPage) - 1}
          >
            Next
          </Button>
        </div>
      </Paper>
  );
};

export default ProfileTable;
