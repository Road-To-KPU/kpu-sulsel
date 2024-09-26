import Diagram from '@views/home/Diagram'



const kategoriUsia = ['Gen Z', 'Millenial', 'Gen X', 'Baby Boomer', 'Pre Boomer']

const dataUsia = [
  {
    type: 'orders',
    series: [{ data: [28, 10, 36, 38, 15] }]
  }
]

export default function KlasifikasiUsiaPemilih() {
  return (
    <>
      <Diagram
        title={'Klasifikasi Usia Pemilih'}
        multiplier={10000}
        categories={kategoriUsia}
        tabData={dataUsia}
      />
    </>
  )
}
