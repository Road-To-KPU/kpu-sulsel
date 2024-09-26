
import Box from '@mui/material/Box'

import CardStatHorizontal from './CardStatHorizontal'

export default function CardMenu({ data }){
  return (
    <Box
      sx={{
        overflowX: 'auto',
        display: 'flex',
        gap: 2,
        paddingY: 2,
        flexDirection: { xs: 'column', sm: 'row' },
        '::-webkit-scrollbar': {
          height: '1px'
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1'
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
          borderRadius: '10px'
        },
        '::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#555'
        }
      }}
    >
      {data.map((item, index) => (
        <Box
          key={index}
          sx={{
            flex: { xs: '0 0 100%', sm: '0 0 25%' },
            maxWidth: { xs: '100%', sm: '25%' }
          }}
        >
          <CardStatHorizontal {...item} />
        </Box>
      ))}
    </Box>
  )
}
