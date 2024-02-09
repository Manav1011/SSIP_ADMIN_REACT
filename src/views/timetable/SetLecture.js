import React, { useState,useRef,useEffect} from 'react'
import {
  COffcanvas,  
  COffcanvasBody,  
  CAlert,
} from '@coreui/react'
import { useForm } from "react-hook-form"

function SetLecture({ visible, setVisible, sechedule, lectureConfigs }) {    
  const [Classrooms, setClassroom] = useState(lectureConfigs.classrooms)
  const [Subjects, setSubjects] = useState(lectureConfigs.subjects)
  const [Teachers, setTeachers] = useState(lectureConfigs.teachers)
  const [Batches, setBatches] = useState(lectureConfigs.batches)
  const lectureForm = useRef()
  const { register, handleSubmit } = useForm();
  const handleFormSubmit = (data) => {
      console.log(data)
  };
useEffect(() => {
  console.log(lectureForm.current);
}, [lectureForm])

  return (
    <>
      <COffcanvas
        className="card w-100"
        placement="end"
        visible={visible}
        onHide={() => setVisible(false)}
        data-coreui-backdrop="static"
      >
        <CAlert
          color="success"
          visible={true}
          className="justify-content-between align-items-center d-flex"
        >
          {sechedule.day.toUpperCase()}
          <svg
            onClick={() => setVisible(false)}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </CAlert>
        <COffcanvasBody>
          <form className="container" onSubmit={handleSubmit(handleFormSubmit)} ref={lectureForm}>
            <div className="mb-3">
              <label className="form-label">Start Time</label>
              <input type="time" className="form-control" required  {...register("start_time")}/>
            </div>
            <div className="mb-3">
              <label className="form-label">End Time</label>
              <input type="time" className="form-control" required {...register("end_time")}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Select Lecture Type</label>
              <select className="form-select" aria-label="Default select example" required {...register("type")}>
                <option value="">....</option>
                <option value={'lecture'}>Lecture</option>
                <option value={'lab'}>Lab</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Select Classroom</label>
              <select className="form-select" aria-label="Default select example" {...register("classroom")}>
                <option value="">....</option>
                {Classrooms &&
                  Classrooms.map((item, index) => (
                    <option key={index} value={item.slug}>
                      {item.class_name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Select Subject</label>
              <select className="form-select" aria-label="Default select example" {...register("subject")}>
                <option value="">....</option>
                {Subjects &&
                  Subjects.map((item, index) => (
                    <option key={index} value={item.slug}>
                      {item.subject_name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Select Teacher</label>
              <select className="form-select" aria-label="Default select example" {...register("teacher")}>
                <option value="">....</option>
                {Teachers &&
                  Teachers.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.profile.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Select Batch</label>
              <select multiple class="form-select" size="3" aria-label="size 3 select example" {...register("batches")}> 
                {Batches &&
                  Batches.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.batch_name}
                  </option>
                  ))}
              </select>
            </div>            
              <button type="submit" className="form-control btn-outline-success btn mb-3">
                Submit
              </button>                        
            <button type="button" className="form-control btn-outline-success btn" onClick={() => {lectureForm.current?.reset()}}>
                Clear
            </button>            
          </form>
        </COffcanvasBody>
      </COffcanvas>
    </>
  )
}

export default SetLecture
