import { pad2, applyTimeZoneOffset } from '@ufx-ui/utils'
import PropTypes from 'prop-types'

import { useStore } from '../../store'

const Time = (props) => {
  const { mts, hideSeconds } = props
  const { timezoneOffset: offset } = useStore()

  const date = applyTimeZoneOffset(new Date(mts), offset)
  const HH = pad2(date.getHours())
  const MM = pad2(date.getMinutes())
  const SS = (hideSeconds)
    ? []
    : pad2(date.getSeconds())

  const timeParts = [HH, MM].concat(SS)

  return timeParts.join(':')
}

Time.propTypes = {
  mts: PropTypes.number,
  hideSeconds: PropTypes.bool,
}

Time.defaultProps = {
  hideSeconds: false,
}

export default Time
