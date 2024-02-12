import React from 'react'
import { useState, useContext, useEffect } from 'react'
import 'src/scss/panel.css'
import { Store } from '../forms/validation/store'
import axios from 'axios'
import {base_url} from 'src/base_url'
import { useSelector, useDispatch } from 'react-redux'
import expireToken from 'src/global_function/unauthorizedToken'
import ManageSubjects from './ManageSubjects'
import { useNavigate } from 'react-router-dom'
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
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  COffcanvas,
  COffcanvasHeader,
  COffcanvasTitle,
  CCloseButton,
  COffcanvasBody,
  CFormCheck,
} from '@coreui/react'
import { showAlert } from 'src/global_function/GlobalFunctions'
import Swal from 'sweetalert'
  const CustomStyles = (setTeacherlist) => {
  const [validated, setValidated] = useState(false)
  const navigate = useNavigate()
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { accessToken, refreshToken, currentBatch } = state
  const [StoredTokens, CallAPI] = useAPI()
  const add_Teacher = async (body) => {
    const headers = {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': true,
    }
    const axiosInstance = axios.create()
    let endpoint = `/manage/add_teacher/`
    let method = 'post'
    let response_obj = await CallAPI(
      StoredTokens,
      axiosInstance,
      endpoint,
      method,
      headers,
      body,
    )
    if (response_obj.error == false) {
      
      let response = response_obj.response
      console.log(response.data.data)
      setTeacherlist((prevArray) => [...prevArray, response.data.data])
    } else {      
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      return
    }
    const name = event.target.tname.value
    const ph_no = event.target.tmobile.value
    const email = event.target.temail.value
    setValidated(true)
    if (!name || !ph_no || !email) {
      Swal({
        title: 'Input Field Empty',
        icon: 'error',
        button: 'OK',
      })
    } else {      

      const body = {
        name,
        email,
        ph_no,
      }
      add_Teacher(body)
      showAlert('success', 'Teacher Added successfully...!')
    }

  }
  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom01">Teacher Name</CFormLabel>
        <CFormInput type="text" id="validationCustom01" name="tname" required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom01">Teacher Moblie No</CFormLabel>
        <CFormInput
          type="tel"
          id="validationCustom02"
          name="tmobile"
          pattern="[0-9]{10}"
          required
        />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={12}>
        <CFormLabel htmlFor="validationCustom01">Teacher E-mail</CFormLabel>
        <CFormInput type="email" id="validationCustom02" name="temail" required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      {/* <CCol md={6}>
          <CFormLabel htmlFor="validationCustom02">Teacher Password</CFormLabel>
          <CFormInput type="password" id="validationCustom02"  required onChange={e => setTeacher_password(e.target.value)}/>
          <CFormFeedback valid>Looks good!</CFormFeedback>
        </CCol> */}
      <CCol xs={12}>
        <button className="btn btn-outline-dark form-control" type="submit">
          Submit form
        </button>
      </CCol>
    </CForm>
  )
}

const Teacher = () => {
  const [StoredTokens, CallAPI] = useAPI()
  const [isModalOpen, setModalOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [SelectedTeacher, setSelectedTeacher] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [Teacherlist, setTeacherlist] = useState([])

  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { accessToken, refreshToken } = state
  const load_teacher = async () => {
    const headers = {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': true,
    }
    const axiosInstance = axios.create()
    let endpoint = `/manage/get_teacher`
    let method = 'get'
    let response_obj = await CallAPI(StoredTokens,axiosInstance, endpoint, method, headers)
    if (response_obj.error == false) {
      let response = response_obj.response
      setTeacherlist(response.data.data)
    } else {
      console.log(response_obj.error)
    }
  }

  useEffect(() => {
      load_teacher()
  }, [])

  const checkboxOptions = ['Option 1', 'Option 2', 'Option 3']

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-3">
            <CCardHeader>
              <strong>Teachers</strong>
            </CCardHeader>
            <CCardBody>{CustomStyles(setTeacherlist)}</CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Teacher History</strong>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>E-mail</CTableHeaderCell>
                    <CTableHeaderCell>Mobile No</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {Teacherlist.map((item, index) => (
                    <CTableRow
                      v-for="item in tableItems"
                      onClick={() => {
                        setSelectedTeacher(item)
                        setVisible(true)
                      }}
                      key={index}
                    >
                      <CTableDataCell>
                        <div>{item.profile.name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.profile.email}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.profile.ph_no}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {SelectedTeacher ? (
        <ManageSubjects
          visible={visible}
          setVisible={setVisible}
          SelectedTeacher={SelectedTeacher}
        />
      ) : null}
    </>
  )
}

export default Teacher
