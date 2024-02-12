import React, { useEffect } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react'
import { Store } from 'src/views/forms/validation/store';
import {base_url} from 'src/base_url';
import "./LoginForm.css";
import expireToken from 'src/global_function/unauthorizedToken';
import '../../../css/tailwind.css'
import { useForm } from "react-hook-form";
import { CCol, CRow } from '@coreui/react';


export default function Login(){
      

     const navigate = useNavigate();
     const { register, handleSubmit} = useForm();      
    
      const { state, dispatch: ctxDispatch } = useContext(Store);
      const { refreshToken , set404 } = state;

      const SubmitLogin = (data) => {
        const header = {
          'ngrok-skip-browser-warning':true
        }
        Axios.post(`${base_url}/auth/api/login/`,{
          "email":  data.email,
          "password":data.password        
        },{header})
        .then((response)=>{        
          ctxDispatch({ type: 'ACCESS_TOKEN', payload: response.data.access});
          ctxDispatch({ type: 'REFRESH_TOKEN', payload: response.data.refresh });

          localStorage.setItem('accessToken',response.data.access)
          localStorage.setItem('refreshToken',response.data.refresh)        
          navigate('/')
        })
        .catch((error)=>{          
          if(error.code === "ERR_NETWORK"){
            ctxDispatch({ type: 'SET_404', payload: true });
          }
          else{
            if(error.response.status === 401){
              alert(error.response.data.detail)
              
          }
          }
          
        })
    }
    useEffect(()=>{      
      if(set404){
        navigate("/404")
        ctxDispatch({ type: 'SET_404', payload: false });        
      }
    },[set404])    
  return (
    <div className="h-screen bg-center bg-no-repeat sm:p-20 p-6" style={{background:'black'}}>
      <section className="w-full h-full flex justify-center items-center rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100" style={{backgroundImage:'url(/images/background2.jpg)'}}>
      <div className="text-white sm:w-full">        
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit(SubmitLogin)} autoComplete='off'>
          <div className="relative border-b-2	border-slate-500 z-0 w-full mb-5 group">
            <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required {...register('email')}/>
            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
          </div>
          <div className="relative z-0 border-b-2	border-slate-500 w-full mb-5 group">
            <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required  {...register('password')}/>
            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
          </div>
          <CRow>
            <CCol>
            <button type="submit" className="w-100 focus:ring-4  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  text-slate-300" style={{border:'1px solid #ffa31a'}}> Submit </button>
            </CCol>
          </CRow>
            <CRow className='justify-center mt-4'>
              <CCol className='w-full text-center'>
              <div> Or <Link to={"/register"} className='ml-2' style={{color:'rgb(255, 163, 26)'}}>Register</Link></div>
              </CCol>
            </CRow>
            
        </form>
          
      </div>
      </section>
    </div>    
  );
};