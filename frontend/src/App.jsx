import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import SubmitPropertyPage from './pages/SubmitProperty'
import PublicProfilePage from './pages/PublicProfile/PublicProfile'
import MarketplacePage from './pages/Marketplace/Marketplace'
import NotFound404Page from './pages/NotFound404'
import GetStartedPage from './pages/GetStarted'
import EditUserPage from './pages/EditUser'
import RegisterPage from './pages/Register'
import PropertyPage from './pages/Property/Property'
import RequestsPage from './pages/Requests'
import ProfilePage from './pages/Profile/Profile'
import LoginPage from './pages/Login'
import Layout from './components/layout/Layout'

import './style.css'

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<GetStartedPage />}></Route>
        <Route path='/auth/register' element={<RegisterPage />}></Route>
        <Route path='/auth/login' element={<LoginPage />}></Route>
        <Route path='/marketplace' element={<MarketplacePage />}></Route>
        <Route path='/users/:username' element={<PublicProfilePage />}></Route>
        <Route path='/users/profile/requests' element={<RequestsPage />}></Route>
        <Route path='/users/profile' element={<ProfilePage />}></Route>
        <Route path='/users/profile/edit' element={<EditUserPage />}></Route>
        <Route path='/properties/:id' element={<PropertyPage />}></Route>
        <Route path='/properties/submit' element={<SubmitPropertyPage />}></Route>
        <Route path='/*' element={<NotFound404Page />}></Route>
      </Routes>
    </Layout>
  )
}

export default App