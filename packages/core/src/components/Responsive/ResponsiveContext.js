import { createContext, useContext } from 'react'

const initialState = { isMobile: false }

const ResponsiveContext = createContext(initialState)

export const ResponsiveState = () => useContext(ResponsiveContext)

export default ResponsiveContext
