import { NextResponse } from 'next/server';

import prisma from '@/libs/prisma';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const idKab = searchParams.get('kab_id');

  if (!idKab) {
    return NextResponse.json({ error: 'Parameter id_kab diperlukan' }, { status: 400 });
  }

  try {
    // Query untuk kecamatan, kelurahan, dan total TPS
    const result = await prisma.$queryRaw`
      SELECT
        kecamatan.id,
        kecamatan.nama AS nama_kecamatan,
        COUNT(DISTINCT kelurahan.id)::VARCHAR AS jumlah_kelurahan,
        COUNT(DISTINCT tps_data.id) AS total_tps,
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
        kecamatan.id,
        kecamatan.nama
      ORDER BY
       kecamatan.id,
        kecamatan.nama;
    `;

    const dataUsia = await prisma.klasifikasi_usia.findUnique({
      where: {
        kab_id: idKab
      },
    });

    const dataDisabilitas = await prisma.disabilitas.findUnique({
      where: {
        kab_id: idKab
      },
    });

    const serializedResult = result.map(row => ({
      id: row.id,
      nama_kecamatan: row.nama_kecamatan,
      jumlah_kecamatan: row.jumlah_kecamatan,
      jumlah_kelurahan: row.jumlah_kelurahan,
      total_tps: row.total_tps ? Number(row.total_tps) : null,
      total_l: row.total_l ? Number(row.total_l) : null,
      total_p: row.total_p ? Number(row.total_p) : null,
      total_lp: row.total_lp ? Number(row.total_lp) : null,
    }));

    const serializedSummary = {
      total_tps: result.reduce((acc, row) => acc + (row.total_tps ? Number(row.total_tps) : 0), 0),
      total_l: result.reduce((acc, row) => acc + (row.total_l ? Number(row.total_l) : 0), 0),
      total_p: result.reduce((acc, row) => acc + (row.total_p ? Number(row.total_p) : 0), 0),
      total_lp: result.reduce((acc, row) => acc + (row.total_lp ? Number(row.total_lp) : 0), 0),
      ...dataUsia,
      ...dataDisabilitas,
    };

    return NextResponse.json({ kecamatanData: serializedResult, summary: serializedSummary });
  } catch (e) {
    console.error(e);

    return NextResponse.json({ error: 'Terjadi kesalahan saat mengambil data' }, { status: 500 });
  }
}
