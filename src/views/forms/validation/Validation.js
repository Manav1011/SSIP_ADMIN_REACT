import React, { useState  ,Component } from 'react'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { APIMiddleware } from 'src/global_function/GlobalFunctions'
import useAPI from 'src/global_function/useApi'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { Store } from '../validation/store'
import {base_url} from 'src/base_url'
import expireToken from 'src/global_function/unauthorizedToken'
import { showAlert } from 'src/global_function/GlobalFunctions'

const CustomStyles = (set_semester,setBatchCout,term_slug) => {
  
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { accessToken, refreshToken, batches, currentBatch, objectCount} = state
  const [validated, setValidated] = useState(false)
  const currentYear = new Date().getFullYear() 
  const [semester_no, set_semester_no] = useState("")
  const [Start, setStart] = useState(currentYear);
  const EndYear = (parseInt(Start, 10) + 1).toString();
  const navigate = useNavigate()
  

  // custom hook for api calling 

  const [StoredTokens,CallAPI] = useAPI()


  
  const addBatches = async(body) => {
    const header = {
      "Content-Type":"application/json",      
      'ngrok-skip-browser-warning':true
    }
    const axiosInstance = axios.create()
    let endpoint = `/manage/add_semester/`;let method='post';let headers = header;
    let response_obj = await CallAPI(StoredTokens,axiosInstance,endpoint,method,headers,body,null)
    if(response_obj.error == false){
        let response = response_obj.response
        let batchCount = {...objectCount}
        batchCount.semesters += 1        
        ctxDispatch({ type: 'GET_OBJECTS', payload: batchCount });
        set_semester(prevArray => [...prevArray, response.data.data]);
        setBatchCout(preValue => preValue + 1);
      }else{       
        alert(response_obj.errorMessage.message)   
      }
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    const body = {
      "term_slug":term_slug,
      "no": semester_no,
      
    }
    addBatches(body)
    showAlert("success","Bactch Added successfully...!")
    
  }
  return (
    <>
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <CCol md={12}>
        <CFormLabel htmlFor="validationCustom01">Semester Number</CFormLabel>
        <CFormInput type="number" min={1} max={8} step="1"   id="validationCustom01" onChange={e => set_semester_no(e.target.value)} required maxLength={1} />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol xs={12}>
        <button className='btn btn-outline-dark form-control' type="submit" >
          Submit form
        </button>
      </CCol>
    </CForm>
    </>
  )
}

const Validation = (props) => {
  const {chageSteps} = props
  const {set_semester_slug} = props
  const {setBatchCout} = props
  const {term_slug} = props
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { accessToken, refreshToken, batches, currentBatch} = state
  const navigate = useNavigate()
  const [semester, set_semester] = useState([]);
  const [StoredTokens,CallAPI] = useAPI()
  // function for the load batches
  
const loadBatches = async() => {
    const header = {
      "Content-Type":"application/json",        
      'ngrok-skip-browser-warning':true
    }
    const axiosInstance = axios.create()
    let endpoint = `/manage/get_semesters`;let method='get';let headers = header;
    let response_obj = await CallAPI(StoredTokens,axiosInstance,endpoint,method,headers,null,{"term_slug":term_slug})    
    if(response_obj.error == false){
      let response = response_obj.response
      
      set_semester(response.data.data)
    }else{        
      alert(response_obj.errorMessage.message)
    }    
  }

  useEffect(() => {
    if(accessToken){
      loadBatches()
    }
  }, []);

  // useEffect(() => {
  //   setBatches(batches)
    
  // }, [batches]);
  
  
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-3">
            <CCardHeader>
              <strong>Semesters</strong>
            </CCardHeader>
            <CCardBody>{CustomStyles(set_semester,setBatchCout,term_slug)}</CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Semester History</strong>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border text-center" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Semester No</CTableHeaderCell>
                    <CTableHeaderCell>Activation Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {semester.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index} onClick={() => {chageSteps('division'); set_semester_slug(item.slug);}}>
                      <CTableDataCell>
                        <div>{item.no}</div>   
                      </CTableDataCell>
                      
                      <CTableDataCell>
                        <div>
                          {item.status ? (<div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                          </svg>{}
                          </div>):<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                          </svg>}
                        </div>   
                      </CTableDataCell> 
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      
    </>
  )
}

Validation.propTypes = {
  chageSteps: PropTypes.func.isRequired,
  set_semester_slug: PropTypes.func.isRequired,
  setBatchCout:PropTypes.func.isRequired
}

export default Validation
