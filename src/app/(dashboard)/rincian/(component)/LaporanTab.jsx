'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { useTheme } from '@mui/material/styles'

import primaryColorConfig from '@configs/primaryColorConfig'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const renderTabPanels = (value, theme, options, colors, tabData) => {
  return tabData.map((item, index) => {
    const max = Math.max(...item.series[0].data)
    const seriesIndex = item.series[0].data.indexOf(max)
    const finalColors = colors.map((color, i) => (seriesIndex === i ? 'var(--mui-palette-primary-main)' : color))

    return (
      <TabPanel key={index} value={item.type} className='!p-0'>
        <AppReactApexCharts
          type='bar'
          height={285}
          width='100%'
          options={{ ...options, colors: finalColors }}
          series={item.series}
        />
      </TabPanel>
    )
  })
}

const LaporanTab = ({ categories, title, multiplier, tabData }) => {
  // States
  const [value, setValue] = useState('orders')

  // Hooks
  const theme = useTheme()

  // Vars
  const disabledText = 'white'
  const colors = [primaryColorConfig[0].light, primaryColorConfig[0].dark]

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        distributed: true,
        columnWidth: '70%', // Perbesar hanya lebar batang statistik
        borderRadiusApplication: 'end',
        dataLabels: { position: 'top' }
      }
    },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: {
      offsetY: -20,
      formatter: val => {
        if (val >= 1000000) {
          return `${(val / 1000000).toFixed(2)}M`
        } else if (val >= 1000) {
          return `${(val / 1000).toFixed(2)}k`
        }

        return `${val}`
      },
      style: {
        fontWeight: 500,
        colors: ['white'],
        fontSize: 11
      }
    },
    colors,
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    grid: {
      show: false,
      padding: {
        top: -19,
        left: -4,
        right: 0,
        bottom: -11
      }
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { color: 'var(--mui-palette-divider)' },
      categories: categories,
      labels: {
        style: {
          colors: disabledText,
          fontFamily: theme.typography.fontFamily,
          fontSize: '11px'
        }
      }
    },
    yaxis: {
      labels: {
        offsetX: -18,
        formatter: val => {
          if (val >= 1000000) {
            return `${(val / 1000000).toFixed(2)}M`
          } else if (val >= 1000) {
            return `${(val / 1000).toFixed(2)}k`
          }

          return `${val}`
        },
        style: {
          colors: disabledText,
          fontFamily: theme.typography.fontFamily,
          fontSize: '11px'
        }
      }
    }
  }

  return (
    <Card className='bg-orange-800'>
      <CardHeader
        title={title}
        sx={{
          '& .MuiCardHeader-title': {
            color: 'white'
          }
        }}
      />
      <CardContent>
        <TabContext value={value}>{renderTabPanels(value, theme, options, colors, tabData)}</TabContext>
      </CardContent>
    </Card>
  )
}

export default LaporanTab
