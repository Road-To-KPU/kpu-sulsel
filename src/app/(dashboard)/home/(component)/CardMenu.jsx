import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'

import CardStatHorizontal from './CardStatHorizontal'

const CardMenu = ({ pemilihTetap }) => {
  const data = [
    {
      title: 'Daftar Pemilih Tetap',
      stats: pemilihTetap.toLocaleString('id-ID'),
      avatarIcon: 'tabler-list',
      avatarIconSize: 26,
      avatarColor: 'error',
      avatarSize: 42,
      avatarSkin: 'light'
    },
    {
      title: 'Daftar Pemilih Tambahan',
      stats: 2000,
      avatarIcon: 'tabler-playlist-add',
      avatarIconSize: 26,
      avatarColor: 'error',
      avatarSize: 42,
      avatarSkin: 'light'
    },
    {
      title: 'TPS Lokasi Khusus',
      stats: 3000,
      avatarIcon: 'tabler-users',
      avatarIconSize: 26,
      avatarColor: 'error',
      avatarSize: 42,
      avatarSkin: 'light'
    },
    {
      title: 'SATKER',
      stats: '',
      avatarIcon: 'tabler-building',
      avatarIconSize: 26,
      avatarColor: 'error',
      avatarSize: 42,
      avatarSkin: 'light'
    },
    {
      title: 'DAPIL',
      stats: '',
      avatarIcon: 'tabler-building-community',
      avatarIconSize: 26,
      avatarColor: 'error',
      avatarSize: 42,
      avatarSkin: 'light'
    },
    {
      title: 'Partisipasi Pemilu/Pilkada',
      stats: '',
      avatarIcon: 'tabler-chart-pie',
      avatarIconSize: 26,
      avatarColor: 'error',
      avatarSize: 42,
      avatarSkin: 'light'
    }
  ]

  return (
    <Box
      sx={{
        overflowX: 'auto',
        display: 'flex',
        gap: 2,
        paddingY: 2,
        flexDirection: { xs: 'column', sm: 'row' },
        '::-webkit-scrollbar': {
          height: '1px'
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1'
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
          borderRadius: '10px'
        },
        '::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#555'
        }
      }}
    >
      {data.map((item, index) => (
        <Box
          key={index}
          sx={{
            flex: { xs: '0 0 100%', sm: '0 0 25%' },
            maxWidth: { xs: '100%', sm: '25%' }
          }}
        >
          <CardStatHorizontal {...item} />
        </Box>
      ))}
    </Box>
  )
}

export default CardMenu
