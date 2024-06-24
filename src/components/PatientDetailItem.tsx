type PatientDetailItemProps = {
  label: string
  data: string
}

export default function PatientDetailItem({label, data}: PatientDetailItemProps) {

  if(label === 'ID') {
    return (
      <p className='font-normal mb-1 text-gray-700 uppercase text-xs text-right'>
        {`${label}: ${data}`}
      </p>
    )
  }

  return (
    <p className=' font-bold mb-3 text-gray-700 uppercase'>
      {label}: {''} <span className='font-normal normal-case'>{data}</span>
    </p>
  )
}
