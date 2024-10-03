import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {

  const result = await prisma.kabupaten.findMany({
    include: {
      kecamatan: {
        include: {
          kelurahan: {
            include: {
              tps: {
                select: {
                  l: true,
                  p: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const data = result.map((kabupaten) => {
    const totalKecamatan = kabupaten.kecamatan.length;
    const totalKelurahan = kabupaten.kecamatan.reduce((sum, kecamatan) => sum + kecamatan.kelurahan.length, 0);
    const { totalL, totalP } = kabupaten.kecamatan.reduce(
      (acc, kecamatan) => {
        kecamatan.kelurahan.forEach(kelurahan => {
          kelurahan.tps.forEach(tps => {
            acc.totalL += tps.l || 0;
            acc.totalP += tps.p || 0;
          });
        });
        return acc;
      },
      { totalL: 0, totalP: 0 }
    );

    const totalPemilih = totalL + totalP; // Total DPT (L + P)

    return {
      kabupaten: kabupaten.nama,
      coordsTop: kabupaten.coordsTop,
      coordsLeft: kabupaten.coordsLeft,
      link: kabupaten.link,
      totalL,
      totalP,
      totalPemilih, // Total DPT
      totalKecamatan,
      totalKelurahan,
    };
  });

  return NextResponse.json({ data });
}
