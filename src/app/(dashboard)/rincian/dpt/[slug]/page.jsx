'use client'

import { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'

import { Card, Typography } from '@mui/material'

import { getImageByPathName } from '@/utils/imageMapper'
import Peta from '@/app/(dashboard)/rincian/(component)/Peta'
import LaporanTab from '@/app/(dashboard)/rincian/(component)/LaporanTab'
import RincianGender from '@/app/(dashboard)/rincian/(component)/RincianGender'
import CardUsia from '@/app/(dashboard)/rincian/(component)/(card-usia)/CardUsia'
import CardDisablitas from '@/app/(dashboard)/rincian/(component)/(card-disabilitas)/CardDisablitas'
import getKabupatenName from '@/utils/kabupatenName'

const usiaCategoriesReport = ['Gen Z', 'Millenial', 'Gen X', 'Baby Boomer', 'Pre Boomer']
const disabilitasCategoriesReport = ['Tuna Daksa', 'Tuna Netra', 'Tuna Rungu', 'Tuna Grahita', 'Tuna Wicara']

export default function Page() {
  const path = usePathname().split('/').pop()
  const image = getImageByPathName(path)
  const nameKabupaten = getKabupatenName(path)

  // State untuk menyimpan data dari API
  const [data, setData] = useState(null)

  // Fetch data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/detail/${path}`)
        const result = await response.json()

        console.log('Data:', result?.data)

        setData(result?.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [path])

  if (!data) {
    return <div>Loading...</div>
  }

  const dataJenisKelamin = [60, 30]

  const dataUsiaRincian = [
    {
      title: 'Gen Z',
      image: '/images/genz.png',
      data: data?.klasifikasi_usia[0]?.usia_0_20 || 0,
      umur: 'Usia 17-25 tahun'
    },
    {
      title: 'Gen Millenial',
      image: '/images/genmilenial.png',
      data: data?.klasifikasi_usia[0]?.usia_21_30 || 0,
      umur: 'Usia 26-35 tahun'
    },
    {
      title: 'Gen X',
      image: '/images/genx.png',
      data: data?.klasifikasi_usia[0]?.usia_31_40 + data?.klasifikasi_usia[0]?.usia_41_50 || 0,
      umur: 'Usia 36-50 tahun'
    },
    {
      title: 'Baby Boomer',
      image: '/images/babyboomer.png',
      data: data?.klasifikasi_usia[0]?.usia_51_60 + data?.klasifikasi_usia[0]?.usia_61_70 || 0,
      umur: 'Usia 51-70 tahun'
    },
    {
      title: 'Pre Boomer',
      image: '/images/preboomer.png',
      data: data?.klasifikasi_usia[0]?.usia_71_keatas || 0,
      umur: 'Usia 71+ tahun'
    }
  ]

  const dataDisabilitasRincian = [
    {
      title: 'Tuna Daksa',
      jumlah: data?.disabilitas[0]?.fisik || 'Data tidak tersedia'
    },
    {
      title: 'Tuna Netra',
      jumlah: data?.disabilitas[0]?.sensorik_netra || 'Data tidak tersedia'
    },
    {
      title: 'Tuna Rungu',
      jumlah: data?.disabilitas[0]?.sensorik_rungu || 'Data tidak tersedia'
    },
    {
      title: 'Tuna Grahita',
      jumlah: data?.disabilitas[0]?.intelektual + data?.disabilitas[0]?.mental || 'Data tidak tersedia'
    },
    {
      title: 'Tuna Wicara',
      jumlah: data?.disabilitas[0]?.sensorik_wicara || 'Data tidak tersedia'
    }
  ]

  const dataUsia = [
    {
      type: 'orders',
      series: [
        {
          data: [
            data?.klasifikasi_usia[0]?.usia_0_20 || 0,
            data?.klasifikasi_usia[0]?.usia_21_30 || 0,
            data?.klasifikasi_usia[0]?.usia_31_40 + data?.klasifikasi_usia[0]?.usia_41_50 || 0,
            data?.klasifikasi_usia[0]?.usia_51_60 + data?.klasifikasi_usia[0]?.usia_61_70 || 0,
            data?.klasifikasi_usia[0]?.usia_71_keatas || 0
          ]
        }
      ]
    }
  ]

  const dataDisabilitas = [
    {
      type: 'orders',
      series: [
        {
          data: [
            data?.disabilitas[0]?.fisik || 0,
            data?.disabilitas[0]?.sensorik_netra || 0,
            data?.disabilitas[0]?.sensorik_rungu || 0,
            data?.disabilitas[0]?.intelektual + data?.disabilitas[0]?.mental || 0,
            data?.disabilitas[0]?.sensorik_wicara || 0
          ]
        }
      ]
    }
  ]

  return (
    <div>
      {/* First Row */}
      <div className='flex flex-wrap justify-between gap-4 my-3'>
        <div className='w-full md:w-[48%] lg:w-[30%]'>
          <Peta src={image} nameKabupaten={nameKabupaten} />
        </div>
        <div className='w-full md:w-[48%] lg:w-[33%]'>
          <LaporanTab
            title={'Klasifikasi Usia Pemilih'}
            multiplier={10000}
            categories={usiaCategoriesReport}
            tabData={dataUsia}
          />
        </div>
        <div className='w-full md:w-[48%] lg:w-[33%]'>
          <LaporanTab
            title={'Pemilih Disabilitas'}
            multiplier={4000}
            categories={disabilitasCategoriesReport}
            tabData={dataDisabilitas}
          />
        </div>
      </div>

      {/* Second Row */}
      <div className='flex flex-wrap justify-between gap-4 my-5'>
        <div className='w-full md:w-[48%] lg:w-[30%]'>
          <RincianGender data={dataJenisKelamin} />
        </div>
        <Card className='w-full md:w-[48%] lg:w-[33%] p-2 bg-orange-800'>
          <Typography variant='h6' className='my-4 text-lg text-white'>
            Rincian Usia
          </Typography>
          <CardUsia data={dataUsiaRincian} />
        </Card>
        <Card className='w-full md:w-[48%] lg:w-[33%] p-2 bg-orange-800'>
          <Typography variant='h6' className='mt-4 mb-3 text-lg text-white'>
            Rincian Disabilitas
          </Typography>
          <CardDisablitas data={dataDisabilitasRincian} />
        </Card>
      </div>
    </div>
  )
}
