import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SnackbarProvider } from 'notistack'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions : {
    queries : {
      staleTime : 10000
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <SnackbarProvider 
      maxSnack={3}  
      autoHideDuration={3000} style={{
          fontSize : '1rem'
      }}
    >
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </SnackbarProvider>
  </QueryClientProvider>
  </React.StrictMode>,
)
