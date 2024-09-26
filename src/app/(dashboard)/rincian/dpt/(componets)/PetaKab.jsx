import { usePathname } from 'next/navigation'

import PetaKabupaten from '@views/global/PetaKabupaten'
import { getImageByPathName } from '@/utils/imageMapper'

export default function PetaKab() {

  const path = usePathname().split('/').pop()
  const image = getImageByPathName(path)


  return <PetaKabupaten src={image} />
}
