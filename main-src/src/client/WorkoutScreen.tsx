import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";
import { NotFoundPage } from "./components/NotFound";
import { useState } from "react";
import axios from "axios";
import ICON from "./assets/icon.png"

import reactLogo from "./assets/react.svg";
import { stringify } from "querystring";
import { addSyntheticLeadingComment } from "typescript";

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const [data, setData] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  axios.get('/api/hello')
  .then((response) => setMessage(response.data));


  let workouts: string[] = ['Dumbbell Fly', 'Dumbbell Curl', 'Shoulder Press'];
  let workouts_sets: string[] = ['3', '4', '4'];

  const AddWorkout = async () => {
    var workout = (document.getElementById("Workout") as HTMLInputElement). value; 
    var sets = (document.getElementById("SetCount") as HTMLInputElement). value; 

    if(workout.length != 0 && sets != '0' && sets.length != 0){
      alert("Successfully Added " + workout);
        workouts.push(workout)
        workouts_sets.push(sets)
        
    }else{
      alert("Please enter a valid workout.")
    }
  };
  
  
  //To test if AddWorkout function works properly
  const AlertWorkouts = async () => 
    {
        for (let i = 0; i < workouts.length; i++) 
        {
            alert(workouts[i] + " x" + workouts_sets[i]);
        }
    };

  const RemoveWorkout = async () => {
    var workout2 = (document.getElementById("Workout") as HTMLInputElement). value; 
    let isPresent:boolean = false;
    
      for(let j = 0; j < workouts.length; j++)
      {
        if(workout2 == workouts[j])
        {   
          alert("Successfully Removed " + workout2);
          workouts.splice(j,1);
          workouts_sets.splice(j,1);
          isPresent = true;
        }
      }

      if(!isPresent)
      {
        alert("This workout does not exist in your plan.")
      }
    
    };

  const signUpButton = () => {

  }

  return (
    <div className="container">
      <h1> Live Active </h1>  
        <form> 
        <div>
          <h2> Workout Regiment </h2>
            <div className="Workout">
            <label> 
              Please Add a Workout! 
              <input type="text" name="Workout" id="Workout" placeholder="" />
            </label>
            </div>
          <br/>
           
            <div className="SetCount"> 
            <label>
              Please enter the number of sets!
              <input type="text" name = "SetCount" id="SetCount" placeholder="" />
            </label>
            </div>
        </div>
        </form>
      <br/> 
      <div>
  </div>
      <button onClick={AddWorkout}>
          Add Workout
      </button>  

      <button onClick={AlertWorkouts}>
          Alert All Workouts
      </button>  

      <button onClick={RemoveWorkout}>
          Remove Workout
      </button>  
    
    <br/>
  <br/> 

  </div>
  
  );
}

export default App;