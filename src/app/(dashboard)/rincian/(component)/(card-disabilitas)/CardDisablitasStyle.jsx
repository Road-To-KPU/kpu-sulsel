// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const CardDisablitasStyle = props => {
  // Props
  const { title, jumlah } = props

  return (
    <Card className='bs-full'>
      <CardContent className='p-5'>
        <div className='flex gap-x-2 justify-between items-center'>
          <Typography variant='h6'>{title}</Typography>
          <Typography variant='caption' color='text.secondary'>
            {jumlah}
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardDisablitasStyle
