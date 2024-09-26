'use client'

import { Card, Typography } from '@mui/material'

import PetaKab from '@/app/(dashboard)/rincian/dpt/(componets)/PetaKab'
import KlasifikasiUsiaPemilih from '@/app/(dashboard)/rincian/dpt/(componets)/KlasifikasiUsiaPemilih'
import PemilihDisabilitas from '@/app/(dashboard)/rincian/dpt/(componets)/PemilihDisabilitas'
import ComponentJenisKelamin from '@/app/(dashboard)/rincian/dpt/(componets)/ComponentJenisKelamin'
import RincianUsia from '@/app/(dashboard)/rincian/dpt/(componets)/RincianUsia'
import DataDisabilitas from '@/app/(dashboard)/rincian/dpt/(componets)/DataDisabilitas'



export default function ComponentRincianDpt() {

  return (
    <div>
      <div className='flex flex-wrap justify-between gap-4 my-3'>
        <div className='w-full md:w-[48%] lg:w-[30%]'>
          <PetaKab />
        </div>
        <div className='w-full md:w-[48%] lg:w-[33%]'>
          <KlasifikasiUsiaPemilih />
        </div>
        <div className='w-full md:w-[48%] lg:w-[33%]'>
          <PemilihDisabilitas />
        </div>
      </div>


      <div className='flex flex-wrap justify-between gap-4 my-5'>
        <div className='w-full md:w-[48%] lg:w-[30%]'>
          <ComponentJenisKelamin />
        </div>
        <Card className='w-full md:w-[48%] lg:w-[33%] p-2 bg-orange-800'>
          <Typography variant='h6' className='my-4 text-lg text-white'>
            Rincian Usia
          </Typography>
          <RincianUsia />
        </Card>
        <Card className='w-full md:w-[48%] lg:w-[33%] p-2 bg-orange-800'>
          <Typography variant='h6' className='mt-4 mb-3 text-lg text-white'>
            Rincian Disabilitas
          </Typography>
          <DataDisabilitas />
        </Card>
      </div>
    </div>
  )
}
