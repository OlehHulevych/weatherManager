import React from 'react'
import {useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {useDispatch, useSelector} from "react-redux"
import { FaWindowClose } from "react-icons/fa";
import {motion} from "framer-motion"



export default function AddTown() {
    const form = document.getElementsByClassName("input_form")
    const [newCityName, setNewCityName] = useState("")
    const dispatch = useDispatch()
    let cities = useSelector((state) => state.editCity.cities);
    const isDuplicate = useSelector((state)=> state.editCity.isDuplicate);
    const added = useSelector((state)=> state.editCity.added || false)
    const currentCity = useSelector((state)=> state.editCity.currentCity || "");
    
    
   

    

    const submitFuncion = (event)=>{
      event.preventDefault();
      
     
        const newCity = {
          name:newCityName,
          id:cities.length+1
        };
        dispatch({type:'ADD_CITY', payload:newCity})
        dispatch({type:"CUR_CITY", payload: newCity})
        console.log(newCity.id)

        setNewCityName('')
        console.log(added)
     
        

      
      
      
      
    }

    const handleChange = (event) =>{
      setNewCityName(event.target.value)
    }

   

  return (
    <div className = "City_section">
      <div className="container">
      
        <motion.form animate ={{scale:1}} initial={{scale:0}} className = "input_form col-md-6 col-sm-6 col-6" onSubmit = {submitFuncion}>
        <FaWindowClose className = "close_btn" onClick = {()=>{dispatch({type:"OPEN_BAR"}) 
        }}/>
            <div className = "form_item">
              
                <div className = "form_text text-center ">Add city</div>
                <input type="text" value={newCityName} className="city_input" onChange = {handleChange}/>
                <input type="submit" className = "btn_city"/>
                {isDuplicate && <p className = "duplicate_error">You already added this city</p>}
                {added && <p className = "duplicate_error">The city was not found</p>}
                
            </div>
           
        </motion.form>
      </div>
    </div>
  )
}
