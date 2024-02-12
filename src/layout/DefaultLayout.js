import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from 'src/views/forms/validation/store';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import LoadingBar from 'react-top-loading-bar';;
import { base_url } from 'src/base_url';

const DefaultLayout = () => {  
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { accessToken , refreshToken} = state  
  
  const [accessTokenValid,setAccessTokenValid] = useState(false)
  const [serverAvaibility,setServerAvaibility] = useState(false)

  const [progress,setProgress] = useState(0);  
  
  const navigate = useNavigate();  
  
  if (typeof window !== 'undefined') {
    window.setProgress = setProgress;
  }


const expireToken = async (refreshToken)=>{
    const header = {
        'ngrok-skip-browser-warning':true
      }
    axios.post(`${base_url}/auth/api/token/refresh/`,{
        "refresh":refreshToken
    },{headers:header})
    .then((response)=>{        
        localStorage.setItem('accessToken',response.data.access)
        localStorage.setItem('refreshToken',response.data.refresh)        
        const decoded = jwtDecode(response.data.access); 
        ctxDispatch({ type: 'SET_PROFILE', payload: decoded});
        setAccessTokenValid(true)
    })
    .catch((error)=>{
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        navigate('/auth/login')
    })
}
  const checkAccessTokenAuthenticity = async (accessToken) => {    
      const headers = {
        "Content-Type":"application/json",      
        'ngrok-skip-browser-warning':true,
        'Authorization': `Bearer ${accessToken}`
      }
  
      axios.get(`${base_url}/check_token_authenticity/`,{headers:headers})
      .then((response)=>{
        if(response.data.data === true){
          setAccessTokenValid(true)
        }
        else{
          if(refreshToken){
            expireToken(refreshToken)
          }else{
            navigate('/login')
          }
        }
      })
      .catch((error)=>{        
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        navigate('/login')
      })    
  }
  const checkServerAvaibility = async ()=> {
    const headers = {
         "Content-Type":"application/json",      
         'ngrok-skip-browser-warning':true,
         
    }
    axios.get(`${base_url}/check_server_avaibility/`,{headers:headers})
    .then((response)=>{
      setServerAvaibility(true)
      if(accessToken){
        const decoded = jwtDecode(accessToken); 
        ctxDispatch({ type: 'SET_PROFILE', payload: decoded});
        checkAccessTokenAuthenticity(accessToken)
      }else{
        navigate('/login')
      }
    })
    .catch((error)=>{
        navigate("/404")
    })    
  }
  
  useEffect(() => {    
      checkServerAvaibility()   
  },[])  

  return(
    <>
    { serverAvaibility && accessTokenValid ? (
      <div>
        <LoadingBar color={'#1f6feb'} progress={progress} onLoaderFinished={() => setProgress(0)} />
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <AppContent />
          </div>
          <AppFooter />
        </div>
      </div>
    ) : null}
    </>
  )
}

export default DefaultLayout
