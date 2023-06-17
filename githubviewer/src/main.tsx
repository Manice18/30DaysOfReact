import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider,extendTheme, ColorModeScript } from '@chakra-ui/react'
import './index.css'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: 'false'
};
const theme = extendTheme({ config })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
