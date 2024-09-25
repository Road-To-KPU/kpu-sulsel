import Box from '@mui/material/Box'

// Component Imports
import CardStatHorizontal from './CardStatHorizontal'

const data = [
  {
    title: 'Daftar Pemilih Tetap',
    stats: 1000,
    avatarIcon: 'tabler-list',
    avatarIconSize: 26,
    avatarColor: 'warning',
    avatarSize: 42,
    avatarSkin: 'light'
  },
  {
    title: 'Daftar Pemilih Tambahan',
    stats: 2000,
    avatarIcon: 'tabler-playlist-add',
    avatarIconSize: 26,
    avatarColor: 'warning',
    avatarSize: 42,
    avatarSkin: 'light'
  },
  {
    title: 'TPS Lokasi Khusus',
    stats: 3000,
    avatarIcon: 'tabler-users',
    avatarIconSize: 26,
    avatarColor: 'warning',
    avatarSize: 42,
    avatarSkin: 'light'
  },
  {
    title: 'SATKER',
    stats: '',
    avatarIcon: 'tabler-building',
    avatarIconSize: 26,
    avatarColor: 'warning',
    avatarSize: 42,
    avatarSkin: 'light'
  },
  {
    title: 'DAPIL',
    stats: '',
    avatarIcon: 'tabler-building-community',
    avatarIconSize: 26,
    avatarColor: 'warning',
    avatarSize: 42,
    avatarSkin: 'light'
  },
  {
    title: 'Partisipasi Pemilu/Pilkada',
    stats: '',
    avatarIcon: 'tabler-chart-pie',
    avatarIconSize: 26,
    avatarColor: 'warning',
    avatarSize: 42,
    avatarSkin: 'light'
  }
]

const CardMenu = () => {
  return (
    <Box
      sx={{
        overflowX: 'auto',
        display: 'flex',
        gap: 2,
        padding: 2,
        '::-webkit-scrollbar': {
          height: '1px' // Atur ketebalan scrollbar horizontal
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1', // Warna dasar scrollbar,
          borderRadius: '10px' // Membuat scrollbar lebih membulat
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#888', // Warna "jempol" scrollbar
          borderRadius: '10px' // Membuat scrollbar lebih membulat
        },
        '::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#555' // Warna scrollbar ketika di-hover
        }
      }}
    >
      {data.map((item, index) => (
        <Box key={index} sx={{ flex: '0 0 25%', maxWidth: '25%' }}>
          <CardStatHorizontal {...item} />
        </Box>
      ))}
    </Box>
  )
}

export default CardMenu
