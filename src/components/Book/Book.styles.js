export const bar = {
  svg: (size, barDirection) => ({
    width: '100%',
    height: `${size}px`,
    transform: `scale(${barDirection})`,
    zIndex: 0,
    pointerEvents: 'none',
  }),
}

export const size = {
  XS: {
    width: 15,
    minWidth: 15,
    maxWidth: 15,
    textAlign: 'center',
    padding: 0,
  },
  S: {
    width: 40,
    minWidth: 40,
    maxWidth: 40,
    textAlign: 'center',
  },
  M: {
    width: 65,
    minWidth: 65,
    maxWidth: 65,
  },
  L: {
    minWidth: '25%',
  },
}
