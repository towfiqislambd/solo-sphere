import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './components/Root';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import AuthProvider from './components/AuthProvider';
import Registration from './components/Registration';
import Login from './components/Login';
import AddJobs from './components/AddJobs';
import AllJobs from './components/AllJobs';
import Details from './components/Details';
import MyPostedJobs from './components/MyPostedJobs';
import MyBids from './components/MyBids';
import ViewApplications from './components/ViewApplications';
import PrivateRoutes from './components/PrivateRoutes';
import BidRequests from './components/BidRequests';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Registration></Registration>
      },
      {
        path: "/all-jobs",
        element: <AllJobs></AllJobs>
      },
      {
        path: "/add-job",
        element: <PrivateRoutes><AddJobs></AddJobs></PrivateRoutes>
      },
      {
        path: "/jobs/details/:id",
        element: <PrivateRoutes><Details></Details></PrivateRoutes>
      },
      {
        path: "/jobs/viewApplications/:job_id",
        loader: ({ params }) => fetch(`https://solo-sphere-iota.vercel.app/jobs/viewApplications/${params.job_id}`),
        element: <PrivateRoutes><ViewApplications></ViewApplications></PrivateRoutes>
      },
      {
        path: "/myPostedJobs",
        element: <PrivateRoutes><MyPostedJobs></MyPostedJobs></PrivateRoutes>
      },
      {
        path: "/myBids/:email",
        element: <PrivateRoutes><MyBids></MyBids></PrivateRoutes>
      },
      {
        path: "/bidRequests/:email",
        element: <PrivateRoutes><BidRequests></BidRequests></PrivateRoutes>
      },
    ]
  }
])

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
