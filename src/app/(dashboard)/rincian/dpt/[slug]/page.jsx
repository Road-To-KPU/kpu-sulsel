'use client'

import { usePathname } from 'next/navigation'

import UpcomingWebinar from '../../(component)/UpcomingWebinar'
import EarningReportsWithTabs from '../../(component)/EarningReportsWithTabs'
import LogisticsDeliveryExceptions from '../../(component)/LogisticsDeliveryExceptions'
import { getImageByPathName } from '@/utils/imageMapper'







const usiaCategoriesReport = ['Gen Z', 'Millenial', 'Gen X', 'Baby Boomer', 'Pre Boomer']
const disabilitasCategoriesReport = ['Tuna Daksa', 'Tuna Netra', 'Tuna Rungu', 'Tuna Grahita', 'Lainnya']

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const path = usePathname().split('/')
  const image = getImageByPathName(path[path.length - 1])

  return (
    <div>
      <div className='flex justify-between my-3 h-[23.5rem]'>
        <div className='w-[30%]'>
          <UpcomingWebinar image={image} />
        </div>
        <div className='w-[33%]'>
          <EarningReportsWithTabs
            title={'Klasifikasi Usia Pemilih'}
            multiplier={10000}
            categories={usiaCategoriesReport}
          />
        </div>
        <div className='w-[33%]'>
          <EarningReportsWithTabs
            title={'Pemilih Disabilitas'}
            multiplier={4000}
            categories={disabilitasCategoriesReport}
          />
        </div>
      </div>
      <div className='flex justify-between my-5'>
        <div className='w-[30%]'>
          <LogisticsDeliveryExceptions />
        </div>
      </div>
    </div>
  )
}
