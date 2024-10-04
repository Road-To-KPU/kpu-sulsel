'use client'

import { useEffect, useState } from 'react'

import CardMenu from './(component)/CardMenu'
import ReportsTab from './(component)/ReportsTab'
import ChartUsia from './(component)/ChartUsia'

export default function Page() {
  const [dataUsia, setDataUsia] = useState([])
  const [dataDisabilitas, setDataDisabilitas] = useState([])
  const [loading, setLoading] = useState(true) // State untuk loading

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

        const disabilitasData = [
          {
            type: 'orders',
            series: [
              {
                data: [
                  data?.totalDisabilitas.fisik,
                  data?.totalDisabilitas.sensorik_netra,
                  data?.totalDisabilitas.sensorik_rungu,
                  data?.totalDisabilitas.intelektual + data?.totalDisabilitas.mental,
                  data?.totalDisabilitas.sensorik_wicara
                ]
              }
            ]
          }
        ]

        setDataDisabilitas(disabilitasData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false) // Menghentikan loading setelah data diterima atau error
      }
    }

    fetchData()
  }, [])

  const usiaCategoriesReport = ['Gen Z', 'Millenial', 'Gen X', 'Baby Boomer', 'Pre Boomer']

  const disabilitasCategoriesReport = ['Tuna Daksa', 'Tuna Netra', 'Tuna Rungu', 'Tuna Grahita', 'Tuna Wicara']

  if (loading) {
    return <div>Loading...</div> // Indikator loading
  }

  return (
    <div>
      <div className='my-3'>
        <CardMenu />
      </div>
      <div className='flex justify-between flex-wrap my-10'>
        <div className='w-full md:w-[30%] mb-4 md:mb-0'>
          <ChartUsia />
        </div>
        <div className='w-full md:w-[33%] mb-4 md:mb-0'>
          <ReportsTab
            title={'Klasifikasi Usia Pemilih'}
            multiplier={10000}
            categories={usiaCategoriesReport}
            tabData={dataUsia}
          />
        </div>
        <div className='w-full md:w-[33%]'>
          <ReportsTab
            title={'Pemilih Disabilitas'}
            multiplier={4000}
            categories={disabilitasCategoriesReport}
            tabData={dataDisabilitas}
          />
        </div>
      </div>
    </div>
  )
}
