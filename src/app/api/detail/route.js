import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const kabupatens = await prisma.kabupaten.findMany({
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
            total: true,
          },
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
            total: true,
          },
        },
      },
    });
    return NextResponse.json({ data: kabupatens });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
