import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import * as Classes from '../../../common/classes'
import { Row } from '../../../components/ui/Flex'
import withI18nProvider from '../../../hoc/withI18nProvider'
import withResponsive from '../../../hoc/withResponsive'
import ColumnsRenderer from './ColumnsRenderer'
import { PROP_CONTENT } from './Footer.constants'

const Footer = (props) => {
  const {
    bottomContents,
    rightContents,
    bottomRightContents,
    columns,
    mainSectionClassName,
    bottomSectionClassName,
  } = props
  return (
    <>
      <Row className={cx(Classes.PAGE_FOOTER, mainSectionClassName)}>
        <ColumnsRenderer columns={columns} className='wrap' />
        {rightContents && <ColumnsRenderer columns={rightContents} className='right' />}
      </Row>
      <Row className={cx(Classes.PAGE_LOWER_FOOTER, bottomSectionClassName)}>
        <ColumnsRenderer columns={bottomContents} className='wrap' />
        {bottomRightContents && <ColumnsRenderer columns={bottomRightContents} className='right' />}
      </Row>
    </>
  )
}

Footer.propTypes = {
  columns: PropTypes.arrayOf(PROP_CONTENT),
  bottomContents: PropTypes.arrayOf(PROP_CONTENT),
}

Footer.defaultProps = {
  columns: [],
  bottomContents: [],
}

export default withI18nProvider(withResponsive(memo(Footer)))
