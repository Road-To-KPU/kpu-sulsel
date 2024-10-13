'use client'

// React Imports
import { forwardRef } from 'react'

// MUI Imports
import MuiAvatar from '@mui/material/Avatar'
import { lighten, styled } from '@mui/material/styles'

import primaryColorConfig from '@configs/primaryColorConfig'

const Avatar = styled(MuiAvatar)(({ skin, color, size, theme }) => {
  return {
    ...(color &&
      skin === 'light' && {
        // backgroundColor: `var(--mui-palette-${color}-lightOpacity)`,
        // color: `var(--mui-palette-${color}-main)`
        backgroundColor: '#E57611',
        color: primaryColorConfig[1].dark
      }),
    ...(color &&
      skin === 'light-static' && {
        backgroundColor: lighten(theme.palette[color].main, 0.84),
        color: `var(--mui-palette-${color}-main)`
      }),
    ...(color &&
      skin === 'filled' && {
        backgroundColor: `var(--mui-palette-${color}-main)`,
        color: `var(--mui-palette-${color}-contrastText)`
      }),
    ...(size && {
      height: size,
      width: size
    })
  }
})

const CustomAvatar = forwardRef((props, ref) => {
  // Props
  const { color, skin = 'filled', ...rest } = props

  return <Avatar color={color} skin={skin} ref={ref} {...rest} />
})

export default CustomAvatar
