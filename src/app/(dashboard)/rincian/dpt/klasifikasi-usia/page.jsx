import React from 'react'

import ReportsTab from '@/app/(dashboard)/home/(component)/ReportsTab'

const usiaCategoriesReport = ['Gen Z', 'Millenial', 'Gen X', 'Baby Boomer', 'Pre Boomer']

const dataUsia = [
  {
    type: 'orders',
    series: [{ data: [28, 10, 36, 38, 15] }]
  }
]

export default function page() {
  return (
    <div className='flex justify-center items-center'>
      <div className='w-[50%]'>
        <ReportsTab
          title={'Pemilih Disabilitas'}
          multiplier={4000}
          categories={usiaCategoriesReport}
          tabData={dataUsia}
        />
      </div>
    </div>
  )
}
