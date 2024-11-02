import React from 'react'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material'

// Sample data array
const kabupatenData = [
  {
    id: 0,
    name: 'Kabupaten Kepulauan Selayar',
    jumlahKecamatan: 11,
    jumlahDesaKelurahan: 88,
    dptSeluruhTps: {
      tps: 301,
      l: 49058,
      p: 52510,
      jumlahPemilih: 101568
    }
  },
  {
    id: 1,
    name: 'Kabupaten Bulukumba',
    jumlahKecamatan: 10,
    jumlahDesaKelurahan: 136,
    dptSeluruhTps: {
      tps: 684,
      l: 165542,
      p: 179441,
      jumlahPemilih: 344983
    }
  },
  {
    id: 2,
    name: 'Kabupaten Bantaeng',
    jumlahKecamatan: 8,
    jumlahDesaKelurahan: 67,
    dptSeluruhTps: {
      tps: 341,
      l: 75772,
      p: 79133,
      jumlahPemilih: 154905
    }
  },
  {
    id: 3,
    name: 'Kabupaten Jeneponto',
    jumlahKecamatan: 11,
    jumlahDesaKelurahan: 113,
    dptSeluruhTps: {
      tps: 567,
      l: 140722,
      p: 150190,
      jumlahPemilih: 290912
    }
  },
  {
    id: 4,
    name: 'Kabupaten Takalar',
    jumlahKecamatan: 12,
    jumlahDesaKelurahan: 110,
    dptSeluruhTps: {
      tps: 458,
      l: 109820,
      p: 119629,
      jumlahPemilih: 229449
    }
  },
  {
    id: 5,
    name: 'Kabupaten Gowa',
    jumlahKecamatan: 18,
    jumlahDesaKelurahan: 167,
    dptSeluruhTps: {
      tps: 1186,
      l: 274956,
      p: 292903,
      jumlahPemilih: 567859
    }
  },
  {
    id: 6,
    name: 'Kabupaten Sinjai',
    jumlahKecamatan: 9,
    jumlahDesaKelurahan: 80,
    dptSeluruhTps: {
      tps: 427,
      l: 96375,
      p: 100783,
      jumlahPemilih: 197158
    }
  },
  {
    id: 7,
    name: 'Kabupaten Bone',
    jumlahKecamatan: 27,
    jumlahDesaKelurahan: 372,
    dptSeluruhTps: {
      tps: 1326,
      l: 283277,
      p: 307646,
      jumlahPemilih: 590923
    }
  },
  {
    id: 8,
    name: 'Kabupaten Maros',
    jumlahKecamatan: 14,
    jumlahDesaKelurahan: 103,
    dptSeluruhTps: {
      tps: 604,
      l: 134196,
      p: 144734,
      jumlahPemilih: 278930
    }
  },
  {
    id: 9,
    name: 'Kabupaten Pangkep',
    jumlahKecamatan: 13,
    jumlahDesaKelurahan: 103,
    dptSeluruhTps: {
      tps: 557,
      l: 119946,
      p: 129416,
      jumlahPemilih: 249362
    }
  },
  {
    id: 10,
    name: 'Kabupaten Barru',
    jumlahKecamatan: 7,
    jumlahDesaKelurahan: 55,
    dptSeluruhTps: {
      tps: 329,
      l: 67126,
      p: 71911,
      jumlahPemilih: 139037
    }
  },
  {
    id: 11,
    name: 'Kabupaten Soppeng',
    jumlahKecamatan: 8,
    jumlahDesaKelurahan: 70,
    dptSeluruhTps: {
      tps: 467,
      l: 86110,
      p: 95071,
      jumlahPemilih: 181181
    }
  },
  {
    id: 12,
    name: 'Kabupaten Wajo',
    jumlahKecamatan: 14,
    jumlahDesaKelurahan: 190,
    dptSeluruhTps: {
      tps: 712,
      l: 140122,
      p: 153705,
      jumlahPemilih: 293827
    }
  },
  {
    id: 13,
    name: 'Kabupaten Sidrap',
    jumlahKecamatan: 11,
    jumlahDesaKelurahan: 106,
    dptSeluruhTps: {
      tps: 486,
      l: 112188,
      p: 118673,
      jumlahPemilih: 230861
    }
  },
  {
    id: 14,
    name: 'Kabupaten Pinrang',
    jumlahKecamatan: 12,
    jumlahDesaKelurahan: 109,
    dptSeluruhTps: {
      tps: 665,
      l: 142268,
      p: 151956,
      jumlahPemilih: 294224
    }
  },
  {
    id: 15,
    name: 'Kabupaten Enrekang',
    jumlahKecamatan: 12,
    jumlahDesaKelurahan: 129,
    dptSeluruhTps: {
      tps: 497,
      l: 83810,
      p: 82267,
      jumlahPemilih: 166077
    }
  },
  {
    id: 16,
    name: 'Kabupaten Luwu',
    jumlahKecamatan: 22,
    jumlahDesaKelurahan: 227,
    dptSeluruhTps: {
      tps: 691,
      l: 134368,
      p: 135676,
      jumlahPemilih: 270044
    }
  },
  {
    id: 17,
    name: 'Kabupaten Tana Toraja',
    jumlahKecamatan: 19,
    jumlahDesaKelurahan: 159,
    dptSeluruhTps: {
      tps: 462,
      l: 94229,
      p: 90670,
      jumlahPemilih: 184899
    }
  },
  {
    id: 18,
    name: 'Kabupaten Luwu Utara',
    jumlahKecamatan: 15,
    jumlahDesaKelurahan: 173,
    dptSeluruhTps: {
      tps: 572,
      l: 118382,
      p: 118563,
      jumlahPemilih: 236945
    }
  },
  {
    id: 19,
    name: 'Kabupaten Luwu Timur',
    jumlahKecamatan: 11,
    jumlahDesaKelurahan: 128,
    dptSeluruhTps: {
      tps: 457,
      l: 114091,
      p: 107929,
      jumlahPemilih: 222020
    }
  },
  {
    id: 20,
    name: 'Kabupaten Toraja Utara',
    jumlahKecamatan: 21,
    jumlahDesaKelurahan: 151,
    dptSeluruhTps: {
      tps: 424,
      l: 91536,
      p: 89497,
      jumlahPemilih: 181033
    }
  },
  {
    id: 21,
    name: 'Kota Makassar',
    jumlahKecamatan: 15,
    jumlahDesaKelurahan: 153,
    dptSeluruhTps: {
      tps: 1877,
      l: 501571,
      p: 535593,
      jumlahPemilih: 1037164
    }
  },
  {
    id: 22,
    name: 'Kota Parepare',
    jumlahKecamatan: 4,
    jumlahDesaKelurahan: 22,
    dptSeluruhTps: {
      tps: 198,
      l: 54194,
      p: 57680,
      jumlahPemilih: 111874
    }
  },
  {
    id: 23,
    name: 'Kota Palopo',
    jumlahKecamatan: 9,
    jumlahDesaKelurahan: 48,
    dptSeluruhTps: {
      tps: 260,
      l: 61852,
      p: 63720,
      jumlahPemilih: 125572
    }
  }
]

const totalKecamatan = kabupatenData.reduce((acc, curr) => acc + curr.jumlahKecamatan, 0)
const totalDesaKelurahan = kabupatenData.reduce((acc, curr) => acc + curr.jumlahDesaKelurahan, 0)
const totalTps = kabupatenData.reduce((acc, curr) => acc + curr.dptSeluruhTps.tps, 0)
const totalL = kabupatenData.reduce((acc, curr) => acc + curr.dptSeluruhTps.l, 0)
const totalP = kabupatenData.reduce((acc, curr) => acc + curr.dptSeluruhTps.p, 0)
const totalPemilih = kabupatenData.reduce((acc, curr) => acc + curr.dptSeluruhTps.jumlahPemilih, 0)

export default function KabupatenTablePage() {
  return (
    <Box sx={{ padding: 1 }}>
      <TableContainer component={Paper}>
        <Table aria-label='kabupaten data table'>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Nama Kabupaten</strong>
              </TableCell>
              <TableCell align='center'>
                <strong>Jumlah Kecamatan</strong>
              </TableCell>
              <TableCell align='center'>
                <strong>Jumlah TPS</strong>
              </TableCell>
              <TableCell align='center'>
                <strong>TPS</strong>
              </TableCell>
              <TableCell align='center'>
                <strong>L</strong>
              </TableCell>
              <TableCell align='center'>
                <strong>P</strong>
              </TableCell>
              <TableCell align='center'>
                <strong>Jumlah Pemilih</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {kabupatenData.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell align='center'>{row.jumlahKecamatan}</TableCell>
                <TableCell align='center'>{row.jumlahDesaKelurahan}</TableCell>
                <TableCell align='center'>{row.dptSeluruhTps?.tps.toLocaleString()}</TableCell>
                <TableCell align='center'>{row.dptSeluruhTps?.l.toLocaleString()}</TableCell>
                <TableCell align='center'>{row.dptSeluruhTps?.p.toLocaleString()}</TableCell>
                <TableCell align='center'>{row.dptSeluruhTps?.jumlahPemilih.toLocaleString()}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <strong>TOTAL</strong>
              </TableCell>
              <TableCell align='center'>
                <strong>{totalKecamatan}</strong>
              </TableCell>
              <TableCell align='center'>
                <strong>{totalDesaKelurahan}</strong>
              </TableCell>
              <TableCell align='center'>
                <strong>{totalTps.toLocaleString()}</strong>
              </TableCell>
              <TableCell align='center'>
                <strong>{totalL.toLocaleString()}</strong>
              </TableCell>
              <TableCell align='center'>
                <strong>{totalP.toLocaleString()}</strong>
              </TableCell>
              <TableCell align='center'>
                <strong>{totalPemilih.toLocaleString()}</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
