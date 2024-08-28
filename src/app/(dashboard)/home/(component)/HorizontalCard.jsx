// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import CardStatHorizontal from './Horizontal'

const data = [
  {
    title: 'CPU Usage',
    stats: '86%',
    avatarIcon: 'tabler-cpu',
    avatarIconSize: 26,
    avatarColor: 'primary',
    avatarSize: 42,
    avatarSkin: 'light'
  },
  {
    title: 'Memory Usage',
    stats: '1.24gb',
    avatarIcon: 'tabler-server',
    avatarIconSize: 26,
    avatarColor: 'success',
    avatarSize: 42,
    avatarSkin: 'light'
  },
  {
    title: 'Download Ratio',
    stats: '0.2%',
    avatarIcon: 'tabler-chart-pie-2',
    avatarIconSize: 26,
    avatarColor: 'error',
    avatarSize: 42,
    avatarSkin: 'light'
  },
  {
    title: 'Issues Found',
    stats: '128',
    avatarIcon: 'tabler-alert-octagon',
    avatarIconSize: 26,
    avatarColor: 'warning',
    avatarSize: 42,
    avatarSkin: 'light'
  },
  {
    title: 'Server Status',
    stats: 'Active',
    avatarIcon: 'tabler-server',
    avatarIconSize: 26,
    avatarColor: 'info',
    avatarSize: 42,
    avatarSkin: 'light'
  },
  {
    title: 'Server Uptime',
    stats: '100%',
    avatarIcon: 'tabler-server',
    avatarIconSize: 26,
    avatarColor: 'success',
    avatarSize: 42,
    avatarSkin: 'light'
  },
  {
    title: 'Server Load',
    stats: '0.01%',
    avatarIcon: 'tabler-server',
    avatarIconSize: 26,
    avatarColor: 'error',
    avatarSize: 42,
    avatarSkin: 'light'
  },
  {
    title: 'Server Down',
    stats: '0',
    avatarIcon: 'tabler-server',
    avatarIconSize: 26,
    avatarColor: 'error',
    avatarSize: 42,
    avatarSkin: 'light'
  },
]

const Horizontal = () => {
  if (data) {
    return (
      <Grid container spacing={6}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <CardStatHorizontal {...item} />
          </Grid>
        ))}
      </Grid>
    )
  }
}

export default Horizontal
