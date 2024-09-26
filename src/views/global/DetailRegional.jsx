// components/DetailRegional.js

import { useRouter } from 'next/navigation'

import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'

const DetailRegional = ({ region, onClose }) => {
  const theme = useTheme()
  const router = useRouter()

  return (
    <div className='fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center'>
      <div className={`bg-white w-[700px] p-8 rounded-lg shadow-lg ${theme.palette.mode === 'dark' ? 'dark:bg-gray-800' : 'dark:bg-white'}`}>
        <h2 className='text-xl font-bold mb-4'>{region.name}</h2>
        <div className='grid grid-cols-2 gap-4 mb-6'>
          <div className='text-gray-700'>
            <p>Jumlah Pemilih</p>
            <p>Jumlah TPS</p>
            <p>Jumlah DPT</p>
          </div>
          <div className='text-right text-gray-900 font-semibold'>
            <p>: {region.jumlahPemilih}</p>
            <p>: {region.jumlahTPS}</p>
            <p>: {region.jumlahDPT}</p>
          </div>
        </div>
        <div className='flex justify-end space-x-4'>
          <Button onClick={onClose} variant='outlined' className='rounded-full'>
            Tutup
          </Button>
          <Button
            onClick={() => router.push(`/rincian/dpt/${region.link}`)}
            variant='contained'
            className='rounded-full'
          >
            Lihat Rincian
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DetailRegional
