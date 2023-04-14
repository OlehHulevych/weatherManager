import React from 'react'
import styled from 'styled-components'
import BarCity from "./BarCity"
import {useState} from 'react'
import {useSelector} from 'react-redux'


const BurgerMenu = styled.div`

width:5rem;
height:1rem;
display:flex;
justify-content:space-betwean;
flex-flow:column nowrap;
z-index:10;
margin-bottom:20px;
cursor:pointer;



  .selectedCity{
    font-size:20px;
    color:white;
    font-family: 'Roboto', sans-serif;
    text-align:center;
  }
  
  .selectedCity:hover{
    background-color: rgba(90, 30, 60, 50%);
    border-radius:10px;
  }
`


export default function BurgerBar() {
  const [open, setOpen] = useState(false)
  const currentCity = useSelector((state => state.editCity.currentCity))

  const openCity = () =>{
    setOpen(!open)
    console.log(open)
  }
  
  return (
    <>
      <BurgerMenu open={open} onClick = {openCity}>
        <div className="selectedCity">{currentCity.name}</div>
      </BurgerMenu>
      <BarCity openCity={openCity} open = {open}/>
    </>
  )
}


