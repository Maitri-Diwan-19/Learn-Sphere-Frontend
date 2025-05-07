import './App.css'
import Register from './pages/Register'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import InstructorDashboard from './pages/InstructorDashboard'
import StudentDashboard from './pages/StudentDashboard'
import { ToastContainer } from 'react-toastify'
import CreateCourse from './pages/CreateCourse'
import CourseList from './pages/CourseList'
import CourseDetail from './pages/CourseDetail'
import AllCourses from './pages/AllCourses'
import MyEnrollCourses from './pages/MyEnrollCourses'
import CourseSessions from './pages/CourseSession'
import StudentProfile from './pages/StudentProfile'
import MyCourses from './pages/Instructorcourse'


function App() {
  return (
    <>
     <Routes>
     <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
     
      <Route path='/student-dashboard' element={<StudentDashboard/>}>
      <Route index element={<MyEnrollCourses />} />
        <Route path='all-course' element={<AllCourses/>}/>
        {/* <Route path='my-enrollcourses' element={<MyEnrollCourses/>}/> */}
        <Route path='course/:courseId' element={<CourseSessions/>} />
        <Route path='profile' element={<StudentProfile/>} />
      </Route>

      <Route path='/instructor-dashboard' element={<InstructorDashboard/>}>
      <Route path='create-course' element={<CreateCourse/>}/>
      <Route path='instructor-course' element={<MyCourses/>}/>


      <Route path='course-list' element={<CourseList/>}/>
      <Route path='course/:id' element={<CourseDetail/>}/>
      </Route>
     </Routes>
    
     <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
