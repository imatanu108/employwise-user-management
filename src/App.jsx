import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@/components/Header/Header'
function App() {

  return (
    <>
      <Header />
      <main className='mt-10'>
        <Outlet />
      </main>
    </>
  )
}

export default App
