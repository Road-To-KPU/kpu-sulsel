import { NextResponse } from 'next/server';

import prisma from '@/libs/prisma';

export async function GET() {
  try {
    const kabupatenData = await prisma.kabupaten.findMany({
      include: {
        kecamatan: {
          include: {
            kelurahan: true
          }
        }
      }
    });

    const rekapData = await prisma.tes_rekap.findMany({
      select: {
        kode_wilayah: true,
        tps: true,
        l: true,
        p: true
      }
    });

    const data = kabupatenData.map(kabupaten => {
      const totalKecamatan = kabupaten.kecamatan.length + 1;
      const totalKelurahan = (kabupaten.kecamatan.reduce((sum, kecamatan) => sum + kecamatan.kelurahan.length, 0)) + 1;

      const rekapForKabupaten = rekapData.filter(rekap => rekap.kode_wilayah === kabupaten.id);

      const totalTps = rekapForKabupaten.reduce((sum, rekap) => sum + (rekap.tps || 0), 0);
      const totalL = rekapForKabupaten.reduce((sum, rekap) => sum + (rekap.l || 0), 0);
      const totalP = rekapForKabupaten.reduce((sum, rekap) => sum + (rekap.p || 0), 0);
      const totalPemilih = totalL + totalP;

      return {
        kabupaten: kabupaten.nama,
        coordsTop: kabupaten.coordsTop,
        coordsLeft: kabupaten.coordsLeft,
        link: kabupaten.link,
        totalL,
        totalP,
        totalPemilih,
        totalKecamatan,
        totalKelurahan,
        totalTps
      };
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
