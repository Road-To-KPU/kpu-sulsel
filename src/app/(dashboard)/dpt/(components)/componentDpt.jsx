'use client'

import { useState } from 'react'

import DetailRegional from '@views/global/DetailRegional'
import PetaSulsel from '@views/global/PetaSulsel'

export default function ComponentDpt() {
  const [cardActive, setCardActive] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState(null)

  const handleClick = region => {
    setSelectedRegion(region)
    setCardActive(true)
  }

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl font-bold mb-6'>DAFTAR PEMILIH TETAP PROVINSI SULAWESI SELATAN</h1>

      {cardActive && selectedRegion && (
        <DetailRegional
          region={selectedRegion}
          onClose={() => setCardActive(false)}
        />
      )}

      <div className='flex'>
        <PetaSulsel onSelectRegion={handleClick} />
      </div>
    </div>
  )
}
