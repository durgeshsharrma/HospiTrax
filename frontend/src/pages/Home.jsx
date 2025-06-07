import React from 'react'
import Header from '../components/Header'
import SpeciacialityMenu from '../components/SpeciacialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Header></Header>
      <SpeciacialityMenu></SpeciacialityMenu>
      <TopDoctors></TopDoctors>
      <Banner></Banner>
      
      
    </div>
  )
}

export default Home
