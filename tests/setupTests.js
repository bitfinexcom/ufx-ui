/* eslint-disable import/no-extraneous-dependencies */
import 'regenerator-runtime/runtime'
import 'jest-canvas-mock'
import 'jest-enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
