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

const CustomStyles = (set_term,setBatchCout) => {
  
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
      let endpoint = `/manage/add_term/`;let method='post';let headers = header;
      let response_obj = await CallAPI(StoredTokens,axiosInstance,endpoint,method,headers,body,null)
      if(response_obj.error == false){
          let response = response_obj.response
          let batchCount = {...objectCount}
          batchCount.terms += 1          
          ctxDispatch({ type: 'GET_OBJECTS', payload: batchCount });
          set_term(prevArray => [...prevArray, response.data.data]);
          setBatchCout(preValue => preValue + 1);
          showAlert("success","Bactch Added successfully...!")
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
        "start_year": Start,
        "end_year":EndYear
      }
      addBatches(body)
      
      
    }
    return (
      <>
      <CForm
        className="row g-3 needs-validation"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <CCol md={6}>
          <CFormLabel htmlFor="validationCustom01">Start Year</CFormLabel>
          <CFormInput type="number" min={currentYear} max="2099" step="1" value={Start}  id="validationCustom01" onChange={e => setStart(e.target.value)} required maxLength={4} />
          <CFormFeedback valid>Looks good!</CFormFeedback>
        </CCol>
        <CCol md={6}>
          <CFormLabel htmlFor="validationCustom02">End Year</CFormLabel>
          <CFormInput type="number" value={EndYear}  readOnly step="1" id="validationCustom02"   required maxLength={4}/>
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







const Terms = (props) => {

    const {chageSteps} = props
  const {set_term_slug} = props
  const {setBatchCout} = props
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { accessToken, refreshToken, batches, currentBatch} = state
  const navigate = useNavigate()
  const [semester, set_semester] = useState([]);
  const [StoredTokens,CallAPI] = useAPI()


    const [term,set_term] = useState([])

  // function for the load batches
  
const load_term = async() => {
    const header = {
      "Content-Type":"application/json",        
      'ngrok-skip-browser-warning':true
    }
    const axiosInstance = axios.create()
    let endpoint = `/manage/get_terms`;let method='get';let headers = header;
    let response_obj = await CallAPI(StoredTokens,axiosInstance,endpoint,method,headers)    
    if(response_obj.error == false){
      let response = response_obj.response
      
      set_term(response.data.data)
    }else{  
      alert(response_obj.errorMessage.message)
    }    
  }

  useEffect(() => {
    load_term()

  }, []);


  return (
    <>
          <CRow>
        <CCol xs={12}>
          <CCard className="mb-3">
            <CCardHeader>
              <strong>Semesters</strong>
            </CCardHeader>
            <CCardBody>{CustomStyles(set_term,setBatchCout)}</CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Term History</strong>
            </CCardHeader>
            <CCardBody>
                {term.length > 0 ? (<CTable align="middle" className="mb-0 border text-center" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    
                    <CTableHeaderCell>Start Year</CTableHeaderCell>
                    <CTableHeaderCell>End Year</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {term.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index} onClick={() => {chageSteps('semester'); set_term_slug(item.slug);}}>
                      <CTableDataCell>
                        <div>{item.start_year}</div>   
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.end_year}</div>   
                      </CTableDataCell>
                      
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>) : (<p>no terms</p>)}
              
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

Terms.propTypes = {
    chageSteps: PropTypes.func.isRequired,
    set_semester_slug: PropTypes.func.isRequired,
    setBatchCout:PropTypes.func.isRequired
  }

export default Terms