import {Home} from './pages/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import AdminOrUserDashboard from './pages/AdminOrUserDashboard';
import { ProtectedRoute } from './services/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const route = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute />,

    children: [
      {
        path: "",
        element: <AdminOrUserDashboard />,
      }
    ]

  },
])

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={route} />
    </QueryClientProvider>
  )
}

export default App
