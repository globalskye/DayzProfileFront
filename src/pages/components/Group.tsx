import React, { useState, useEffect } from 'react';
import { getGroupProfileInformation } from '../../services/cftoolsAPI';
import { ProfileState } from '../../models/models';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, CircularProgress } from '@mui/material';
import './styles.css';
import Row from './Row';

const GroupTable: React.FC<{ groupID: string }> = ({ groupID }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [states, setStates] = useState<ProfileState[] | null>(null);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getGroupProfileInformation(groupID);
                setStates(data);
            } catch (error) {
                console.error('Error fetching profile states:', error);
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

    return (
        <Paper elevation={3} className="profile-table">
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
                                    <Row key={index} state={state}
                                         handleAddToGroup={function (state: ProfileState): void {
                                             throw new Error('Function not implemented.');
                                         }} />
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

export default GroupTable;
