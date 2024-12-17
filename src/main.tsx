import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Quiz from "./Quiz.tsx";
import Question from "./Question.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/quiz",
        element: <Quiz/>,
        children: [
            {
                path: '/quiz/:id',
                element: <Question/>
            }
        ]
    },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
