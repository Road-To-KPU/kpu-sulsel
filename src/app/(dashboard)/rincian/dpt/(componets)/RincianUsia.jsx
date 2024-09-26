import CardUsia from '@views/global/CardUsia'


const dataUsiaRincian = [
  {
    title: 'Gen Z',
    image: '/images/genz.png',
    data: 90000,
    umur: 'Usia 17-25 tahun'
  },
  {
    title: 'Gen Millenial',
    image: '/images/genmilenial.png',
    data: 120000,
    umur: 'Usia 26-35 tahun'
  },
  {
    title: 'Gen X',
    image: '/images/genx.png',
    data: 80000,
    umur: 'Usia 36-50 tahun'
  },
  {
    title: 'Baby Boomer',
    image: '/images/babyboomer.png',
    data: 50000,
    umur: 'Usia 51-70 tahun'
  },
  {
    title: 'Pre Boomer',
    image: '/images/preboomer.png',
    data: 20000,
    umur: 'Usia 71+ tahun'
  }
]

export default function RincianUsia() {
  return <CardUsia data={dataUsiaRincian} />
}
