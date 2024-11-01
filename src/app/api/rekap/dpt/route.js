import { NextResponse } from 'next/server';

import prisma from '@/libs/prisma';

export async function GET() {
  try {
    // Mengambil data kabupaten
    const kabupatenData = await prisma.kabupaten.findMany({
      select: {
        id: true,
        nama: true,
      },
    });

    // Mengambil data kecamatan
    const kecamatanData = await prisma.kecamatan.findMany({
      select: {
        id: true,
        nama: true,
        kab_id: true,
      },
    });

    // Mengambil data kelurahan
    const kelurahanData = await prisma.kelurahan.findMany({
      select: {
        id: true,
        nama: true,
        kecamatan_id: true,
      },
    });

    const tpsData = await prisma.tps_data.findMany({
      select: {
        id_kelurahan: true,
        l: true,
        p: true,
        tps: true,
        kelurahan: {
          select: {
            id: true,
            nama: true,
            kecamatan: {
              select: {
                id: true,
                nama: true,
                kabupaten: {
                  select: {
                    id: true,
                    nama: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    tpsData.forEach((item) => {
      item.kelurahan_id = item.kelurahan.id;
      item.nama_kelurahan = item.kelurahan.nama;
      item.kecamatan_id = item.kelurahan.kecamatan.id;
      item.nama_kecamatan = item.kelurahan.kecamatan.nama;
      item.kabupaten_id = item.kelurahan.kecamatan.kabupaten.id;
      item.nama_kabupaten = item.kelurahan.kecamatan.kabupaten.nama;
    });

    // Membuat rekap kabupaten
    const rekapKabupatenMap = {};

    tpsData.forEach((item) => {
      const kabupatenId = item.kabupaten_id;

      if (!rekapKabupatenMap[kabupatenId]) {
        rekapKabupatenMap[kabupatenId] = {
          id: kabupatenId,
          nama_kabupaten: item.nama_kabupaten,
          tps: 0,
          l: 0,
          p: 0,
        };
      }

      rekapKabupatenMap[kabupatenId].tps += item.tps || 0;
      rekapKabupatenMap[kabupatenId].l += item.l || 0;
      rekapKabupatenMap[kabupatenId].p += item.p || 0;
    });

    const rekap_kabupaten = Object.values(rekapKabupatenMap).map((item) => ({
      ...item,
      lp: item.l + item.p,
    }));

    // Membuat rekap kecamatan
    const rekapKecamatanMap = {};

    tpsData.forEach((item) => {
      const kecamatanId = item.kecamatan_id;

      if (!rekapKecamatanMap[kecamatanId]) {
        rekapKecamatanMap[kecamatanId] = {
          id: kecamatanId,
          nama_kecamatan: item.nama_kecamatan,
          tps: 0,
          l: 0,
          p: 0,
        };
      }

      rekapKecamatanMap[kecamatanId].tps += item.tps || 0;
      rekapKecamatanMap[kecamatanId].l += item.l || 0;
      rekapKecamatanMap[kecamatanId].p += item.p || 0;
    });

    const rekap_kecamatan = Object.values(rekapKecamatanMap).map((item) => ({
      ...item,
      lp: item.l + item.p,
    }));

    // Membuat rekap kelurahan
    const rekapKelurahanMap = {};

    tpsData.forEach((item) => {
      const kelurahanId = item.kelurahan_id;

      if (!rekapKelurahanMap[kelurahanId]) {
        rekapKelurahanMap[kelurahanId] = {
          id: kelurahanId,
          nama_kelurahan: item.nama_kelurahan,
          tps: 0,
          l: 0,
          p: 0,
        };
      }

      rekapKelurahanMap[kelurahanId].tps += item.tps || 0;
      rekapKelurahanMap[kelurahanId].l += item.l || 0;
      rekapKelurahanMap[kelurahanId].p += item.p || 0;
    });

    const rekap_kelurahan = Object.values(rekapKelurahanMap).map((item) => ({
      ...item,
      lp: item.l + item.p,
    }));

    // Membuat summary kabupaten
    const kabupatenSummaries = kabupatenData.map((kabupaten) => {
      const filteredTps = tpsData.filter(
        (item) => item.kabupaten_id === kabupaten.id
      );

      const jumlahKecamatan = new Set(
        filteredTps.map((item) => item.kecamatan_id)
      ).size;

      const jumlahKelurahan = new Set(
        filteredTps.map((item) => item.kelurahan_id)
      ).size;

      const totalTPS = filteredTps.reduce((acc, item) => acc + (item.tps || 0), 0);
      const totalL = filteredTps.reduce((acc, item) => acc + (item.l || 0), 0);
      const totalP = filteredTps.reduce((acc, item) => acc + (item.p || 0), 0);
      const totalLP = totalL + totalP;

      return {
        name: kabupaten.nama,
        jumlah_kecamatan: jumlahKecamatan,
        jumlah_kelurahan: jumlahKelurahan,
        tps: totalTPS,
        l: totalL,
        p: totalP,
        lp: totalLP,
      };
    });

    // Membuat summary kecamatan
    const kecamatanSummaries = kecamatanData.map((kecamatan) => {
      const filteredTps = tpsData.filter(
        (item) => item.kecamatan_id === kecamatan.id
      );

      const jumlahKelurahan = new Set(
        filteredTps.map((item) => item.kelurahan_id)
      ).size;

      const totalTPS = filteredTps.reduce((acc, item) => acc + (item.tps || 0), 0);
      const totalL = filteredTps.reduce((acc, item) => acc + (item.l || 0), 0);
      const totalP = filteredTps.reduce((acc, item) => acc + (item.p || 0), 0);
      const totalLP = totalL + totalP;

      return {
        name: kecamatan.nama,
        jumlah_kelurahan: jumlahKelurahan,
        tps: totalTPS,
        l: totalL,
        p: totalP,
        lp: totalLP,
      };
    });

    // Membuat summary kelurahan
    const kelurahanSummaries = kelurahanData.map((kelurahan) => {
      const filteredTps = tpsData.filter(
        (item) => item.kelurahan_id === kelurahan.id
      );

      const totalTPS = filteredTps.reduce((acc, item) => acc + (item.tps || 0), 0);
      const totalL = filteredTps.reduce((acc, item) => acc + (item.l || 0), 0);
      const totalP = filteredTps.reduce((acc, item) => acc + (item.p || 0), 0);
      const totalLP = totalL + totalP;

      return {
        name: kelurahan.nama,
        tps: totalTPS,
        l: totalL,
        p: totalP,
        lp: totalLP,
      };
    });

    const result = {
      rekap_kabupaten,
      rekap_kecamatan,
      rekap_kelurahan,
      kabupaten_summaries: kabupatenSummaries,
      kecamatan_summaries: kecamatanSummaries,
      kelurahan_summaries: kelurahanSummaries,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error)

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
