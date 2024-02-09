import React from 'react'
import { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormSelect,
  CToast,
  CToastBody,
  CToastHeader,
  CAlert,  
} from '@coreui/react'
import axios from 'axios'
import { useEffect } from 'react'
import useAPI from 'src/global_function/useApi'
import SetLecture from './SetLecture'

const Timetable = () => {
  const [Semesters, setSemesters] = useState(null)
  const [division, set_division] = useState(null)
  const [currentSelectSemester, setcurrentSelectSemester] = useState(null)
  const [schedule, set_sechedule] = useState(null)
  const [StoredTokens, CallAPI] = useAPI()
  const [time_table, set_time_table] = useState(null)
  const [visible, setVisible] = useState(false)
  const [lectureConfigs,setLectureConfigs] = useState(null)
  const load_semester = async (batchslug) => {
    const header = {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': true,
    }
    const axiosInstance = axios.create()
    let endpoint = `/manage/get_semesters`
    let method = 'get'
    let headers = header
    let response_obj = await CallAPI(StoredTokens, axiosInstance, endpoint, method, headers)
    if (response_obj.error == false) {
      let response = response_obj.response
      setSemesters(response.data.data)
    } else {
      console.log(response_obj.error)
    }
  }

  const showLectureModal = async (schedule) => {      
  const header = {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': true,
    }
    const axiosInstance = axios.create()
    let endpoint = `/manage/get_lecture_configs`
    let method = 'get'
    let headers = header
    let response_obj = await CallAPI(StoredTokens, axiosInstance, endpoint, method, headers,null,{ schedule_slug: schedule.slug })
    if(response_obj.error ===false){
        setVisible(true)
        set_sechedule(schedule)
        setLectureConfigs(response_obj.response.data.data)
    }else{
        alert(response_obj.errorMessage.message);        
    }
  }
  const load_division = async (semester_slug) => {
    if (semester_slug != ' ') {
      const headers = {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': true,
      }
      const axiosInstance = axios.create()
      let endpoint = `/manage/get_divisions`
      let method = 'get'
      let response_obj = await CallAPI(
        StoredTokens,
        axiosInstance,
        endpoint,
        method,
        headers,
        null,
        { semester_slug: semester_slug },
      )
      if (response_obj.error === false) {
        const response = response_obj.response
        set_division(response.data.data)
      } else {
        alert(response_obj.errorMessage.message)
      }
    } else {
      alert('please select semester')
    }
  }

  const load_time_talbe = async (division_slug) => {
    if (division_slug != ' ') {
      const headers = {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': true,
      }
      const axiosInstance = axios.create()
      let endpoint = `/manage/get_timetable`
      let method = 'get'
      let response_obj = await CallAPI(
        StoredTokens,
        axiosInstance,
        endpoint,
        method,
        headers,
        null,
        { division_slug: division_slug },
      )
      if (response_obj.error === false) {
        const response = response_obj.response
        set_time_table(response.data.data)
      } else {
        alert(response_obj.errorMessage.message)
      }
    } else {
      alert('please select division')
    }
  }
  useEffect(() => {
    load_semester()
  }, [])
  return (
    <>
      <CRow className="mb-3">
        <CCol>
          {Semesters && (
            <>
              <CCard className={`mb-3`}>
                <CCardHeader>Semester</CCardHeader>
                <CCardBody>
                  <CFormSelect
                    aria-label="Default select example"
                    onChange={(e) => {
                      load_division(e.target.value)
                    }}
                  >
                    <option value="">Select Semester</option>
                    {Semesters.map((item, index) => (
                      <option key={index} value={item.slug}>
                        Semester - {item.no}
                      </option>
                    ))}
                  </CFormSelect>
                </CCardBody>
              </CCard>
            </>
          )}
          {division && (
            <>
              <CCard>
                <CCardHeader>Division</CCardHeader>
                <CCardBody>
                  <CFormSelect
                    aria-label="Default select example"
                    onChange={(e) => {
                      load_time_talbe(e.target.value)
                    }}
                  >
                    <option value="">Select division</option>
                    {division.map((item, index) => (
                      <option key={index} value={item.slug}>
                        Division - {item.division_name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCardBody>
              </CCard>
            </>
          )}
        </CCol>
      </CRow>
      {time_table ? (
        <>
          <CRow className='text-center mb-5 justify-content-center'>
            <CCol className='col-lg-10 col-md-10 col-sm-12 col-xs-12'>
              <CCard className="">
                <CCardHeader>
                  Division - {time_table ? time_table.division.division_name : ''}
                </CCardHeader>
                <CCardBody>
                  <CRow className="flex-column" style={{ padding: '0' }}>
                    {time_table ? (
                        time_table.schedules.map((item, index) => (
                        <>
                          <CCol className="mb-4 d-flex align-items-center flex-column" key={index}>                        
                              <CAlert className="m-0 rounded-0 w-100 p-2 d-flex justify-content-between align-items-center" color="primary" visible={true} onClose={() => setVisible(false)}>
                                  {item.day.toUpperCase()}
                                  <button
                                    className="h-20 btn"
                                    onClick={() => {
                                      showLectureModal(item)
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      className="bi bi-plus-circle"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                    </svg>
                                  </button>
                              </CAlert>                            
                            <CCard className="w-100  rounded-0 ">
                              <CCardBody>
                                <CRow>
                                  <CCol sm={12} md={12} lg={12}>
                                    <CRow className="justify-content-center">
                                      {item.lectures.length > 0 ? (
                                        <CToast autohide={false} visible={true}>
                                            <CToastHeader closeButton>
                                              <svg
                                                className="rounded me-2"
                                                width="20"
                                                height="20"
                                                xmlns="http://www.w3.org/2000/svg"
                                                preserveAspectRatio="xMidYMid slice"
                                                focusable="false"
                                                role="img"
                                              >
                                                <rect width="100%" height="100%" fill="#007aff"></rect>
                                              </svg>
                                              <div className="fw-bold me-auto">CoreUI for React.js</div>
                                              <small>7 min ago</small>
                                            </CToastHeader>
                                            <CToastBody>Hello, world! This is a toast message.</CToastBody>
                                          </CToast>
                                      ) : (
                                        <CToast autohide={false} visible={true}>                 
                                            <CToastBody>No Lectures Found</CToastBody>
                                        </CToast>
                                      )}
                                    </CRow>
                                  </CCol>
                                </CRow>
                              </CCardBody>
                            </CCard>
                          </CCol></>
                        ))                     
                    ) : (
                      <p>no schedule</p>
                    )}
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </>
      ) : (
        <CToast animation={false} autohide={false} visible={true} className="mx-auto w-100">
          <CToastHeader className="bg-dark d-flex justify-content-center">
            <img src="/static/media/smartroll_logo.a3c3e21d0b4a56919e74.png" width={100}></img>
          </CToastHeader>
          {Semesters ? (
            division ? (
              <CToastBody>Select a division</CToastBody>
            ) : (
              <CToastBody>Select a semester </CToastBody>
            )
          ) : null}
        </CToast>
      )}
      {schedule && <SetLecture visible={visible} setVisible={setVisible} sechedule={schedule} lectureConfigs={lectureConfigs}/>}
    </>
  )
}
export default Timetable
