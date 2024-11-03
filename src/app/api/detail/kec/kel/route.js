import { NextResponse } from 'next/server';

import prisma from '@/libs/prisma';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const idKec = searchParams.get('kec_id');

  if (!idKec) {
    return NextResponse.json({ error: 'Parameter id_kec diperlukan' }, { status: 400 });
  }

  try {
    const result = await prisma.$queryRaw`
      SELECT
      kelurahan.id,
        kelurahan.nama AS nama_kelurahan,
        COUNT(DISTINCT kelurahan.id)::VARCHAR AS jumlah_kelurahan,
        COUNT(DISTINCT tps_data.id)::VARCHAR AS jumlah_tps,
        SUM(tps_data.l) AS total_l,
        SUM(tps_data.p) AS total_p,
        SUM(tps_data.lp) AS total_lp
      FROM
        kpu.kelurahan
      LEFT JOIN kpu.tps_data ON SUBSTR(tps_data.id, 1, 10) = kelurahan.id
      WHERE
        kelurahan.kecamatan_id = ${idKec}
      GROUP BY
      kelurahan.id,
        kelurahan.nama
      ORDER BY
        kelurahan.id,
        kelurahan.nama;
    `;

    // Konversi BigInt ke Number atau String
    const serializedResult = result.map(row => ({
      id: row.id,
      nama_kelurahan: row.nama_kelurahan,
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
