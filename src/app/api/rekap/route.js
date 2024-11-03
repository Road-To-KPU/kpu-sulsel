import { NextResponse } from 'next/server'

import prisma from '@/libs/prisma'

export async function GET() {
  try {
    const result = await prisma.$queryRaw`
      SELECT
        kabupaten.nama AS nama_kabupaten,
        kabupaten.coords_top,
        kabupaten.coords_left,
        kabupaten.link,
         COUNT(DISTINCT kecamatan.id)::VARCHAR AS jumlah_kecamatan,
        COUNT(DISTINCT kelurahan.id)::VARCHAR AS jumlah_kelurahan,
        COUNT(DISTINCT tps_data.id)::VARCHAR AS jumlah_tps,
        SUM(tps_data.l) AS total_l,
        SUM(tps_data.p) AS total_p,
        SUM(tps_data.lp) AS total_lp
      FROM
        kpu.tps_data
      LEFT JOIN kpu.kelurahan ON SUBSTR(tps_data.id, 1, 10) = kelurahan.id
      LEFT JOIN kpu.kecamatan ON kelurahan.kecamatan_id = kecamatan.id
      LEFT JOIN kpu.kabupaten ON kecamatan.kabupaten_id = kabupaten.id
      GROUP BY
        kabupaten.nama , kabupaten.coords_top, kabupaten.coords_left, kabupaten.link
      ORDER BY
        kabupaten.nama;
    `;

    const serializedResult = result.map(row => ({
      nama_kabupaten: row.nama_kabupaten,
      coords_top: row.coords_top,
      coords_left: row.coords_left,
      link: row.link,
      jumlah_kecamatan: row.jumlah_kecamatan,
      jumlah_kelurahan: row.jumlah_kelurahan,
      jumlah_tps: row.jumlah_tps,
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
