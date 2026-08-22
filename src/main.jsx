import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {  createBrowserRouter, RouterProvider } from 'react-router';
import './index.css'
import HomePage from './pages/HomePage';
import TasksPage from './pages/TasksPage';

const router  = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>
  },
  {
    path:"/tasks/:subjectName",
    element:<TasksPage/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
