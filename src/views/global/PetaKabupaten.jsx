import { useState } from 'react'

import Image from 'next/image'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'

const PetaKabupaten = ({ src }) => {
  const [loading, setLoading] = useState(true)

  return (
    <Card className='h-[100%] bg-orange-800'>
      <CardContent className='p-5'>
        <div className='flex h-[21rem] pli-2.5 pbs-4 rounded bg-orange-600 items-center justify-center relative'>
          {loading && (
            <div className="absolute">
              <CircularProgress color="inherit" />
            </div>
          )}
          <Image
            src={src}
            className={`items-center ${loading ? 'hidden' : 'block'}`}
            width={300}
            height={300}
            alt={'peta kabupaten'}
            onLoad={() => setLoading(false)}
            priority
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default PetaKabupaten
