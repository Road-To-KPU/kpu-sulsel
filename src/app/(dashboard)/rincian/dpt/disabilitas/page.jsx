'use client'

import React, { useEffect, useState } from 'react'

import ReportsTab from '@/app/(dashboard)/home/(component)/ReportsTab'

const disabilitasCategoriesReport = ['Tuna Daksa', 'Tuna Netra', 'Tuna Rungu', 'Tuna Grahita', 'Lainnya']

export default function Page() {
  const [dataDisabilitas, setDataDisabilitas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard')
        const data = await response.json()

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
        console.error('Fetch Error:', error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  })

  return (
    <div className='flex justify-center items-center'>
      <div className='w-full md:w-3/4 lg:w-1/2 p-4'>
        {loading ? (
          <div className='text-center'>
            <p>Loading...</p>
          </div>
        ) : (
          <ReportsTab
            title={'Pemilih Disabilitas'}
            multiplier={10000}
            categories={disabilitasCategoriesReport}
            tabData={dataDisabilitas}
          />
        )}
      </div>
    </div>
  )
}
