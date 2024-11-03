'use client'

import React, { useEffect, useState } from 'react'

import ReportsTab from '@/app/(dashboard)/home/(component)/ReportsTab'

const usiaCategoriesReport = ['Gen Z', 'Millenial', 'Gen X', 'Baby Boomer', 'Pre Boomer']

export default function Page() {
  const [dataUsia, setDataUsia] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard')
        const data = await response.json()

        const usiaData = [
          {
            type: 'orders',
            series: [
              {
                data: [
                  data?.totalKlasifikasiUsia.usia_0_20,
                  data?.totalKlasifikasiUsia.usia_21_30,
                  data?.totalKlasifikasiUsia.usia_31_40 + data?.totalKlasifikasiUsia.usia_41_50,
                  data?.totalKlasifikasiUsia.usia_51_60 + data?.totalKlasifikasiUsia.usia_61_70,
                  data?.totalKlasifikasiUsia.usia_71_keatas
                ]
              }
            ]
          }
        ]

        setDataUsia(usiaData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='flex justify-center items-center'>
      <div className='w-full md:w-3/4 lg:w-1/2 p-4'>
        {loading ? (
          <div className='text-center'>
            <p>Loading...</p>
          </div>
        ) : (
          <ReportsTab
            title={'Klasifikasi Usia Pemilih'}
            multiplier={10000}
            categories={usiaCategoriesReport}
            tabData={dataUsia}
          />
        )}
      </div>
    </div>
  )
}
