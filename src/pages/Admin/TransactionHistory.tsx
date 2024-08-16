// import React, { useEffect, useState } from 'react';
import { Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Tooltip } from '@mui/material';
import { ArrowDownward as ArrowDownTrayIcon, Search as MagnifyingGlassIcon } from '@mui/icons-material';
import { FaFileInvoice } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { TransactionHistoryData } from '../../interface/interfaceAdmin';
import { getTransactionHistroyAdmin } from '../../api/admin';
import { useEffect, useState } from 'react';

function TransactionHistory() {
  const TABLE_HEAD = [
    "Doctor Name",
    "Patient Name",
    "Transaction ID",
    "Amount",
    "Date",
    "Status",
    "Actions",
  ];

  const [transactionHistoryData, setTransactionHistoryData] = useState<TransactionHistoryData[]>();

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const response = await getTransactionHistroyAdmin();
        setTransactionHistoryData(response.data.transactionData);
      } catch (error) {
        console.error("Failed to fetch transaction history:", error);
      }
    };

    fetchTransactionHistory();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Transaction History
      </Typography>

      <Paper style={{ padding: 20 }}>
        <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Typography variant="h5" color="textSecondary">
              Recent Transactions
            </Typography>
            <Typography variant="body2" color="textSecondary">
              These are details about the recent transactions
            </Typography>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <TextField
              label="Search"
              InputProps={{
                endAdornment: <MagnifyingGlassIcon />,
              }}
            />
            <Button variant="contained" color="primary" startIcon={<ArrowDownTrayIcon />}>
              Download
            </Button>
          </div>
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {TABLE_HEAD.map((head) => (
                  <TableCell key={head}>
                    <Typography variant="subtitle2" color="textSecondary">
                      {head}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {transactionHistoryData?.map((val, index) => (
                <TableRow key={index}>
                  <TableCell>{val.doctorData.name}</TableCell>
                  <TableCell>{val.userData.userName}</TableCell>
                  <TableCell>{val.transactionId}</TableCell>
                  <TableCell>${val.amount}</TableCell>
                  <TableCell>
                    {new Date(val.createdAt).toLocaleDateString()}{" "}
                    <span style={{ color: 'red' }}>
                      {new Date(val.createdAt).toLocaleTimeString().split(":")[0]}:
                    </span>
                    <span style={{ color: 'red' }}>
                      {new Date(val.createdAt).toLocaleTimeString().split(":")[1]}
                    </span>
                  </TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>
                    <Tooltip title="View Invoice">
                      <IconButton>
                        <Link to={`/admin/invoice?id=${val.tokenId}`}>
                          <FaFileInvoice />
                        </Link>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
          <Button variant="outlined" color="primary">
            Previous
          </Button>
          <div style={{ display: 'flex', gap: 5 }}>
            <Button variant="outlined" size="small">1</Button>
            <Button variant="outlined" size="small">2</Button>
            <Button variant="outlined" size="small">3</Button>
            <Button variant="outlined" size="small">...</Button>
            <Button variant="outlined" size="small">8</Button>
            <Button variant="outlined" size="small">9</Button>
            <Button variant="outlined" size="small">10</Button>
          </div>
          <Button variant="outlined" color="primary">
            Next
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default TransactionHistory;
