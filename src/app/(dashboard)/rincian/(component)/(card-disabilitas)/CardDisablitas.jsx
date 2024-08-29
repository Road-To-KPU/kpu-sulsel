// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import CardDisablitasStyle from './CardDisablitasStyle'

const data = [
  {
    title: 'Tuna Daksa',
    jumlah: 10000
  },
  {
    title: 'Tuna Netra',
    jumlah: 20000
  },
  {
    title: 'Tuna Rungu',
    jumlah: 30000
  },
  {
    title: 'Tuna Grahita',
    jumlah: 50000
  },
  {
    title: 'Disabilitas Lainnya',
    jumlah: 1000
  }
]

const CardDisablitas = () => {
  if (data) {
    return (
      <Grid container spacing={6}>
        {data.map((item, index) => (
          <Grid item xs={12} key={index}>
            <CardDisablitasStyle {...item} />
          </Grid>
        ))}
      </Grid>
    )
  }
}

export default CardDisablitas
