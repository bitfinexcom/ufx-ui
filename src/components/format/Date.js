import PropTypes from 'prop-types'

import { pad2 } from '../../functions/format'
import { useStore } from '../../store'
import { applyTimeZoneOffset } from '../../utils/time'

const DateComponent = (props) => {
  const { mts } = props
  const { timezoneOffset: offset, timeFormat: format } = useStore()

  const date = applyTimeZoneOffset(new Date(mts), offset)
  const DD = pad2(date.getDate())
  const MM = pad2(date.getMonth() + 1)
  const YY = pad2(date.getFullYear()).toString().substr(-2)

  switch (format) {
    case 'YY-MM-DD HH:mm:ss': {
      return `${YY}-${MM}-${DD}`
    }
    case 'MM-DD-YY HH:mm:ss': {
      return `${MM}-${DD}-${YY}`
    }
    case 'DD-MM-YY HH:mm:ss': {
      return `${DD}-${MM}-${YY}`
    }
    default: {
      return date.toLocaleDateString()
    }
  }
}

DateComponent.propTypes = {
  mts: PropTypes.number.isRequired,
}

export default DateComponent
