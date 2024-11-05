import { NextResponse } from 'next/server';

import prisma from '@/libs/prisma';

export async function GET(request) {

  const { searchParams } = new URL(request.url);
  const idKel = searchParams.get('kel_id'); // Mengambil parameter `id_kel`

  if (!idKel) {
    return NextResponse.json({ error: 'Parameter id_kel diperlukan' }, { status: 400 });
  }

  try {
    // Mengambil data kelurahan dan TPS terkait berdasarkan substring 10 karakter pertama dari tps_data.id
    const kelurahanData = await prisma.$queryRaw`
      SELECT
        kelurahan.nama AS nama_kelurahan,
        COUNT(tps_data.id) AS jumlah_tps,
        SUM(tps_data.l) AS total_l,
        SUM(tps_data.p) AS total_p,
        SUM(tps_data.lp) AS total_lp,
        ARRAY_AGG(JSON_BUILD_OBJECT(
          'id', tps_data.id,
          'tps', SUBSTR(tps_data.id, 11), -- Mendapatkan nomor TPS dari karakter 11 ke akhir
          'l', tps_data.l,
          'p', tps_data.p,
          'lp', tps_data.lp
        )) AS list_tps
      FROM
        kpu.kelurahan AS kelurahan
      LEFT JOIN
        kpu.tps_data AS tps_data ON SUBSTR(tps_data.id, 1, 10) = kelurahan.id
      WHERE
        kelurahan.id = ${idKel}
      GROUP BY
        kelurahan.nama;
    `;

    if (!kelurahanData || kelurahanData.length === 0) {
      return NextResponse.json({ error: 'Kelurahan tidak ditemukan' }, { status: 404 });
    }

    // Mengubah hasil query agar sesuai dengan struktur JSON yang diinginkan
    const response = {
      nama_kelurahan: kelurahanData[0].nama_kelurahan,
      jumlah_tps: Number(kelurahanData[0].jumlah_tps),
      total_l: kelurahanData[0].total_l ? Number(kelurahanData[0].total_l) : 0,
      total_p: kelurahanData[0].total_p ? Number(kelurahanData[0].total_p) : 0,
      total_lp: kelurahanData[0].total_lp ? Number(kelurahanData[0].total_lp) : 0,
      list_tps: kelurahanData[0].list_tps.map(tps => ({
        id: tps.id,
        tps: tps.tps, // Menampilkan nomor TPS
        l: tps.l,
        p: tps.p,
        lp: tps.lp,
      })),
    };

    return NextResponse.json(response);
  } catch (e) {
    console.error(e);

    return NextResponse.json({ error: 'Terjadi kesalahan saat mengambil data' }, { status: 500 });
  }
}
