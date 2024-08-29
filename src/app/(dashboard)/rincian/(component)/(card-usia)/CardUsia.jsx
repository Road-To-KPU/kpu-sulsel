// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import CardStyle from './CardStyle'

const data = [
  {
    title: 'Gen Z',
    image: '/images/genz.png',
    data: 90000,
    umur: 'Usia 17-25 tahun'
  },
  {
    title: 'Gen Millenial',
    image: '/images/genmilenial.png',
    data: 120000,
    umur: 'Usia 26-35 tahun'
  },
  {
    title: 'Gen X',
    image: '/images/genx.png',
    data: 80000,
    umur: 'Usia 36-50 tahun'
  },
  {
    title: 'Baby Boomer',
    image: '/images/babyboomer.png',
    data: 50000,
    umur: 'Usia 51-70 tahun'
  },
  {
    title: 'Pre Boomer',
    image: '/images/preboomer.png',
    data: 20000,
    umur: 'Usia 71+ tahun'
  }
]

const CardUsia = () => {
  if (data) {
    return (
      <Grid container spacing={3} className='flex'>
        {data.map((item, index) => (
          <Grid item xs={16} sm={6} key={index}>
            <CardStyle {...item} />
          </Grid>
        ))}
      </Grid>
    )
  }
}

export default CardUsia
