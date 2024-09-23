// MUI Imports
import Grid from '@mui/material/Grid'

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
  
  // {
  //   title: 'DAPIL',
  //   stats: '',
  //   avatarIcon: 'tabler-building-community',
  //   avatarIconSize: 26,
  //   avatarColor: 'warning',
  //   avatarSize: 42,
  //   avatarSkin: 'light'
  // },
  // {
  //   title: 'Partisipasi Pemilu/Pilkada',
  //   stats: '',
  //   avatarIcon: 'tabler-chart-pie',
  //   avatarIconSize: 26,
  //   avatarColor: 'warning',
  //   avatarSize: 42,
  //   avatarSkin: 'light'
  // }
]

const CardMenu = () => {
  if (data) {
    return (
      <Grid container spacing={2} className='items-center'>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <CardStatHorizontal {...item} />
          </Grid>
        ))}
      </Grid>
    )
  }
}

export default CardMenu
