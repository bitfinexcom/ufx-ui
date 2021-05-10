import React from 'react'

import TokenIcon from './TokenList.Icon'

export default (key, value) => {
  if (!value) {
    return false
  }

  return (
    <div className='tokenlist-renderer'>
      <TokenIcon icon={key} />
      <div>
        {value}
      </div>
    </div>
  )
}
