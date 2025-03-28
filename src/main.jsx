import ReactDOM from 'react-dom/client';
import { store } from '@/store/store.js'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from '@/pages/Auth/Login.jsx'
import UsersListPage from '@/pages/Users/UsersListPage.jsx'
import EditUserPage from '@/pages/Users/EditUserPage.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <UsersListPage />
      },
      {
        path: '/users',
        element: <UsersListPage />
      },
      {
        path: '/users/edit/:id',
        element: <EditUserPage />
      },
      {
        path: '/auth/login',
        element: <LoginPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <RouterProvider router={router} />
  </Provider>
);