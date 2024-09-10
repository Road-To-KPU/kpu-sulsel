import Image from 'next/image'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

const Peta = ({ src }) => {
  return (
    <Card className='h-[100%] bg-orange-800'>
      <CardContent className='p-5'>
        <div className='flex h-[21rem] pli-2.5 pbs-4 rounded bg-orange-600'>
          <Image src={src} className='items-center' width={300} height={300} />
        </div>
      </CardContent>
    </Card>
  )
}

export default Peta
