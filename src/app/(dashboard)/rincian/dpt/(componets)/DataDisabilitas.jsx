'use client'

import { useEffect, useState } from 'react'

import CardDisablitas from '@views/global/CardDisablitas'

export default function DataDisabilitas() {

  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/data');

      if (!res.ok) {
        throw new Error('Gagal mengambil data');
      }

      const data = await res.json();

      console.log('Fetched data:', data);

      setData(data);
    } catch (error) {
      console.error('Fetch Error:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const dataDisabilitasRincian = [
    {
      title: 'Tuna Daksa',
      jumlah: data.filter((item) => item.tuna_daksa).length
    },
    {
      title: 'Tuna Netra',
      jumlah: data.filter((item) => item.tuna_netra).length
    },
    {
      title: 'Tuna Rungu',
      jumlah: data.filter((item) => item.tuna_rungu === 'Tuna Rungu').length
    },
    {
      title: 'Tuna Grahita',
      jumlah: data.filter((item) => item.tuna_grahita).length
    },
    {
      title: 'Disabilitas Lainnya',
      jumlah: data.filter((item) => item.disabilitas_lainnya).length
    }
  ]

  return <CardDisablitas data={dataDisabilitasRincian} />
}
