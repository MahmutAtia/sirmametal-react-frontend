import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import React from 'react';

// Layouts
import MiniDrawer from './layouts/mainLayout';
import Root from './layouts/authLayout';



// Auth Pages
import Login from './pages/login';
import SignUp from './pages/signUp';
import Activate from './pages/Activate';
import RestPass from './pages/RestPass';
import RestPassConfirm from './pages/RestPassConfirm';




// pages
import Logout from './pages/logout';
import Analytics from './pages/Analytics';
import CompanySelectPage from './pages/CompanySelectPage';
const Home = React.lazy(() => import('./pages/home'));






function App() {


  // set image url
  const imgUrl = localStorage.getItem("img");
  
  // define the router
  const router = createBrowserRouter(
    createRoutesFromElements(

      // create two routes for differnt layouts

      // Main route
      <Route>
        <Route path='/' element={<MiniDrawer />}>

          
          <Route path='tables' index element={

            <React.Suspense fallback={<div className=' w-[100%] h-[700px] flex flex-column justify-center  items-center '>
              <img className='  w-[50%] m-auto  p-20 shadow-sm shadow-blue-100' src={imgUrl} />

            </div>}>
              <Home />
            </React.Suspense>
          }

          />

          <Route path='/' element={<Analytics />} />

          <Route path='logout' element={<Logout />} />
          
        </Route>

       

        {/* Auth route */}
        <Route path='auth' element={<Root />}>

          <Route path='company' element={<CompanySelectPage />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='activate/:uid/:token' element={<Activate />} />
          <Route path='restpass' element={<RestPass />} />
          <Route path='password/reset/confirm/:uid/:token' element={<RestPassConfirm />} />
        </Route>

      </Route>

    ))

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
