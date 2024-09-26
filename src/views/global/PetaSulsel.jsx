
import Image from 'next/image'
import Link from 'next/link'

import { kabupaten } from '@/utils/map'

const PetaSulsel = ({ onSelectRegion }) => {
  return (
    <div className='relative'>
      <Image
        src={'/images/peta-sulsel1.png'}
        alt={'PetaKab Sulawesi Selatan'}
        width={380}
        height={630}
        className='lg:w-[580px] lg:h-[900px]' // width={600} height={930}
      />
      {kabupaten.map((kab, index) => (
        <div
          key={index}
          className='absolute flex flex-col items-center cursor-pointer'
          style={{ top: kab.coords.top, left: kab.coords.left }}
        >
          <Link href={`/rincian/dpt/${kab.link}`}>
            <i className='tabler-map-pin-filled text-[16px] lg:text-[20px]' />
          </Link>
          <div
            className='ml-1 text-[10px] lg:text-sm font-bold text-[#eaeaea]'
            onClick={() =>
              onSelectRegion({
                name: kab.name,
                jumlahPemilih: kab.jumlahPemilih,
                jumlahTPS: kab.jumlahTPS,
                jumlahDPT: kab.jumlahDPT,
                link: kab.link
              })
            }
          >
            <div>{kab.name}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PetaSulsel
