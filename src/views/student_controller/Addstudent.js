import { CCard, CCardBody, CCardHeader, CCol, CConditionalPortal, CRow, CFormLabel, CFormSelect, CFormInput } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useAPI from 'src/global_function/useApi'

const Addstudent = () => {

    
    const [Semesters, setSemesters] = useState(null)
    const [fileupload, set_fileupload] = useState(false)
    const [division, set_division] = useState(null)
    const [excel_file , set_excel_file] = useState(null)
    const [sheet_name , set_sheet_name] = useState(null)
    const [division_name,set_division_name] = useState(null)
    const [term,set_term] = useState([])

    // custom hook to handel the request

    const [StoredTokens, CallAPI] = useAPI()

    // functions to handel the requests

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
            alert(response_obj.errorMessage.message)      
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


    const handelFormSubmit = async()=>{
        const formdata = new FormData()
        formdata.append('students.xlsc',excel_file,excel_file.name)
        formdata.append("sheet_name", sheet_name);
        formdata.append("division_slug", division_name);
        const headers = {
            "Content-Type":"multipart/form-data",
            'ngrok-skip-browser-warning': true,
        }
        const axiosInstance = axios.create()
        const response_obj = await CallAPI(StoredTokens,axiosInstance,"/manage/upload_students_data/","post",headers,formdata,null)
        if(response_obj.error === false)
        {
            const response = response_obj.response
            if(response.data.data.register_count > 0){
                alert(`${response.data.data.register_count} student added successfully`)
            }
            else{
                alert(`error count : ${response.data.data.error_count}`)
            }
        }
        else{
            alert(response_obj.errorMessage.message)
        }
    }

    const load_term = async()=>{
        const header = {
          "Content-Typle" :"application/json",
          'ngrok-skip-browser-warning':true
        }
        
        const axiosInstance = axios.create()
        let endpoint = `/manage/get_terms`;let method='get';let headers = header;
        let response_obj = await CallAPI(StoredTokens,axiosInstance,endpoint,method,headers)
        if(response_obj.error === false)
        {
          const response = response_obj.response
          set_term(response.data.data)
        }
        else{
          alert(response_obj.errorMessage.message)
        }
      } 
    // handel the useAEffect state 

    useEffect(() => {
        load_term()
    }, [])

    return (
        <>
            <CRow className="mb-3">
                <CCol>
                {term && (
                        <>
                            <CCard className={`mb-3`}>
                                <CCardHeader>Term</CCardHeader>
                                <CCardBody>
                                    <CFormSelect
                                        aria-label="Default select example"
                                        onChange={(e) => {
                                            load_semester(e.target.value)
                                            
                                        }}
                                    >
                                        <option value="">Select Term</option>
                                        {term.map((item, index) => (
                                            <option key={index} value={item.slug}>
                                                term: {item.start_year} : {item.end_year}
                                            </option>
                                        ))}
                                    </CFormSelect>
                                </CCardBody>
                            </CCard>
                        </>
                    )}
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
                                        onChange={(e)=>{set_fileupload(true); set_division_name(e.target.value)}}
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

                    {fileupload && (
                        <>
                            <CCard className='mt-3'>
                                <CCardHeader>upload File</CCardHeader>
                                <CCardBody>
                                    <CCol xs={12}>
                                    <CFormLabel htmlFor="validationCustom01">Enter Sheet name</CFormLabel>       
                                    <CFormInput type="text" id="validationCustom01" required  onChange={(e)=>{set_sheet_name(e.target.value)}}/>
                                    </CCol>
                                    <CCol xs={12} className='mt-2'>
                                    <CFormLabel htmlFor="validationCustom01">upload excel file</CFormLabel>       
                                    <CFormInput type="file" id="validationCustom01" required onChange={(e)=> set_excel_file(e.target.files[0])}/>
                                    </CCol>
                                    <CCol xs={12} className='mt-3'>
                                        <button className='btn btn-outline-dark form-control' type="button" onClick={()=>{handelFormSubmit()}}>
                                            Submit form
                                        </button>
                                    </CCol>
                                </CCardBody>
                            </CCard>
                        </>
                    )}
                </CCol>
            </CRow>
        </>
    )
}

export default Addstudent
