import { createBrowserRouter } from 'react-router-dom'
import { Main } from './pages/main'
import { Register } from './pages/register'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/saldo-e-extrato',
    element: <Register />,
  },
])
