import { NextResponse } from 'next/server';

import prisma from '@/libs/prisma';

export async function GET(request) {

  console.log("jalan ini ?");
  const { searchParams } = new URL(request.url);

  console.log("🚀 ~ GET ~ searchParams:", searchParams)
  const idKab = searchParams.get('kab_id');

  console.log("🚀 ~ GET ~ idKab:", idKab)

  if (!idKab) {
    return NextResponse.json({ error: 'Parameter id_kab diperlukan' }, { status: 400 });
  }

  try {
    const result = await prisma.$queryRaw`
      SELECT
        kecamatan.nama AS nama_kecamatan,
        COUNT(DISTINCT kecamatan.id)::VARCHAR AS jumlah_kecamatan,
        COUNT(DISTINCT kelurahan.id)::VARCHAR AS jumlah_kelurahan,
        SUM(tps_data.l) AS total_l,
        SUM(tps_data.p) AS total_p,
        SUM(tps_data.lp) AS total_lp
      FROM
        kpu.kecamatan
      LEFT JOIN kpu.kelurahan ON kecamatan.id = kelurahan.kecamatan_id
      LEFT JOIN kpu.tps_data ON SUBSTR(tps_data.id, 1, 10) = kelurahan.id
      WHERE
        kecamatan.kabupaten_id = ${idKab}
      GROUP BY
        kecamatan.nama
      ORDER BY
        kecamatan.nama;
    `;

    const serializedResult = result.map(row => ({
      nama_kecamatan: row.nama_kecamatan,
      jumlah_kecamatan: row.jumlah_kecamatan,
      jumlah_kelurahan: row.jumlah_kelurahan,
      total_l: row.total_l ? Number(row.total_l) : null,
      total_p: row.total_p ? Number(row.total_p) : null,
      total_lp: row.total_lp ? Number(row.total_lp) : null,
    }));

    return NextResponse.json(serializedResult);
  } catch (e) {
    console.error(e);

    return NextResponse.json({ error: 'Terjadi kesalahan saat mengambil data' }, { status: 500 });
  }
}
