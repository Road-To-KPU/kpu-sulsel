import { NextResponse } from 'next/server';

import prisma from '@/libs/prisma';

export async function GET() {
  try {
    const kabupatenData = await prisma.kabupaten.findMany({
      include: {
        kecamatan: {
          include: {
            kelurahan: {
              include: {
                tps: true
              }
            }
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
      const totalKecamatan = kabupaten.kecamatan.length;

      const totalKelurahan = kabupaten.kecamatan.reduce((sum, kecamatan) => sum + kecamatan.kelurahan.length, 0);

      const totalTps = kabupaten.kecamatan.reduce((sum, kecamatan) =>
        sum + kecamatan.kelurahan.reduce((kelSum, kelurahan) => kelSum + kelurahan.tps.length, 0), 0);

      // Hitung total L dan P dari tes_rekap
      const rekapForKabupaten = rekapData.filter(rekap => rekap.kode_wilayah === kabupaten.id);

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
