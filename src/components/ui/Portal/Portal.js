import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

function createContainerElement(id, target) {
  const existingContainer = document.getElementById(id)
  if (existingContainer) {
    return existingContainer
  }

  const container = document.createElement('div')
  container.id = id
  target.appendChild(container)
  return container
}

function Portal({ children, id, target }) {
  const [container, setContainer] = useState(false)

  useEffect(() => {
    const element = createContainerElement(id, target)
    requestAnimationFrame(() => setContainer(element))
  }, [id, target])

  if (container) {
    return createPortal(children, container)
  }

  return null
}

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  target: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
}

Portal.defaultProps = {
  target: typeof document !== 'undefined' ? document.body : undefined,
}

export default Portal
