import React from 'react'

import { Card, Typography } from '@mui/material'

import CardUsia from './(component)/(card-usia)/CardUsia'
import CardDisablitas from './(component)/(card-disabilitas)/CardDisablitas'
import Peta from './(component)/Peta'
import LaporanTab from './(component)/LaporanTab'
import RincianGender from './(component)/RincianGender'

const usiaCategoriesReport = ['Gen Z', 'Millenial', 'Gen X', 'Baby Boomer', 'Pre Boomer']
const disabilitasCategoriesReport = ['Tuna Daksa', 'Tuna Netra', 'Tuna Rungu', 'Tuna Grahita', 'Lainnya']

const dataUsia = [
  {
    type: 'orders',
    series: [{ data: [28, 10, 36, 38, 15] }]
  }
]

const dataDisabilitas = [
  {
    type: 'orders',
    series: [{ data: [20, 21, 36, 40, 42] }]
  }
]

const dataJenisKelamin = [60, 30]

export default function Page() {
  return (
    <div>
      {/* First Row */}
      <div className='flex flex-wrap justify-between gap-4 my-3'>
        <div className='w-full md:w-[48%] lg:w-[30%]'>
          <Peta src={'/images/peta/bantaeng.png'} />
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
        <Card className='w-full md:w-[48%] lg:w-[33%] p-2'>
          <Typography variant='h6' className='my-4 text-lg'>
            Rincian Usia
          </Typography>
          <CardUsia />
        </Card>
        <Card className='w-full md:w-[48%] lg:w-[33%] p-2'>
          <Typography variant='h6' className='mt-4 mb-3 text-lg'>
            Rincian Disabilitas
          </Typography>
          <CardDisablitas />
        </Card>
      </div>
    </div>
  )
}
