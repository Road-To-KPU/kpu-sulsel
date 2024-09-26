import dynamic from 'next/dynamic'

const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const ApexComponent = ({ series, options }) => {
  return (
    <AppReactApexCharts
      type='donut'
      height={300}
      width='100%'
      series={series}
      options={options}
    />
  )
}

export default ApexComponent
