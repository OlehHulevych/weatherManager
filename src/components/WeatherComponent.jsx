import React, {useState, useEffect} from 'react'
import Header from "./Header"
import Footer from "./Footer"
import BarCity from "./BarCity"
import Main from "./Main"

import axios from "axios"




export default function WeatherComponent() {
  return (
    <div>
      <Header/>
        <Main/>
      <Footer/>
    </div>
  )
}
