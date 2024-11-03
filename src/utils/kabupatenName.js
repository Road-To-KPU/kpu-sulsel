const kabupaten = {
  7301: 'Selayar',
  7302: 'Bulukumba',
  7303: 'Bantaeng',
  7304: 'Jeneponto',
  7305: 'Takalar',
  7306: 'Gowa',
  7307: 'Sinjai',
  7308: 'Bone',
  7309: 'Maros',
  7310: 'Pangkajene Kepulauan',
  7311: 'Barru',
  7312: 'Soppeng',
  7313: 'Wajo',
  7314: 'Sidrap',
  7315: 'Pinrang',
  7316: 'Enrekang',
  7317: 'Luwu',
  7318: 'Tana Toraja',
  7322: 'Luwu Utara',
  7324: 'Luwu Timur',
  7326: 'Toraja Utara',
  7371: 'Makassar',
  7372: 'Pare Pare',
  7373: 'Palopo'
}

export default function getKabupatenName(id) {
  return kabupaten[id] || null
}
