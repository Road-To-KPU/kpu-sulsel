import { NextResponse } from 'next/server';

import prisma from '@/libs/prisma';
import getKabupatenName from '@/utils/kabupatenName';

export async function GET(request, { params }) {
  const { slug } = params;

  const namaKabupaten = getKabupatenName(slug);
  const namaKabupatenUpper = namaKabupaten.toUpperCase();

  try {
    // Mengambil data kabupaten, termasuk disabilitas, klasifikasi usia, dan tps
    const kabupaten = await prisma.kabupaten.findFirst({
      where: {
        nama: {
          equals: namaKabupatenUpper,
          mode: 'insensitive',
        },
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
        kecamatan: {
          select: {
            kelurahan: {
              select: {
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

    if (!kabupaten) {
      return NextResponse.json({ error: 'Kabupaten not found' }, { status: 404 });
    }

    // Mengambil data dari tes_rekap berdasarkan kode_wilayah kabupaten
    const rekapData = await prisma.tes_rekap.findMany({
      where: {
        kode_wilayah: kabupaten.id,
      },
      select: {
        l: true,
        p: true,
      },
    });

    // Hitung total laki-laki dan perempuan dari rekapData (tes_rekap)
    const totalLakiLakiRekap = rekapData.reduce((sum, item) => sum + (item.l || 0), 0);
    const totalPerempuanRekap = rekapData.reduce((sum, item) => sum + (item.p || 0), 0);

    // Hitung total laki-laki dan perempuan dari data tps kabupaten
    let totalLakiLakiTps = 0;
    let totalPerempuanTps = 0;

    if (kabupaten.kecamatan && kabupaten.kecamatan.length > 0) {
      kabupaten.kecamatan.forEach(kecamatan => {
        kecamatan.kelurahan.forEach(kelurahan => {
          kelurahan.tps.forEach(tps => {
            totalLakiLakiTps += tps.l || 0;
            totalPerempuanTps += tps.p || 0;
          });
        });
      });
    }

    // Gabungkan total dari tes_rekap dan tps
    const totalLakiLaki = totalLakiLakiRekap + totalLakiLakiTps;
    const totalPerempuan = totalPerempuanRekap + totalPerempuanTps;
    const totalPemilih = totalLakiLaki + totalPerempuan;

    const result = {
      nama: kabupaten.nama,
      disabilitas: kabupaten.disabilitas,
      klasifikasi_usia: kabupaten.klasifikasi_usia,
      totalLakiLaki,
      totalPerempuan,
      totalPemilih,
    };

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
