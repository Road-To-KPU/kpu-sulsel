import ComponentJenisKelamin from '@/app/(dashboard)/home/(component)/ComponentJenisKelamin'
import ComponentMenu from '@/app/(dashboard)/home/(component)/ComponentMenu'
import KlasifikasiUsiaPemilih from '@/app/(dashboard)/home/(component)/KlasifikasiUsiaPemilih'
import PemilihDisabilitas from '@/app/(dashboard)/home/(component)/PemilihDisabilitas'


export default function HomeComponents() {
  return (
    <div>
      <div className='my-3'>
        <ComponentMenu />
      </div>
      <div className='flex justify-between flex-wrap my-10'>
        <div className='w-full md:w-[30%] mb-4 md:mb-0'>
          <ComponentJenisKelamin />
        </div>
        <div className='w-full md:w-[33%] mb-4 md:mb-0'>
          <KlasifikasiUsiaPemilih />
        </div>
        <div className='w-full md:w-[33%]'>
          <PemilihDisabilitas />
        </div>
      </div>
    </div>
  )
}
