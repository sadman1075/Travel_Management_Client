import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Routes/index.tsx'
import { ThemeProvider } from './Providers/theme.provider.tsx'
import { Toaster } from 'react-hot-toast';

import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router}>
        </RouterProvider>
      </ThemeProvider>
    </Provider>
    <Toaster />
  </StrictMode>
)
