/* eslint-disable import/prefer-default-export */
export const movements = [{
  id: 1357746, currency: 'XAUT', mts_start: 1610046547000, status: 'CANCELED', amount: -0.0499, type: 'Withdraw',
}, {
  id: 1357745, currency: 'XAUT', mts_start: 1610046471000, status: 'CANCELED', amount: -0.0499, type: 'Withdraw',
}, {
  id: 1357744, currency: 'BTC', mts_start: 1610046298000, status: 'PENDING REVIEW', amount: -0.039001, type: 'Withdraw',
}, {
  id: 1351438, currency: 'USD', mts_start: 1587581134000, status: 'CANCELED', amount: 12121212, type: 'Deposit',
}, {
  id: 1351434, currency: 'USD', mts_start: 1587558606000, status: 'CANCELED', amount: 10000, type: 'Deposit',
}]

export const rowMapping = {
  date: { selector: 'mts_start' },
}
