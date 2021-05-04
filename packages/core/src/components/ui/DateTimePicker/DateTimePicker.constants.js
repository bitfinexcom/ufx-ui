export const TIME_FORMAT = 'HH:mm'

export const DATE_FORMAT_OPTIONS = {
  'DD-MM-YY HH:mm:ss': {
    DATE_FORMAT: 'dd-MM-yyyy HH:mm:ss',
    INPUT_MASK: ['d', 'd', 'M', 'M', 'y', 'y', 'y', 'y', 'H', 'H', 'm', 'm', 's', 's'],
    INPUT_FORMAT: '##-##-#### ##:##:##',
  },
  'MM-DD-YY HH:mm:ss': {
    DATE_FORMAT: 'MM-dd-yyyy HH:mm:ss',
    INPUT_MASK: ['M', 'M', 'd', 'd', 'y', 'y', 'y', 'y', 'H', 'H', 'm', 'm', 's', 's'],
    INPUT_FORMAT: '##-##-#### ##:##:##',
  },
  'YY-MM-DD HH:mm:ss': {
    DATE_FORMAT: 'yyyy-MM-dd HH:mm:ss',
    INPUT_MASK: ['y', 'y', 'y', 'y', 'M', 'M', 'd', 'd', 'H', 'H', 'm', 'm', 's', 's'],
    INPUT_FORMAT: '####-##-## ##:##:##',
  },
}
