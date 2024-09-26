'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardContent'
import CardContent from '@mui/material/CardContent'

import { useChartOptions } from '@configs/diagramDonatConfig'
import ApexComponent from '@/app/(dashboard)/rincian/dpt/(componets)/ApexComponent'


// Data Chart
const deliveryExceptionsChartSeries = [60, 40]

const ComponentJenisKelamin = () => {

  const chartOptions = useChartOptions()

  return (
    <Card className='bs-full bg-orange-800'>
      <CardHeader
        title='Jenis Kelamin'
        sx={{
          '& .MuiCardHeader-title': {
            color: 'white'
          }
        }}
      />
      <CardContent>
        <ApexComponent
          series={deliveryExceptionsChartSeries}
          options={chartOptions}
        />
      </CardContent>
    </Card>
  )
}

export default ComponentJenisKelamin
