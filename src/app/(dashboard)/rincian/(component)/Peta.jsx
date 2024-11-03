import Image from 'next/image'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const Peta = ({ src, nameKabupaten }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Card className='h-[100%] bg-orange-800'>
      <CardContent className='p-4'>
        <Typography variant='h5' className='text-white items-center mb-2 mt-1.5'>
          {' '}
          {nameKabupaten}
        </Typography>
        <div className='flex h-[19rem] pli-2 pbs-2 rounded bg-orange-600 justify-center items-center'>
          {' '}
          <Image
            src={src}
            alt='Peta'
            className='object-contain'
            width={isMobile ? 200 : 250}
            height={isMobile ? 220 : 250}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default Peta
