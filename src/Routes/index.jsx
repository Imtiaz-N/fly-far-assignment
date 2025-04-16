import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import FlightResults from '../components/FlightResults'
import Main from '../layout/Main'
import ErrorPage from '../Pages/Error'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/flight-results',
        element: <FlightResults />,
      },
    ],
  },
])

export default router
