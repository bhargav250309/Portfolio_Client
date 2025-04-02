import React,{lazy,Suspense} from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom'; // Import Route and Routes here
import UserPage from './pages/user/userPage';
import NotFound from './components/notFound';

// import AdminLayout from './pages/admin/adminLayout';
// import AdminHome from './pages/admin/adminHome';
// import AdminProject from './pages/admin/AdminProject';
// import AdminAbout from './pages/admin/AdminAbout';
// import AdminContact from './pages/admin/AdminContact';
// import AuthLayout from './pages/auth/authLayout';
// import Register from './pages/auth/register';
// import Login from './pages/auth/login';
import CheckAuth from './components/common/checkAuth';
import ApiLoader from './components/apiLoader';
// import AdminStack from './pages/admin/AdminStack';
// import Links from './pages/admin/Links';

const AdminLayout = lazy(() => import('./pages/admin/adminLayout'));
const AdminHome = lazy(() => import('./pages/admin/adminHome'));
const AdminProject = lazy(() => import('./pages/admin/AdminProject'));
const AdminAbout = lazy(() => import('./pages/admin/AdminAbout'));
const AdminContact = lazy(() => import('./pages/admin/AdminContact'));
const AdminStack = lazy(() => import('./pages/admin/AdminStack'));
const Links = lazy(() => import('./pages/admin/Links'));
const AuthLayout = lazy(() => import('./pages/auth/authLayout'));
const Register = lazy(() => import('./pages/auth/register'));
const Login = lazy(() => import('./pages/auth/login'));

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<UserPage />} />

        <Route path="/auth" element={
          <CheckAuth>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="/admin" element={
          <CheckAuth>
            <Suspense fallback={<ApiLoader />} >
              <AdminLayout />
            </Suspense>
          </CheckAuth>
        }>
          <Route path="home" element={<AdminHome />} />
          <Route path="stack" element={<AdminStack />} />
          <Route path="project" element={<AdminProject />} />
          <Route path="about" element={<AdminAbout />} />
          <Route path="contact" element={<AdminContact />} />
          <Route path="links" element={<Links />} />
        </Route>

        <Route path='*' element={<NotFound />}/>

      </Routes>
    </>
  );
}

export default App;