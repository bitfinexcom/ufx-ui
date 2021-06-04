import PropTypes from 'prop-types'

const PROP_DROPDOWN = {
  type: PropTypes.string,
  options: PropTypes.shape(),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
}

const PROP_JSX = {
  type: PropTypes.string,
  Component: PropTypes.node,
}

const PROP_IMAGE = {
  type: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
}

const PROP_LINK = {
  type: PropTypes.string,
  label: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
  disabled: PropTypes.bool,
}

const PROP_TEXT = {
  type: PropTypes.string,
  label: PropTypes.string,
}

export const PROP_ROW = PropTypes.oneOfType([
  PropTypes.shape(PROP_IMAGE),
  PropTypes.shape(PROP_TEXT),
  PropTypes.shape(PROP_LINK),
  PropTypes.shape(PROP_DROPDOWN),
  PropTypes.shape(PROP_JSX),
])

export const PROP_CONTENT = PropTypes.arrayOf(PROP_ROW)

export const TYPES = {
  JSX: 'jsx',
  TEXT: 'text',
  TEXT_LINK: 'text_link',
  TITLE: 'title',
  IMAGE: 'image',
  IMAGE_LINK: 'image_link',
  DROPDOWN: 'dropdown',
}
/*
  JSX: REACT COMPONENT
  TEXT: {
      label: STRING,
      disabled: BOOL hides/shows the link
  }
  TEXT_LINK: {
    label: STRING,
    href: STRING ,
    target: ONE OF TYPE [_self, _blank]
    disabled: BOOL hides/shows the link
  }
  TITLE: {
    title: STRING
  }
  IMAGE: {
    src: STRING,
    alt: STRING,
  },
  IMAGE_LINK: {
    src: STRING,
    alt: STRING,
    href: STRING,
  },
  DROPDOWN: {
    options: {
      STRING: STRING,
    },
    value: STRING,
    onChange: FUNCTION,
  },
*/
