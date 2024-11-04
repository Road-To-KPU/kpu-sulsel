'use client'

import { useEffect, useState } from 'react'

import { useRouter, usePathname } from 'next/navigation'

import {
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'

import { getImageByPathName } from '@/utils/imageMapper'
import Peta from '@/app/(dashboard)/rincian/(component)/Peta'
import LaporanTab from '@/app/(dashboard)/rincian/(component)/LaporanTab'
import RincianGender from '@/app/(dashboard)/rincian/(component)/RincianGender'
import getKabupatenName from '@/utils/kabupatenName'

const usiaCategoriesReport = ['0-20 Tahun', '21-30 Tahun', '31-50 Tahun', '51-70 Tahun', '71+ Tahun']
const disabilitasCategoriesReport = ['Tuna Daksa', 'Tuna Netra', 'Tuna Rungu', 'Tuna Grahita', 'Tuna Wicara']

export default function Page() {
  const router = useRouter()
  const path = usePathname().split('/').pop()
  const image = getImageByPathName(path)
  const nameKabupaten = getKabupatenName(path)

  const [dataSummary, setDataSummary] = useState(null)
  const [dataJenisKelamin, setDataJenisKelamin] = useState([])
  const [totalPemilihKelamin, setTotalPemilihKelamin] = useState(0)
  const [dataKecamatan, setDataKecamatan] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/detail/kec/?kab_id=${path}`)
        const result = await response.json()

        setDataSummary(result?.summary)
        setDataJenisKelamin([result?.summary?.total_l, result?.summary?.total_p])
        setTotalPemilihKelamin(result?.summary?.total_lp)
        setDataKecamatan(result?.kecamatanData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [path])

  if (!dataSummary) {
    return <div>Loading...</div>
  }

  const dataUsia = [
    {
      type: 'orders',
      series: [
        {
          data: [
            dataSummary?.usia_0_20 || 0,
            dataSummary?.usia_21_30 || 0,
            dataSummary?.usia_31_40 + dataSummary?.usia_41_50 || 0,
            dataSummary?.usia_51_60 + dataSummary?.usia_61_70 || 0,
            dataSummary?.usia_71_keatas || 0
          ]
        }
      ]
    }
  ]

  const dataDisabilitas = [
    {
      type: 'orders',
      series: [
        {
          data: [
            dataSummary?.fisik || 0,
            dataSummary?.sensorik_netra || 0,
            dataSummary?.sensorik_rungu || 0,
            dataSummary?.intelektual + dataSummary?.mental || 0,
            dataSummary?.sensorik_wicara || 0
          ]
        }
      ]
    }
  ]

  const handleRowClick = kecamatanId => {
    router.push(`/rincian/kelurahan/${kecamatanId}`)
  }

  return (
    <div>
      {/* First Row */}
      <div className='flex flex-wrap justify-between gap-2 my-3'>
        <div className='w-full md:w-[48%] lg:w-[24%]'>
          <Peta src={image} nameKabupaten={nameKabupaten} />
        </div>
        <div className='w-full md:w-[48%] lg:w-[24%]'>
          <LaporanTab
            title={'Klasifikasi Usia Pemilih'}
            multiplier={10000}
            categories={usiaCategoriesReport}
            tabData={dataUsia}
          />
        </div>
        <div className='w-full md:w-[48%] lg:w-[24%]'>
          <LaporanTab
            title={'Pemilih Disabilitas'}
            multiplier={4000}
            categories={disabilitasCategoriesReport}
            tabData={dataDisabilitas}
          />
        </div>
        <div className='w-full md:w-[48%] lg:w-[24%]'>
          <RincianGender data={dataJenisKelamin} totalPemilihGender={totalPemilihKelamin} />
        </div>
      </div>

      {/* Table Kecamatan */}
      <TableContainer component={Paper} sx={{ padding: 3, overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='left' sx={{ fontSize: { xs: 14, md: 16 } }}>
                <strong>Kecamatan</strong>
              </TableCell>
              <TableCell align='right' sx={{ fontSize: { xs: 14, md: 16 } }}>
                <strong>Jumlah Tps</strong>
              </TableCell>
              <TableCell align='right' sx={{ fontSize: { xs: 14, md: 16 } }}>
                <strong>Jumlah Kelurahan</strong>
              </TableCell>
              <TableCell align='right' sx={{ fontSize: { xs: 14, md: 16 } }}>
                <strong>Total Laki-Laki</strong>
              </TableCell>
              <TableCell align='right' sx={{ fontSize: { xs: 14, md: 16 } }}>
                <strong>Total Perempuan</strong>
              </TableCell>
              <TableCell align='right' sx={{ fontSize: { xs: 14, md: 16 } }}>
                <strong>Total Pemilih</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataKecamatan.map(kecamatan => (
              <TableRow
                key={kecamatan.id}
                hover
                style={{ cursor: 'pointer' }}
                onClick={() => handleRowClick(kecamatan.id)}
              >

                <TableCell sx={{ fontSize: { xs: 12, md: 14 } }}>{kecamatan.nama_kecamatan}</TableCell>
                <TableCell align='right' sx={{ fontSize: { xs: 12, md: 14 } }}>
                  {kecamatan.total_tps}
                </TableCell>
                <TableCell align='right' sx={{ fontSize: { xs: 12, md: 14 } }}>
                  {kecamatan.jumlah_kelurahan}
                </TableCell>
                <TableCell align='right' sx={{ fontSize: { xs: 12, md: 14 } }}>
                  {kecamatan.total_l}
                </TableCell>
                <TableCell align='right' sx={{ fontSize: { xs: 12, md: 14 } }}>
                  {kecamatan.total_p}
                </TableCell>
                <TableCell align='right' sx={{ fontSize: { xs: 12, md: 14 } }}>
                  {kecamatan.total_lp}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
