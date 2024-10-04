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
        }
      }
    })

    if (!kabupaten) {
      return NextResponse.json({ error: 'Kabupaten not found' }, { status: 404 })
    }

    return NextResponse.json({ data: kabupaten })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
