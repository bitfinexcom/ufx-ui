import types from '../constants/currencies.constants'
import conversionsReducer, { INITIAL_STATE } from './conversions.reducer'

describe('REDUCER: conversions', () => {
  describe('action: REQUEST_CONVERSIONS_SUCCESS', () => {
    it('full payload', () => {
      const action = {
        type: types.REQUEST_CONVERSIONS_SUCCESS,
        payload: [[['LBT', [['BTC', 1]]], ['BTC', [['LBT', 1], ['LNX', 1], ['PBTCEOS', 1], ['PBTCETH', 1], ['BTCF0', 1]]], ['BTCF0', [['BTC', 1]]], ['LEO', [['LET', 1], ['LES', 1]]], ['LES', [['LEO', 1]]], ['LET', [['LEO', 1]]], ['UST', [['USTF0', 1]]], ['USTF0', [['UST', 1]]], ['LNX', [['BTC', 1]]], ['TESTUSDT', [['TESTUSDTF0', 1]]], ['TESTUSDTF0', [['TESTUSDT', 1]]], ['PBTCEOS', [['BTC', 1]]], ['PBTCETH', [['BTC', 1]]], ['PLTCEOS', [['LTC', 1]]], ['PLTCETH', [['LTC', 1]]], ['LTC', [['PLTCEOS', 1], ['PLTCETH', 1]]], ['PETHEOS', [['ETH', 1]]], ['ETH', [['PETHEOS', 1], ['ETH2P', 1]]], ['MKR', [['PMKREOS', 1]]], ['PMKREOS', [['MKR', 1]]], ['LINK', [['PLINKEOS', 1]]], ['PLINKEOS', [['LINK', 1]]], ['PYFIEOS', [['YFI', 1]]], ['YFI', [['PYFIEOS', 1]]], ['EDO', [['PPNTEOS', 1]]], ['PPNTEOS', [['EDO', 1]]], ['PUNIEOS', [['UNI', 1]]], ['UNI', [['PUNIEOS', 1]]], ['PBANDEOS', [['BAND', 1]]], ['BAND', [['PBANDEOS', 1]]], ['PBALEOS', [['BAL', 1]]], ['BAL', [['PBALEOS', 1]]], ['PSNXEOS', [['SNX', 1]]], ['SNX', [['PSNXEOS', 1]]], ['PCOMPEOS', [['COMP', 1]]], ['COMP', [['PCOMPEOS', 1]]], ['POMGEOS', [['OMG', 1]]], ['OMG', [['POMGEOS', 1]]], ['PDAIEOS', [['DAI', 1]]], ['DAI', [['PDAIEOS', 1]]], ['PANTEOS', [['ANT', 1]]], ['ANT', [['PANTEOS', 1]]], ['PLRCEOS', [['LRC', 1]]], ['LRC', [['PLRCEOS', 1]]], ['PBATEOS', [['BAT', 1]]], ['BAT', [['PBATEOS', 1]]], ['PREPEOS', [['REP', 1]]], ['REP', [['PREPEOS', 1]]], ['PPNKEOS', [['PNK', 1]]], ['PNK', [['PPNKEOS', 1]]], ['PUOSEOS', [['UOS', 1]]], ['UOS', [['PUOSEOS', 1]]], ['PZRXEOS', [['ZRX', 1]]], ['ZRX', [['PZRXEOS', 1]]], ['DOG', [['DOGE', 1000000]]], ['EXRD', [['XRD', 1]]], ['XRD', [['EXRD', 1]]]]],
      }
      expect(conversionsReducer(INITIAL_STATE, action)).toEqual({
        ...INITIAL_STATE,
        conversions: {
          LBT: { BTC: 1 },
          BTC: {
            LBT: 1, LNX: 1, PBTCEOS: 1, PBTCETH: 1, BTCF0: 1,
          },
          BTCF0: { BTC: 1 },
          LEO: { LET: 1, LES: 1 },
          LES: { LEO: 1 },
          LET: { LEO: 1 },
          UST: { USTF0: 1 },
          USTF0: { UST: 1 },
          LNX: { BTC: 1 },
          TESTUSDT: { TESTUSDTF0: 1 },
          TESTUSDTF0: { TESTUSDT: 1 },
          PBTCEOS: { BTC: 1 },
          PBTCETH: { BTC: 1 },
          PLTCEOS: { LTC: 1 },
          PLTCETH: { LTC: 1 },
          LTC: { PLTCEOS: 1, PLTCETH: 1 },
          PETHEOS: { ETH: 1 },
          ETH: { PETHEOS: 1, ETH2P: 1 },
          MKR: { PMKREOS: 1 },
          PMKREOS: { MKR: 1 },
          LINK: { PLINKEOS: 1 },
          PLINKEOS: { LINK: 1 },
          PYFIEOS: { YFI: 1 },
          YFI: { PYFIEOS: 1 },
          EDO: { PPNTEOS: 1 },
          PPNTEOS: { EDO: 1 },
          PUNIEOS: { UNI: 1 },
          UNI: { PUNIEOS: 1 },
          PBANDEOS: { BAND: 1 },
          BAND: { PBANDEOS: 1 },
          PBALEOS: { BAL: 1 },
          BAL: { PBALEOS: 1 },
          PSNXEOS: { SNX: 1 },
          SNX: { PSNXEOS: 1 },
          PCOMPEOS: { COMP: 1 },
          COMP: { PCOMPEOS: 1 },
          POMGEOS: { OMG: 1 },
          OMG: { POMGEOS: 1 },
          PDAIEOS: { DAI: 1 },
          DAI: { PDAIEOS: 1 },
          PANTEOS: { ANT: 1 },
          ANT: { PANTEOS: 1 },
          PLRCEOS: { LRC: 1 },
          LRC: { PLRCEOS: 1 },
          PBATEOS: { BAT: 1 },
          BAT: { PBATEOS: 1 },
          PREPEOS: { REP: 1 },
          REP: { PREPEOS: 1 },
          PPNKEOS: { PNK: 1 },
          PNK: { PPNKEOS: 1 },
          PUOSEOS: { UOS: 1 },
          UOS: { PUOSEOS: 1 },
          PZRXEOS: { ZRX: 1 },
          ZRX: { PZRXEOS: 1 },
          DOG: { DOGE: 1000000 },
          EXRD: { XRD: 1 },
          XRD: { EXRD: 1 },
        },
      })
    })
    it('empty payload', () => {
      const action = {
        type: types.REQUEST_CONVERSIONS_SUCCESS,
        payload: null,
      }
      expect(conversionsReducer(INITIAL_STATE, action)).toEqual(INITIAL_STATE)
    })
  })
})
