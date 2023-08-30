/* eslint-disable import/no-extraneous-dependencies */
import 'regenerator-runtime/runtime'
import 'jest-canvas-mock'
import 'jest-enzyme'
import { configure } from 'enzyme'

configure({ adapter: new Adapter() })
