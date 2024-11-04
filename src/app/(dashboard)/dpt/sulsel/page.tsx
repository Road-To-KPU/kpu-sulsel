'use client'

import React, { useEffect, useState } from 'react';

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
  Skeleton,
} from '@mui/material';

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch('/api/rekap');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();

        // Filter data untuk menghilangkan item tanpa 'nama_kabupaten'
        const filteredData = result.filter((item) => item.nama_kabupaten);

        setData(filteredData);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const renderSkeletonRows = (count) => {
    return Array.from(new Array(count)).map((_, index) => (
      <TableRow key={index}>
        <TableCell><Skeleton /></TableCell>
        <TableCell><Skeleton /></TableCell>
        <TableCell><Skeleton /></TableCell>
        <TableCell><Skeleton /></TableCell>
        <TableCell><Skeleton /></TableCell>
        <TableCell><Skeleton /></TableCell>
        <TableCell><Skeleton /></TableCell>
      </TableRow>
    ));
  };

  return (
    <Container>
      {loading ? (
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell><strong>Nama Kabupaten</strong></TableCell>
                <TableCell><strong>Jumlah Kecamatan</strong></TableCell>
                <TableCell><strong>Jumlah Kelurahan</strong></TableCell>
                <TableCell><strong>Jumlah TPS</strong></TableCell>
                <TableCell><strong>Total L</strong></TableCell>
                <TableCell><strong>Total P</strong></TableCell>
                <TableCell><strong>Total L + P</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderSkeletonRows(5)}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell><strong>Nama Kabupaten</strong></TableCell>
                <TableCell><strong>Jumlah Kecamatan</strong></TableCell>
                <TableCell><strong>Jumlah Kelurahan</strong></TableCell>
                <TableCell><strong>Jumlah TPS</strong></TableCell>
                <TableCell><strong>Total L</strong></TableCell>
                <TableCell><strong>Total P</strong></TableCell>
                <TableCell><strong>Total L + P</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Tidak ada data yang ditemukan
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item, index) => (
                  item.nama_kabupaten && (
                    <TableRow key={index}>
                      <TableCell>{item.nama_kabupaten}</TableCell>
                      <TableCell>{item.jumlah_kecamatan}</TableCell>
                      <TableCell>{item.jumlah_kelurahan}</TableCell>
                      <TableCell>{item.jumlah_tps}</TableCell>
                      <TableCell>{item.total_l.toLocaleString()}</TableCell>
                      <TableCell>{item.total_p.toLocaleString()}</TableCell>
                      <TableCell>{item.total_lp.toLocaleString()}</TableCell>
                    </TableRow>
                  )
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}
