import React from 'react'

import { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CToast,
  CToastHeader,
  CToastBody,
  CAlert,
} from '@coreui/react'
import axios from 'axios'
import { useEffect } from 'react'
import useAPI from 'src/global_function/useApi'



const StudentDashboard = () => {
    const [StoredTokens, CallAPI] = useAPI()
    const [TimeTables, setTimeTables] = useState(null)
    const load_teacher_timetable = async () => {
      const headers = {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': true,
      }
      const axiosInstance = axios.create()
      const response_obj = await CallAPI(
        StoredTokens,
        axiosInstance,
        '/manage/get_timetable_for_student',
        'get',
        headers,
        null,
        null,
      )
      if (response_obj.error === false) {
        const response = response_obj.response
        console.log(response.data.data)
        setTimeTables(response.data.data)
      }
    }

    const mark_attendance =async (lecture_slug)=>{
        const headers = {
          'Content-Type':"application/json",
          'ngrok-skip-browser-warning': true,
        } 
        const axiosInstance = axios.create()
        const response_obj = await CallAPI(StoredTokens,axiosInstance,"/manage/session/mark_attendance_for_student/","post",headers,{"lecture_slug":lecture_slug},null)
        if(response_obj.error === false)
        {
          const response = response_obj.response
          if(response.data.data === true)
          {
            alert("your Attendance Marked successfully")
          }
        }
        else{
          alert(response_obj.errorMessage.message)
        }
    }



    useEffect(() => {
      load_teacher_timetable()
    }, [])
  
    return (
      <>
        <CRow className="mb-3">
      <CCol>
        {TimeTables ? (
          TimeTables.map((timetable, index) => (
            <CRow key={index} className="text-center mb-5 justify-content-center">
              <CCol className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <CCard className="">
                  <CCardHeader className="d-flex justify-content-center justify-content-sm-between flex-wrap">
                    <span>Semester - {timetable.division.semester.no}</span>
                    <span>Division - {timetable.division.division_name}</span>
                  </CCardHeader>
                  <CCardBody>
                    <>
                      <CRow className="text-center justify-content-center">
                        <CCol className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className="">
                            <div>
                              <CRow className="flex-column" style={{ padding: '0' }}>
                                {timetable ? (
                                  timetable.schedules.map((item, index) => (
                                    <>
                                      <CCol
                                        className="d-flex align-items-center flex-column"
                                        key={index}
                                      >
                                        <CAlert
                                          className="m-0 rounded-0 w-100 p-2 d-flex justify-content-between align-items-center"
                                          color="primary"
                                          visible={true}
                                          
                                        >
                                          {item.day.toUpperCase()}
                                        </CAlert>
                                        <div className="w-100  rounded-0 border-0">
                                          <CCardBody className="" style={{paddingBottom:"0px"}}>
                                            <CRow className="justify-content-center w-100">
                                              {item.lectures.length > 0 ? (
                                                item.lectures.map((lecture, index) => (
                                                  <CToast
                                                    key={index}
                                                    autohide={false}
                                                    visible={true}
                                                    className="mt-2 w-100"
                                                    
                                                  >
                                                    <CToastHeader className="d-flex flex-wrap justify-content-sm-between justify-content-center">
                                                      <div className="fw-bold mx-2 my-2">
                                                        {lecture.subject.subject_name}
                                                      </div>
                                                        <small className='mx-2 my-2'>
                                                          {lecture.type.toUpperCase()}
                                                        </small>
                                                      <small className='mx-2 my-2'>
                                                        {lecture.start_time.slice(0, 5)} |{' '}
                                                        {lecture.end_time.slice(0, 5)}
                                                      </small>
                                                    </CToastHeader>
                                                    <CToastBody className="d-flex flex-row flex-wrap justify-content-center justify-content-md-between">
                                                      <CRow className='w-100 align-items-center'>
                                                        <CCol className='text-sm-start col-12 col-sm-4 col-lg-4 col-md-4'>
                                                          
                                                        Prof - {lecture.teacher}{' '}
                                                         
                                                        </CCol>
                                                        <CCol className=' text-sm-end col-12 col-sm-4 col-lg-4 col-md-4'>
                                                        <span>
                                                        batches -{' '}
                                                        {lecture.batches.map((batch, index) => (
                                                          <span key={index}>
                                                            {batch.batch_name}
                                                            {index < lecture.batches.length - 1 &&
                                                              ', '}
                                                          </span>
                                                        ))}{' '}
                                                      </span>
                                                        </CCol>
                                                        <CCol className='text-sm-end col-12 col-sm-4 col-lg-4 col-md-4'>
                                                        
                                                        {lecture.classroom.class_name}
                                                      {' '}
                                                        </CCol>
                                                      </CRow>
                                                        <div className='d-flex flex-wrap w-100'>
                                                      <div className='w-100 mt-3'>
                                                      {
                                                            (lecture.session.active === "pre" ||  lecture.session.active === "ongoing") && <button className='btn btn-outline-primary w-100 mt-3' value={lecture.slug} onClick={(e)=> mark_attendance(e.target.value)}>Mark Your Attendance</button>
                                                            
                                                          }
                                                           {
                                                            lecture.session.active === "post" && <button className='btn btn-outline-secondary w-100 mt-3' disabled={true}>Session Ended</button>
                                                            
                                                          }
                                                        </div>
                                                      </div>
                                                      
                                                      
                                                      <div>
                                                        <hr></hr>
                                                      </div>
                                                      
                                                    </CToastBody>
                                                  </CToast>
                                                ))
                                              ) : (
                                                <CToast autohide={false} visible={true}>
                                                  <CToastBody>No Lectures Found</CToastBody>
                                                </CToast>
                                              )}
                                            </CRow>
                                          </CCardBody>
                                        </div>
                                      </CCol>
                                    </>
                                  ))
                                ) : (
                                  <p>no schedule</p>
                                )}
                              </CRow>
                            </div>
                          </div>
                        </CCol>
                      </CRow>
                    </>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          ))
        ) : (
          <CToast animation={false} autohide={false} visible={true} className="mx-auto w-100">
            <CToastHeader className="bg-dark d-flex justify-content-center">
              <img
                src="/static/media/smartroll_logo.a3c3e21d0b4a56919e74.png"
                width={100}
                alt="SmartRoll Logo"
              />
            </CToastHeader>
          </CToast>
        )}
        </CCol>
      
      </CRow>
      </>
    )
}

export default StudentDashboard