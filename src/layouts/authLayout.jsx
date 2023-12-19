import { Outlet } from 'react-router-dom'
import Nav from '../components/WelcomePages/Nav'

export default function Root() {
  return (
    <div className='w-[100%] h-[700px] bg-gray-50'>
     
        <Nav/>
        <Outlet/>
       
    </div>
  )
}
