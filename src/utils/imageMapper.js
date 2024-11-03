import luwuUtara from '../../public/images/peta/luwu_utara.png'
import bantaeng from '../../public/images/peta/bantaeng.png'
import barru from '../../public/images/peta/barru.png'
import bone from '../../public/images/peta/bone.png'
import bulukumba from '../../public/images/peta/bulukumba.png'
import enrekang from '../../public/images/peta/enrekang.png'
import luwu from '../../public/images/peta/luwu.png'
import luwuTimur from '../../public/images/peta/luwu_timur.png'
import maros from '../../public/images/peta/maros.png'
import pangkep from '../../public/images/peta/pangkep.png'
import parepare from '../../public/images/peta/parepare.png'
import pinrang from '../../public/images/peta/pinrang.png'
import selayar from '../../public/images/peta/selayar.png'
import sidrap from '../../public/images/peta/sidrap.png'
import soppeng from '../../public/images/peta/soppeng.png'
import takalar from '../../public/images/peta/takalar.png'
import tanaToraja from '../../public/images/peta/tana_toraja.png'
import torajaUtara from '../../public/images/peta/toraja_utara.png'
import wajo from '../../public/images/peta/wajo.png'
import makassar from '../../public/images/peta/makassar.png'
import gowa from '../../public/images/peta/gowa.png'
import sinjai from '../../public/images/peta/sinjai.png'
import jeneponto from '../../public/images/peta/Jeneponto.png'
import palopo from '../../public/images/peta/palopo.png'

const imageMap = {
  7301: selayar,
  7302: bulukumba,
  7303: bantaeng,
  7304: jeneponto,
  7305: takalar,
  7306: gowa,
  7307: sinjai,
  7308: bone,
  7309: maros,
  7310: pangkep,
  7311: barru,
  7312: soppeng,
  7313: wajo,
  7314: sidrap,
  7315: pinrang,
  7316: enrekang,
  7317: luwu,
  7318: tanaToraja,
  7322: luwuUtara,
  7324: luwuTimur,
  7326: torajaUtara,
  7371: makassar,
  7372: parepare,
  7373: palopo
}

export function getImageByPathName(id) {
  return imageMap[id] || null
}
