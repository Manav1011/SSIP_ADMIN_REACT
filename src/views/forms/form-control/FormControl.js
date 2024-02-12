import React from 'react'
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Store } from '../validation/store'
import {base_url} from 'src/base_url'
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
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormSelect,
  CTableDataCell
} from '@coreui/react'
import expireToken from 'src/global_function/unauthorizedToken'
import { APIMiddleware } from 'src/global_function/GlobalFunctions'
import { useNavigate } from 'react-router-dom'
import { showAlert } from 'src/global_function/GlobalFunctions'
import useAPI from 'src/global_function/useApi'

const CustomStyles = (set_divisions, semester_slug) => {
  const [StoredTokens,CallAPI] = useAPI()
  const [validated, setValidated] = useState(false)
  const [division_name, set_division_name] = useState("")
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { accessToken,refreshToken, semesters , objectCount } = state
  const [semCount, setsemCount] = useState(objectCount);
  const navigate = useNavigate()




  const add_division = async (body) => {
    const header = {
      "Content-Type":"application/json",      
      'ngrok-skip-browser-warning':true
    }
    const axiosInstance = axios.create()
    let endpoint = `/manage/add_division/`;let method='post';let headers = header;
    let response_obj = await CallAPI(StoredTokens,axiosInstance,endpoint,method,headers,body,null)
    if(response_obj.error == false){
      let response = response_obj.response
      let changeCount = {...objectCount}
      changeCount.division += 1  
        set_divisions(prevArray => [...prevArray, response.data.data])
      showAlert("success","Semester Added successfully...!")
    }else{        
      alert(response_obj.errorMessage.message)
    }    
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    event.preventDefault()
    setValidated(true)
    const body = {
      division_name: division_name,
      semester_slug: semester_slug,
    }
    add_division(body);
    
  }
  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <CCol md={12}>
        <CFormLabel htmlFor="validationCustom01">Division Name</CFormLabel>
        <CFormInput type="text" id="validationCustom01" onChange={e => set_division_name(e.target.value)} required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>      
      <CCol xs={12}>
        <button className='btn btn-outline-dark form-control' type="submit">
          Submit form
        </button>
      </CCol>
    </CForm>
  )
}

const FormControl = (props) => {
  const { semester_slug ,chageSteps , set_division_slug } = props
  const [divisions, set_divisions] = useState([]);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { accessToken,refreshToken, semesters } = state
  const navigate = useNavigate()
  const load_division = async () => {    
    const header = {
      "Content-Type":"application/json",        
      'ngrok-skip-browser-warning':true
    }
    const axiosInstance = axios.create()
    let endpoint = `/manage/get_divisions`;let method='get';let headers = header;
    let response_obj = await APIMiddleware(axiosInstance,endpoint,method,headers,null,{semester_slug: semester_slug })
    if(response_obj.error == false){
      let response = response_obj.response      
        set_divisions(response.data.data)        
    }else{        
      alert(response_obj.errorMessage.message)
    }
  }

  useEffect(() => {
    load_division()
  }, []);


  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-3">
            <CCardHeader>
              <strong>Divison</strong>
            </CCardHeader>
            <CCardBody>{CustomStyles(set_divisions, semester_slug)}</CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Division History</strong>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow onClick={() => {chageSteps('batch');}} style={{textAlign:"center"}}>
                    <CTableHeaderCell>Division Name</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody style={{textAlign:"center"}}>
                  {divisions.map((item, index) => (
                  
                      <CTableRow key={index} onClick={() => {chageSteps('batch'); set_division_slug(item.slug);}}>
                        <CTableDataCell>
                          <div>{item.division_name}</div>
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

FormControl.propTypes = {
  chageSteps:PropTypes.func.isRequired,
  setsemSlug:PropTypes.func.isRequired,
  batchSlug: PropTypes.string
}
export default FormControl
