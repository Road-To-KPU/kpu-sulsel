'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import Image from 'next/image'

import Link from 'next/link'

import Button from '@mui/material/Button'

import { useTheme } from '@mui/material/styles'

export default function Page() {
  const [cardActive, setCardActive] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [kabupaten, setKabupaten] = useState([])
  const [loading, setLoading] = useState(true) // State untuk loading

  const theme = useTheme()
  const router = useRouter()

  const handleClick = region => {
    setSelectedRegion(region)
    setCardActive(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/rekap')
        const data = await response.json()

        setKabupaten(data?.data)
      } catch (error) {
        console.error('Fetch Error:', error.message)
      } finally {
        setLoading(false) // Menghentikan loading setelah data diterima atau error
      }
    }

    fetchData()
  }, [])

  console.log('Kabupaten:', kabupaten)

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl font-bold mb-6'>DAFTAR PEMILIH TETAP PROVINSI SULAWESI SELATAN</h1>
      {loading && <div className='text-center py-10'>Loading...</div>} {/* Indikator loading */}
      {!loading && cardActive && selectedRegion && (
        <div className='fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center'>
          <div
            className={`bg-white w-[700px] p-8 rounded-lg shadow-lg ${
              theme.palette.mode === 'dark' ? 'dark:bg-gray-800' : 'dark:bg-white'
            }`}
          >
            <h2 className='text-xl font-bold mb-4'>{selectedRegion.name}</h2>
            <div className='grid grid-cols-2 gap-4 mb-6'>
              <div className='text-gray-700'>
                <p>Jumlah DPT</p>
                <p>Jumlah TPS</p>
                <p>Jumlah Kecamatan</p>
                <p>Jumlah Kelurahan</p>
                <p>Jumlah Pemilih Laki-Laki</p>
                <p>Jumlah Pemilih Perempuan</p>
              </div>
              <div className='text-right ml-[15rem] text-gray-900 font-semibold'>
                <p className='flex'>: {selectedRegion.jumlahPemilih}</p>
                <p className='flex'>: {selectedRegion.jumlahTPS}</p>
                <p className='flex'>: {selectedRegion.jumlahKecamatan}</p>
                <p className='flex'>: {selectedRegion.jumlahKelurahan}</p>
                <p className='flex'>: {selectedRegion.jumlahLaki}</p>
                <p className='flex'>: {selectedRegion.jumlahPerempuan}</p>
              </div>
            </div>
            <div className='flex justify-end space-x-4'>
              <Button onClick={() => setCardActive(false)} variant='outlined' className='rounded-full'>
                Tutup
              </Button>
              <Button
                onClick={() => router.push(`/rincian/dpt/${selectedRegion.link}`)}
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
        <div className='flex'>
          <div className='relative'>
            <Image
              src={'/images/peta-sulsel1.png'}
              alt={'Peta Sulawesi Selatan'}
              width={380}
              height={630}
              className='lg:w-[580px] lg:h-[900px]' // width={600} height={930}
            />
            {kabupaten?.map((kab, index) => (
              <div
                key={index}
                className='absolute flex flex-col items-center cursor-pointer'
                style={{ top: kab.coordsTop, left: kab.coordsLeft }}
              >
                <Link href={`/rincian/dpt/${kab.link}`}>
                  <i className='tabler-map-pin-filled text-[16px] lg:text-[20px]' />
                </Link>
                <div
                  className='ml-1 text-[10px] lg:text-sm font-bold text-[#eaeaea]'
                  onClick={() =>
                    handleClick({
                      name: kab.kabupaten,
                      jumlahPemilih: kab.totalPemilih,
                      jumlahTPS: kab.totalTps,
                      jumlahKecamatan: kab.totalKecamatan,
                      jumlahKelurahan: kab.totalKelurahan,
                      jumlahLaki: kab.totalL,
                      jumlahPerempuan: kab.totalP,
                      link: kab.link
                    })
                  }
                >
                  <div className='text-black'>{kab.kabupaten}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
