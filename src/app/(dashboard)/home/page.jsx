import EarningReportsWithTabs from "./(component)/EarningReportsWithTabs";
import Horizontal from "./(component)/HorizontalCard";
import LogisticsDeliveryExceptions from "./(component)/LogisticsDeliveryExceptions";

const usiaCategoriesReport = ['Gen Z', 'Millenial', 'Gen X', 'Baby Boomer', 'Pre Boomer']
const disabilitasCategoriesReport = ['Tuna Daksa', 'Tuna Netra', 'Tuna Rungu', 'Tuna Grahita', 'Lainnya']

export default function Page() {
  return (
    <div>
      <div className='my-3'>
        <Horizontal />
      </div>
      <div className='flex justify-between my-10'>
        <div className='w-[30%]'>
          <LogisticsDeliveryExceptions />
        </div>
        <div className='w-[33%]'>
          <EarningReportsWithTabs title={'Klasifikasi Usia Pemilih'} multiplier={10000} categories={usiaCategoriesReport}/>
        </div>
        <div className='w-[33%]'>
          <EarningReportsWithTabs title={'Pemilih Disabilitas'} multiplier={4000} categories={disabilitasCategoriesReport} />
        </div>
      </div>
    </div>
  )
}
