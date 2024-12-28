import React, { useEffect } from 'react'
import axios from 'axios'

const FinancialAssist = () => {

  async function fetchdata(){
    const response=await axios.get('http://localhost:5000/getdonar')
    console.log(response);
  }
  
  
  useEffect(()=>{
      fetchdata();
  },[])
 

  return (
    <div>
      
    </div>
  )
}

export default FinancialAssist
