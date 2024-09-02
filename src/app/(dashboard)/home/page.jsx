
import CardMenu from './(component)/CardMenu'
import ReportsTab from './(component)/ReportsTab'
import ChartUsia from './(component)/ChartUsia'

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

export default function Page() {
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
