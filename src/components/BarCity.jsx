import React from 'react'
import styled from "styled-components"
import {useSelector, useDispatch} from "react-redux"
import { FaTrash } from "react-icons/fa";





const UI = styled.ul`
    flex-flow:column nowrap;
    background-color: rgb(38,33,33, 100%);
    position:absolute;
    right:${({open}) => open? '0': '-120%'};
    width:300px;
    top:0;
    height:100vh;
    color:#fff;
    display:flex;
    z-index:4;
    flex-direction:column;
    justify-content:center;
    transition:all .3s ease-in-out;
    

    li{
        display:flex;
        border:1px solid #fff;
        text-align:center;
        list-style:none;
        display:flex;
       
        justify-content:space-between;
        margin-top:20px;
        margin-right:15px;
        transition:all .3s ease;
        border-radius:20px;
        cursor:pointer;
        padding-left:10px;
        padding-right:10px;
        

    }

    li:hover{
        background-color:#fff;
        color:#000;
        padding:10px;
        
        
    }

    li:hover .remove_btn{
        display:block;
        

    }
    .remove_btn{
        display:none;
        text-align:center;
        transition:transform .3s ease-in-out;
    }

    .remove_btn:hover{
        color:red;
        transform:scale(1.4);
    }

    @media(max-width:500px){
        
        width:200px;
    }
    

    
`

export default function BarCity({open, openCity}) {
    const cityOpen = useSelector(state => state.editCity.open)
    const dispatch = useDispatch()
    const cities = useSelector(state => state.editCity.cities)
    let updated_cities = cities
    const currentCity = useSelector((state => state.editCity.currentCity))
    const submitCity = (id) =>{
      if(id>=0 && id < cities.length){
          dispatch({type:"CUR_CITY", payload: cities[id]})
      }
    }

    const RemoveCity = (id) =>{
        
        dispatch({type:"REMOVE_CITY", payload:id})
        console.log(id)
        console.log(currentCity.id)
        if(currentCity.id === id){
            dispatch({type:"CUR_CITY", payload:{name:"Add new city", id:0}})
            console.log("Check")
        }
        
        
    }

  return (
    <UI onClick = {()=>openCity(!open)} open ={open} openCity = {openCity}>
       { cities.map((city, index) => (
          <li key={city.id}>
            <div  onClick = {()=>submitCity(city.id)}>{city.name}</div>
            <FaTrash class = "remove_btn" onClick ={()=> RemoveCity(city.id)}/>
          </li>
        ))}
        <div onClick ={()=>{dispatch({type:"OPEN_BAR"})
    openCity(false)}} className="addButton">Add new City</div>
    </UI>
  )
}
