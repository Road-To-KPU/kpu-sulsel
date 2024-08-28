import Image from 'next/image'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

const UpcomingWebinar = ({image}) => {
  return (
    <Card className='h-[100%]'>
      <CardContent className='p-5'>
        <div className='flex h-[21rem] pli-2.5 pbs-4 rounded bg-primaryLight'>
          <Image src={image} className='items-center' width={300} height={300} />
        </div>
      </CardContent>
    </Card>
  )
}

export default UpcomingWebinar
