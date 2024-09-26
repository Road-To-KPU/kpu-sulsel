// import CardMenu from '@views/home/CardMenu'



// const ComponentMenu = () => {
    //   return <CardMenu data={data} />
    // }

    // export default ComponentMenu
"use client";
import React from "react";
import { PinContainer } from '@components/3d-pin';
import { cn } from "@/libs/utils";
import Image from "next/image";

// Data array
const data = [
  {
    title: 'Daftar Pemilih Tetap',
    stats: 1000,
    avatarIcon: 'tabler-list',
    avatarIconSize: 26,
    avatarColor: 'warning',
    avatarSize: 42,
    avatarSkin: 'light',
    href: 'https://example.com/daftar-pemilih-tetap'
  },
  {
    title: 'Daftar Pemilih Tambahan',
    stats: 2000,
    avatarIcon: 'tabler-playlist-add',
    avatarIconSize: 26,
    avatarColor: 'warning',
    avatarSize: 42,
    avatarSkin: 'light',
    href: 'https://example.com/daftar-pemilih-tambahan'
  },
  {
    title: 'TPS Lokasi Khusus',
    stats: 3000,
    avatarIcon: 'tabler-users',
    avatarIconSize: 26,
    avatarColor: 'warning',
    avatarSize: 42,
    avatarSkin: 'light',
    href: 'https://example.com/tps-lokasi-khusus'
  },
  {
    title: 'SATKER',
    stats: '',
    avatarIcon: 'tabler-building',
    avatarIconSize: 26,
    avatarColor: 'warning',
    avatarSize: 42,
    avatarSkin: 'light',
    href: 'https://example.com/satker'
  },
  {
    title: 'DAPIL',
    stats: '',
    avatarIcon: 'tabler-building-community',
    avatarIconSize: 26,
    avatarColor: 'warning',
    avatarSize: 42,
    avatarSkin: 'light',
    href: 'https://example.com/dapil'
  },
  {
    title: 'Partisipasi Pemilu/Pilkada',
    stats: '',
    avatarIcon: 'tabler-chart-pie',
    avatarIconSize: 26,
    avatarColor: 'warning',
    avatarSize: 42,
    avatarSkin: 'light',
    href: 'https://example.com/partisipasi'
  }
];

export default function Page() {
    return (
      <div className='overflow-x-auto overflow-y-hidden hide-scrollbar'>
        <div className="flex items-center justify-start space-x-4 px-4">
          {data.map((item, index) => (
            <PinContainer
              key={index}
              title={item.title}
            //   href={item.href}
              className="text-center"
              containerClassName="w-64 h-96"
            >
              <div className="flex flex-col items-center p-6 tracking-tight text-slate-100/50">
                {/* <h3 className="font-bold text-base text-slate-100">{item.title}</h3>
                <div className="text-base font-normal">
                  <span className="text-slate-500">
                    Jumlah: {item.stats || 'N/A'}
                  </span>
                </div> */}

                <Image src='/d.png' alt='d' width={300} height={350} />
              </div>
            </PinContainer>
          ))}
        </div>
      </div>
    );
  }
