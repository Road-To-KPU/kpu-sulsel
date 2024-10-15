import { NextResponse } from 'next/server'

import prisma from '@/libs/prisma'
import getKabupatenName from '@/utils/kabupatenName'

export async function GET(request, { params }) {
  const { slug } = params

  const namaKabupaten = getKabupatenName(slug)
  const namaKabupatenUpper = namaKabupaten.toUpperCase()

  try {
    const kabupaten = await prisma.kabupaten.findFirst({
      where: {
        nama: {
          equals: namaKabupatenUpper,
          mode: 'insensitive'
        }
      },
      select: {
        id: true,
        nama: true,
        disabilitas: {
          select: {
            fisik: true,
            intelektual: true,
            mental: true,
            sensorik_wicara: true,
            sensorik_rungu: true,
            sensorik_netra: true,
            total: true
          }
        },
        klasifikasi_usia: {
          select: {
            usia_0_20: true,
            usia_21_30: true,
            usia_31_40: true,
            usia_41_50: true,
            usia_51_60: true,
            usia_61_70: true,
            usia_71_keatas: true,
            total: true
          }
        },
        kecamatan: {
          select: {
            kelurahan: {
              select: {
                tps: {
                  select: {
                    l: true,
                    p: true
                  }
                }
              }
            }
          }
        }
      }
    })

    if (!kabupaten) {
      return NextResponse.json({ error: 'Kabupaten not found' }, { status: 404 })
    }

    const rekapData = await prisma.tes_rekap.findFirst({
      where: {
        kode_wilayah: kabupaten.id
      },
      select: {
        l: true,
        p: true
      }
    })

    if (!rekapData) {
      return NextResponse.json({ error: 'Rekap data not found' }, { status: 404 })
    }

    const totalLakiLaki = rekapData.l
    const totalPerempuan = rekapData.p

    const totalPemilih = totalLakiLaki + totalPerempuan

    // let totalLakiLaki = 0
    // let totalPerempuan = 0

    // if (kabupaten.kecamatan && kabupaten.kecamatan.length > 0) {
    //   kabupaten.kecamatan.forEach(kecamatan => {
    //     kecamatan.kelurahan.forEach(kelurahan => {
    //       kelurahan.tps.forEach(tps => {
    //         totalLakiLaki += tps.l || 0
    //         totalPerempuan += tps.p || 0
    //       })
    //     })
    //   })
    // }

    const result = {
      nama: kabupaten.nama,
      disabilitas: kabupaten.disabilitas,
      klasifikasi_usia: kabupaten.klasifikasi_usia,
      totalLakiLaki,
      totalPerempuan,
      totalPemilih
    }

    return NextResponse.json({ data: result })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
