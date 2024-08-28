'use client';

import Image from 'next/image';

import { kabupaten } from '@/utils/map';
import ButtonGroup from '@components/ButtonGroup'

export default function Page() {
  const buttonTitles = [
    'Syarat Pindah Memilih',
    'Rekap DPTb Sulsel',
    'Rekap DPTb kab/kota',
    'Posko Layanan DPTb',
    'Titik Kordinat TPS Sulsel',
  ];

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-2xl font-bold mb-4'>PROVINSI SULAWESI SELATAN</h1>
      <div className='flex'>
        <div className='mr-6 space-y-2'>
          {buttonTitles.map((title, index) => (
            <ButtonGroup key={index} title={title} />
          ))}
        </div>
        <div className='relative'>
          <Image
            src={'/images/peta-sulsel1.png'}
            alt={'Peta Sulawesi Selatan'}
            width={600}
            height={930}
          />
          {kabupaten.map((kab, index) => (
            <div
              key={index}
              className='absolute flex flex-col items-center cursor-pointer'
              style={{ top: kab.coords.top, left: kab.coords.left }}
              onClick={() => (window.location.href = kab.link)}
            >
              <i className='tabler-map-pin-filled text-black text-[20px]' />
              <span className='ml-1 text-md font-bold text-[#eaeaea]'>
                {kab.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
