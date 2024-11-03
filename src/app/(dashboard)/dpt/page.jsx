'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'

export default function Page() {
  const [cardActive, setCardActive] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [kabupaten, setKabupaten] = useState([])
  const [loading, setLoading] = useState(true)

  const theme = useTheme()
  const router = useRouter()

  const handleClickRegion = kab => {
    setSelectedRegion({
      id: kab.id,
      name: kab.nama_kabupaten,
      jumlahPemilih: kab.total_lp,
      jumlahTPS: kab.jumlah_tps,
      jumlahKecamatan: kab.jumlah_kecamatan,
      jumlahKelurahan: kab.jumlah_kelurahan,
      jumlahLaki: kab.total_l,
      jumlahPerempuan: kab.total_p,
      link: kab.link
    })
    setCardActive(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/rekap')
        const data = await response.json()

        setKabupaten(data)
      } catch (error) {
        console.error('Fetch Error:', error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-2xl md:text-3xl font-bold mb-6 text-center'>
        DAFTAR PEMILIH TETAP PROVINSI SULAWESI SELATAN
      </h1>

      {loading && <div className='text-center py-10'>Loading...</div>}

      {!loading && cardActive && selectedRegion && (
        <div className='fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center'>
          <div
            className={`bg-white w-[90%] md:w-[700px] p-6 md:p-8 rounded-lg shadow-lg ${theme.palette.mode === 'dark' ? 'dark:bg-gray-800' : 'dark:bg-white'}`}
          >
            <h2 className='text-lg md:text-xl font-bold mb-4'>{selectedRegion.name}</h2>
            <div className='grid grid-cols-2 gap-4 mb-6'>
              <div className='text-gray-700'>
                <p>Jumlah DPT</p>
                <p>Jumlah TPS</p>
                <p>Jumlah Kecamatan</p>
                <p>Jumlah Kelurahan</p>
                <p>Pemilih Laki-Laki</p>
                <p>Pemilih Perempuan</p>
              </div>
              <div className='text-right md:ml-[15rem] text-gray-900 font-semibold'>
                <p className='flex'>: {selectedRegion.jumlahPemilih.toLocaleString('id-ID')}</p>
                <p className='flex'>: {selectedRegion.jumlahTPS.toLocaleString('id-ID')}</p>
                <p className='flex'>: {selectedRegion.jumlahKecamatan.toLocaleString('id-ID')}</p>
                <p className='flex'>: {selectedRegion.jumlahKelurahan.toLocaleString('id-ID')}</p>
                <p className='flex'>: {selectedRegion.jumlahLaki.toLocaleString('id-ID')}</p>
                <p className='flex'>: {selectedRegion.jumlahPerempuan.toLocaleString('id-ID')}</p>
              </div>
            </div>
            <div className='flex justify-end space-x-2 md:space-x-4'>
              <Button onClick={() => setCardActive(false)} variant='outlined' className='rounded-full'>
                Tutup
              </Button>
              <Button
                onClick={() => router.push(`/rincian/dpt/${selectedRegion.link}/${selectedRegion.id}`)}
                variant='contained'
                className='rounded-full'
              >
                Lihat Rincian
              </Button>
            </div>
          </div>
        </div>
      )}

      {!loading && (
        <div className='flex justify-center'>
          <div className='relative'>
            <Image
              src={'/images/peta-sulsel1.png'}
              alt={'Peta Sulawesi Selatan'}
              width={380}
              height={630}
              className='lg:w-[580px] lg:h-[900px]'
            />
            {kabupaten?.map((kab, index) => (
              <div
                key={index}
                className='absolute flex flex-col items-center cursor-pointer'
                style={{ top: kab.coords_top, left: kab.coords_left }}
              >
                <div onClick={() => handleClickRegion(kab)}>
                  <i className='tabler-map-pin-filled text-[16px] lg:text-[20px]' />
                </div>
                <div
                  className='ml-1 text-[10px] lg:text-sm font-bold text-[#eaeaea]'
                  onClick={() => handleClickRegion(kab)}
                >
                  <div className='text-black'>
                    {kab.nama_kabupaten === 'PANGKAJENE KEPULAUAN' ? 'PANGKEP' : kab.nama_kabupaten}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
