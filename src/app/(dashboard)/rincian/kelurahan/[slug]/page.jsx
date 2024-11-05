'use client'

import React, { useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogContent,
  Grid,
  IconButton
} from '@mui/material'
import { IconX } from '@tabler/icons-react'

export default function KabupatenTablePage() {
  const router = useRouter()
  const path = usePathname().split('/').pop()

  const [dataKecamatan, setDataKecamatan] = useState([])
  const [selectedKelurahan, setSelectedKelurahan] = useState(null)
  const [kelurahanDetail, setKelurahanDetail] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/detail/kec/kel/?kec_id=${path}`)
        const result = await response.json()

        setDataKecamatan(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [path])

  const handleRowClick = async kelurahanId => {
    try {
      const response = await fetch(`/api/detail/kec/kel/tps/?kel_id=${kelurahanId}`)
      const result = await response.json()

      setKelurahanDetail(result)
      setSelectedKelurahan(kelurahanId)
    } catch (error) {
      console.error('Error fetching kelurahan details:', error)
    }
  }

  const handleCloseCard = () => {
    setSelectedKelurahan(null)
    setKelurahanDetail(null)
  }

  return (
    <Box sx={{ padding: 1 }}>
      <TableContainer component={Paper}>
        <Table aria-label='kabupaten data table'>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Nama Kelurahan</strong>
              </TableCell>
              <TableCell align='center'>
                <strong>Jumlah TPS</strong>
              </TableCell>
              <TableCell align='center'>
                <strong>Total Laki-Laki</strong>
              </TableCell>
              <TableCell align='center'>
                <strong>Total Perempuan</strong>
              </TableCell>
              <TableCell align='center'>
                <strong>Total Pemilih</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataKecamatan.map((row, index) => (
              <TableRow key={index} hover style={{ cursor: 'pointer' }} onClick={() => handleRowClick(row?.id)}>
                <TableCell>{row?.nama_kelurahan}</TableCell>
                <TableCell align='center'>{row?.jumlah_tps?.toLocaleString()}</TableCell>
                <TableCell align='center'>{row?.total_l?.toLocaleString()}</TableCell>
                <TableCell align='center'>{row?.total_p?.toLocaleString()}</TableCell>
                <TableCell align='center'>{row?.total_lp?.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={Boolean(selectedKelurahan)} onClose={handleCloseCard} maxWidth='sm' fullWidth>
        <DialogContent>
          {kelurahanDetail && (
            <Card
              sx={{
                color: 'black',
                maxHeight: 500,
                overflowY: 'auto',
                position: 'relative',
                padding: { xs: 1, sm: 2 }
              }}
            >
              <IconButton onClick={handleCloseCard} sx={{ position: 'absolute', top: 8, right: 8, color: 'black' }}>
                <IconX />
              </IconButton>
              <CardContent>
                <Typography variant='h5' component='div' gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                  {kelurahanDetail.nama_kelurahan}
                </Typography>

                {/* Informasi Kelurahan */}
                <Grid container spacing={1} sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                  {[
                    { label: 'Jumlah TPS', value: kelurahanDetail.jumlah_tps },
                    { label: 'Jumlah Laki-Laki', value: kelurahanDetail.total_l },
                    { label: 'Jumlah Perempuan', value: kelurahanDetail.total_p },
                    { label: 'Total Pemilih', value: kelurahanDetail.total_lp }
                  ].map((item, index) => (
                    <Grid container item xs={12} key={index} alignItems='center'>
                      <Grid item xs={6}>
                        <Typography>{item.label}</Typography>
                      </Grid>
                      <Grid item xs={6} sx={{ textAlign: 'right' }}>
                        <Typography>
                          <strong>{item.value}</strong>
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>

                {/* Daftar TPS */}
                <Box mt={2} sx={{ backgroundColor: 'white', color: 'black', borderRadius: 1, padding: 1 }}>
                  <Typography variant='subtitle2' sx={{ fontWeight: 'bold', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    Daftar TPS:
                  </Typography>
                  <TableContainer
                    component={Paper}
                    sx={{
                      maxHeight: 200,
                      overflowY: 'auto',
                      '&::-webkit-scrollbar': {
                        width: '3px'
                      },
                      '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent'
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#b0b0b0',
                        borderRadius: '10px'
                      },
                      '&:hover::-webkit-scrollbar-thumb': {
                        backgroundColor: '#888'
                      },
                      '&::-webkit-scrollbar-button': {
                        display: 'none'
                      },
                      '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#555'
                      }
                    }}
                  >
                    <Table size='small' aria-label='tps table'>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                            <strong>TPS</strong>
                          </TableCell>
                          <TableCell align='center' sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                            <strong>Laki-Laki</strong>
                          </TableCell>
                          <TableCell align='center' sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                            <strong>Perempuan</strong>
                          </TableCell>
                          <TableCell align='center' sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                            <strong>Total</strong>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {kelurahanDetail.list_tps.map(tps => (
                          <TableRow key={tps.id}>
                            <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{tps.tps}</TableCell>
                            <TableCell align='center' sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                              {tps.l}
                            </TableCell>
                            <TableCell align='center' sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                              {tps.p}
                            </TableCell>
                            <TableCell align='center' sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                              {tps.lp}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </CardContent>
            </Card>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  )
}
