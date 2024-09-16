import React, { useEffect, useState } from 'react'
import {
  COffcanvasBody,
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop } from '@coreui/icons'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import useAPI from 'src/global_function/useApi'
const ViewMaterials = () => {
  const {
    register,
    formState: { errors },
  } = useForm()

  const [StoredTokens, CallAPI] = useAPI()
  const [subjects, setSubjects] = useState([])
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedSubjectName, setSelectedSubjectName] = useState('')
  const [files, setFiles] = useState([])
  const [openDropdowns, setOpenDropdowns] = useState({})

  const handleChange = (event) => {
    const selectedValue = event.target.value
    const selectedText = event.target.options[event.target.selectedIndex].text
    setSelectedSubject(selectedValue)
    setSelectedSubjectName(selectedText)
  }

  useEffect(() => {
    console.log(selectedSubjectName)
    console.log(selectedSubject)
  }, [selectedSubject, selectedSubjectName])

  const toggleDropdownLinks = (index) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  useEffect(() => {
    const handleSubject = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': true,
        }
        const axiosInstance = axios.create()
        const response_obj = await CallAPI(
          StoredTokens,
          axiosInstance,
          '/manage/get_subjects_of_student',
          'get',
          headers,
          null,
        )
        if (response_obj.error === false) {
          const response = response_obj.response
          const data = response?.data?.data
          setSubjects(data)
          console.log(data)
        }
      } catch (e) {
        console.log(e)
      }
    }
    handleSubject()
  }, [])

  useEffect(() => {
    const showFiles = async () => {
      if (selectedSubject) {
        try {
          const headers = {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': true,
          }
          const axiosInstance = axios.create()
          const response_obj = await CallAPI(
            StoredTokens,
            axiosInstance,
            `/manage/additional_features/get_study_material_for_students/${selectedSubject}`,
            'get',
            headers,
            null,
            null,
          )
          if (response_obj.error === false) {
            const response = response_obj.response
            const data = response?.data?.data
            setFiles(data)
            console.log(data)
          }
        } catch (e) {
          console.log(e)
        }
      }
    }
    showFiles()
  }, [selectedSubject])

  return (
    <div>
      <COffcanvasBody className="rounded-lg shadow-2xl shadow-gray-800/30">
        <CCard className="shadow-lg rounded-lg border border-gray-200">
          <CCardHeader className="bg-black/40 text-white text-2xl py-4 rounded-t-lg">
            View Materials
          </CCardHeader>
          <CCardBody className="p-6">
            <form className="space-y-4" autoComplete="off">
              {/* Select Subject */}
              <div className="mb-4">
                <label className="form-label text-lg font-semibold">Select Subject</label>
                <select
                  {...register('subject', { required: 'Subject is required' })}
                  className="form-control shadow-sm focus:ring focus:ring-yellow-500 focus:ring-opacity-50 w-full border-gray-300 rounded-md cursor-pointer"
                  onChange={handleChange}
                >
                  <option value="" selected disabled hidden className="text-gray-200 ">
                    Choose Subject
                  </option>

                  {subjects.map((subject, index) => (
                    <option key={index} value={subject.slug} className="cursor-pointer  ">
                      {subject.subject_name}
                    </option>
                  ))}
                </select>
                {errors.subject && (
                  <p className="text-red-500 mt-1 text-sm">{errors.subject.message}</p>
                )}
              </div>
            </form>
          </CCardBody>
          <CCol xs>
            {selectedSubject && (
              <CCard className="mb-4 border-none">
                <CCardBody className="transition ease-in-out duration-150">
                  <CTable align="middle" className="mb-0 border text-center" hover responsive>
                    <CTableHead color="light">
                      <CTableRow>
                        <CTableHeaderCell>Sr.No</CTableHeaderCell>
                        <CTableHeaderCell>Title</CTableHeaderCell>
                        <CTableHeaderCell>Link</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {files.length > 0 ? (
                        files.length > 0 &&
                        files.map((file, index) => (
                          <CTableRow v-for="item in tableItems" key={index}>
                            <CTableDataCell>
                              <div className="text-center">{index + 1}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div className="text-center">{file.title}</div>
                            </CTableDataCell>

                            <CTableDataCell>
                              <div className="text-center">
                                <CCardHeader
                                  className="cursor-pointer rounded-lg border"
                                  onClick={() => toggleDropdownLinks(index)}
                                >
                                  <div className="d-flex flex-wrap justify-between">
                                    <div>
                                      <strong>Links</strong>
                                    </div>
                                    {openDropdowns[index] ? (
                                      <CIcon
                                        icon={cilArrowCircleTop}
                                        size="xl"
                                        className="hover:scale-125 ease-in-out transition-all duration-150 cursor-pointer"
                                      />
                                    ) : (
                                      <CIcon
                                        icon={cilArrowCircleBottom}
                                        size="xl"
                                        className="hover:scale-125 ease-in-out transition-all duration-150 cursor-pointer"
                                      />
                                    )}
                                  </div>
                                </CCardHeader>

                                {openDropdowns[index] && (
                                  <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                                    <CTable
                                      align="middle"
                                      className="mb-0 border text-center"
                                      hover
                                      responsive
                                    >
                                      <CTableBody className="w-20">
                                        {file?.links?.map((link, linkIndex) => (
                                          <CTableRow key={linkIndex}>
                                            <CTableDataCell>
                                              <a
                                                href={link.link}
                                                target="_blank"
                                                className="text-primary"
                                                rel="noopener noreferrer"
                                              >
                                                {link?.filename?.length > 10
                                                  ? link?.filename?.slice(0, 10) + '...'
                                                  : link?.filename}
                                              </a>
                                            </CTableDataCell>
                                          </CTableRow>
                                        ))}
                                      </CTableBody>
                                    </CTable>
                                  </div>
                                )}
                              </div>
                            </CTableDataCell>
                          </CTableRow>
                        ))
                      ) : (
                        <CTableDataCell colSpan="3">
                          <div className="text-center">
                            No Materials found for{' '}
                            <span className="text-red-400 font-bold">{selectedSubjectName}</span>
                          </div>
                        </CTableDataCell>
                      )}
                      <CTableRow v-for="item in tableItems"></CTableRow>
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            )}
          </CCol>
        </CCard>
      </COffcanvasBody>
    </div>
  )
}

export default ViewMaterials
