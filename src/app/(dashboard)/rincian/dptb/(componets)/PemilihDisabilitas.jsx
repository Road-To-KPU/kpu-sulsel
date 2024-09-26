import Diagram from '@views/home/Diagram'




const kategoriDisabilitas = ['Tuna Daksa', 'Tuna Netra', 'Tuna Rungu', 'Tuna Grahita', 'Lainnya']



const dataDisabilitas = [
  {
    type: 'orders',
    series: [{ data: [20, 21, 36, 40, 42] }]
  }
]


export default function PemilihDisabilitas() {
  return (
    <>
      <Diagram
        title={'Pemilih Disabilitas'}
        multiplier={4000}
        categories={kategoriDisabilitas}
        tabData={dataDisabilitas}
      />
    </>
  )
}
