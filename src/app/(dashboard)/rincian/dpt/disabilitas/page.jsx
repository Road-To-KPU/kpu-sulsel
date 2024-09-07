import React from 'react'

import ReportsTab from '@/app/(dashboard)/home/(component)/ReportsTab'

const disabilitasCategoriesReport = ['Tuna Daksa', 'Tuna Netra', 'Tuna Rungu', 'Tuna Grahita', 'Lainnya']

const dataDisabilitas = [
  {
    type: 'orders',
    series: [{ data: [20, 21, 36, 40, 42] }]
  }
]

export default function page() {
  return (
    <div className='flex justify-center items-center'>
      <div className='w-[50%]'>
        <ReportsTab
          title={'Pemilih Disabilitas'}
          multiplier={4000}
          categories={disabilitasCategoriesReport}
          tabData={dataDisabilitas}
        />
      </div>
    </div>
  )
}
