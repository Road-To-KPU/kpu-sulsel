'use client';

import { useState, useEffect } from 'react';


import { useRouter } from 'next/navigation'
import Link from 'next/link'

import Image from 'next/image';

import Button from '@mui/material/Button';

import ButtonGroup from '@components/ButtonGroup';
import { kabupaten } from '@/utils/map';


export default function Page() {
  const [cardActive, setCardActive] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const router = useRouter();
  const [data, setData] = useState([]);



  // console.log('State data:', data);


  const buttonTitles = [
    'DPT Sulawesi Selatan',
    'DPT Kab/Kota',
    'Disabilitas',
    'Klasifikasi Usia',
    'Cek DPT ONLINE',
  ];

  const handleClick = (region) => {
    setSelectedRegion(region);
    setCardActive(true);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">PROVINSI SULAWESI SELATAN</h1>

      {cardActive && selectedRegion && (
        <div className="fixed z-50 top-0 left-0 w-full bg-black bg-opacity-50 text-opacity-50 h-full flex justify-center items-center">
          <div className="bg-white w-[700px] p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">{selectedRegion.name}</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-gray-700">
                <p>Jumlah Pemilih</p>
                <p>Jumlah TPS</p>
                <p>Jumlah DPT</p>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                onClick={() => setCardActive(false)}
                variant="outlined"
                className="rounded-full"
              >
                Tutup
              </Button>
              <Button
                onClick={() => router.push(`/rincian/dpt/${selectedRegion.link}`)}
                variant="contained"
                className="rounded-full"
              >
                Lihat Rincian
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        <div className="mr-6 space-y-2">
          {buttonTitles.map((title, index) => (
            <ButtonGroup key={index} title={title} />
          ))}
        </div>
        <div className="relative">
          <Image
            src={'/images/peta-sulsel1.png'}
            alt={'Peta Sulawesi Selatan'}
            width={600}
            height={930}
            className="rounded"
          />
          {kabupaten.map((kab, index) => (
            <div
              key={index}
              className="absolute flex flex-col items-center cursor-pointer"
              style={{ top: kab.coords.top, left: kab.coords.left }}
            >
              <Link href={`/rincian/dpt/${kab.link}`}>
                <i className="tabler-map-pin-filled text-[20px]" />
              </Link>
                <div
                  onClick={() =>
                    handleClick({
                      name: kab.name,
                      jumlahPemilih: kab.jumlahPemilih,
                      jumlahTPS: kab.jumlahTPS,
                      jumlahDPT: kab.jumlahDPT,
                      link: kab.link
                    })
                  }
                  className="text-md text-[#eaeaea] font-bold"
                >
                  {kab.name}
                </div>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
}
