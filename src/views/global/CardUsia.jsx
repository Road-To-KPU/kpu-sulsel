// MUI Imports
import Grid from '@mui/material/Grid'
import CardUsiaStyle from '@views/global/CardUsiaStyle'


const CardUsia = ( {data} ) => {
  if (data) {
    return (
      <Grid container spacing={3} className='flex'>
        {data.map((item, index) => (
          <Grid item xs={16} sm={6} key={index}>
            <CardUsiaStyle {...item} />
          </Grid>
        ))}
      </Grid>
    )
  }
}

export default CardUsia
