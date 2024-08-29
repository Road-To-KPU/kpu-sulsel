import Image from 'next/image'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const CardStyle = props => {
  // Props
  const { umur, title, data, image } = props

  return (
    <Card className='bs-full'>
      <CardContent className='p-3'>
        <div className='flex items-center flex-wrap gap-1 justify-around'>
          <Image src={image} className='items-center' width={35} height={70} />
          <div className='flex flex-col'>
            <Typography variant='caption'>{title}</Typography>
            <Typography variant='caption' color='text.secondary'>
              {data}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {umur}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardStyle
