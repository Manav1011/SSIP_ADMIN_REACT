import React, { useEffect, useState, useRef, useContext } from 'react'
import axios from 'axios'
import useAPI from 'src/global_function/useApi'
import CIcon from '@coreui/icons-react'
import { cilBook, cilCalendar, cilPencil, cilUser } from '@coreui/icons'
import { Store } from 'src/views/forms/validation/store'

const ChatBox = ({ visible, setVisible }) => {
  const [StoredTokens, CallAPI] = useAPI()

  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [subjects, setSubjects] = useState([])
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedMarks, setSelectedMarks] = useState(null)
  const [error, setError] = useState(null)
  const [showOptions, setShowOptions] = useState(true)
  const [currentQuery, setCurrentQuery] = useState(null)
  const { state } = useContext(Store)
  const { profileDetails } = state
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    console.log(profileDetails)
  }, [])
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Predefined messages
  const predefinedMessages = [
    { text: 'Attendance', response: 'You want to know about the attendance of which subject?' },
    { text: 'Marks', response: "Which subject's marks would you like to know about?" },
    {
      text: 'Materials',
      response: `You can check the latest material at View Materials page.`,
    },
    {
      text: 'Exam Results',
      response: 'Security in tech is about protecting systems, networks, and data from attacks.',
    },
    {
      text: 'Ongoing Events',
      response:
        'Interview preparation involves practicing coding problems, system design, and more.',
    },
  ]

  const fetchSubjects = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': true,
      }
      const response_obj = await CallAPI(
        StoredTokens,
        axios.create(),
        '/manage/get_subjects_of_student',
        'get',
        headers,
        null,
        null,
      )
      if (!response_obj.error) {
        const data = response_obj.response?.data?.data
        setSubjects(data)
        setError(null)
      } else {
        setError('Failed to fetch subjects. Please try again.')
      }
    } catch (e) {
      setError('An error occurred while fetching subjects. Please try again.')
    }
  }

  const fetchAttendance = async (slug) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': true,
      }
      const response_obj = await CallAPI(
        StoredTokens,
        axios.create(),
        `/manage/chatbot/get_student_attendance_detail_for_subject/${slug}`,
        'get',
        headers,
        null,
        null,
      )
      if (!response_obj.error) {
        const data = response_obj.response?.data?.data
        console.log(data)
        setSelectedSubject(data)
        setMessages((prev) => [...prev, { type: 'bot', content: 'Here is your attendance report' }])
        setError(null)
      } else {
        setError('No attendance details found for this subject. Please choose another subject.')
      }
    } catch (e) {
      setError('An error occurred while fetching attendance. Please try again.')
    }
  }

  const fetchMarks = async (slug) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': true,
      }
      const response_obj = await CallAPI(
        StoredTokens,
        axios.create(),
        `/manage/chatbot/get_result_of_student_by_subject/${slug}`,
        'get',
        headers,
        null,
        null,
      )
      if (!response_obj.error) {
        const data = response_obj.response?.data?.data
        setSelectedMarks(data)
        console.log(data)
        setMessages((prev) => [...prev, { type: 'bot', content: 'Here is your marks report' }])
        setError(null)
      } else {
        setError('No marks details found for this subject. Please choose another subject.')
      }
    } catch (e) {
      setError('An error occurred while fetching marks. Please try again.')
    }
  }

  const handleSubjectSelection = async (slug) => {
    setIsLoading(true)
    if (currentQuery === 'Attendance') {
      await fetchAttendance(slug)
    } else if (currentQuery === 'Marks') {
      await fetchMarks(slug)
    }
    setIsLoading(false)
    setShowOptions(true)
  }

  const handleMessageClick = (message) => {
    setIsLoading(true)
    setMessages((prev) => [...prev, { type: 'user', content: message.text }])

    setTimeout(() => {
      if (message.text === 'Attendance' || message.text === 'Marks') {
        setMessages((prev) => [...prev, { type: 'bot', content: message.response }])
        fetchSubjects()
        setShowOptions(false)
        setCurrentQuery(message.text)
        setSelectedSubject(null)
        setSelectedMarks(null)
      } else {
        setMessages((prev) => [...prev, { type: 'bot', content: message.response }])
        setShowOptions(true)
      }
      setIsLoading(false)
    }, 1000)
  }

  const getColorForPercentage = (percentage) => {
    if (percentage >= 75) return 'text-green-500'
    if (percentage >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  if (!visible) return null

  return (
    <div className="fixed right-4 md:right-10  bg-gray-900 p-4 md:p-6 rounded-2xl border border-gray-700 w-[90%] md:w-[440px] h-[90vh] md:h-[600px] bottom-4 md:bottom-18 shadow-lg transition-all duration-300 ease-in-out opacity-100 flex flex-col ">
      <div className="flex justify-between items-center pb-4 border-b border-gray-700">
        <div>
          <h2 className="font-bold tracking-tight text-2xl text-white">EduMate</h2>
          <p className="text-sm text-blue-400">Your Partner in Personalized Learning</p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="flex-grow overflow-y-auto pr-4 space-y-4 my-4">
        {messages.length === 0 && (
          <div className="daisychat daisychat-start">
            <div className="daisychat-image avatar">
              <div className="w-10 rounded-full bg-gray-700 p-1">
                <img alt="ChatBot" src="./images/chatbot.png" className="rounded-full" />
              </div>
            </div>
            <div className="daisychat-bubble bg-gray-800 text-white">
              Welcome,{' '}
              <span className="text-blue-400 font-semibold">
                {profileDetails?.obj?.profile?.name.substring(0, 5) +
                  ' ' +
                  profileDetails?.obj?.profile?.name.substring(19, 24)}
              </span>
              . Select one of the options to get started.
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            className={`daisychat ${message.type === 'user' ? 'daisychat-end' : 'daisychat-start'}`}
            key={index}
          >
            <div className="daisychat-image avatar">
              <div className="w-10 rounded-full bg-gray-700 p-1">
                {message.type === 'user' ? (
                  <img alt="User" src="./images/profile.svg" className="rounded-full" />
                ) : (
                  <img alt="ChatBot" src="./images/chatbot.png" className="rounded-full" />
                )}
              </div>
            </div>
            <div
              className={`daisychat-bubble ${
                message.type === 'user' ? 'bg-blue-600' : 'bg-gray-800'
              } text-white`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {/* Selected Subject Data for Attendance */}
        {selectedSubject && (
          <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden mt-4 text-white">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4 flex-col">
                <h3 className="text-lg font-semibold">{profileDetails?.obj?.profile?.name}</h3>
              </div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{selectedSubject.subject_name}</h3>
                <div
                  className={`text-2xl font-bold ${getColorForPercentage(
                    parseFloat(selectedSubject.attendance_percentage),
                  )}`}
                >
                  <h3 className="text-lg font-semibold">{selectedSubject.subject_name}</h3>
                  {selectedSubject.attendance_percentage}%
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="mr-3 p-2 bg-blue-900 rounded-full">
                    <CIcon icon={cilBook} size="xl" className="text-blue-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-400">Attended</p>
                    <p className="text-lg font-semibold">{selectedSubject.attended_lec}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 p-2 bg-purple-900 rounded-full">
                    <CIcon icon={cilCalendar} size="xl" className="text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-400">Total</p>
                    <p className="text-lg font-semibold">{selectedSubject.total_lectures}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-2 bg-gray-700">
              <div
                className={`h-full ${getColorForPercentage(
                  parseFloat(selectedSubject.attendance_percentage),
                )}`}
                style={{ width: `${selectedSubject.attendance_percentage}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Selected Subject Data for Marks */}
        {selectedMarks &&
          selectedMarks.map((marks, index) => (
            <div
              className="bg-gray-800 rounded-lg shadow-md overflow-hidden mt-4 text-white"
              key={index}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{marks?.subject?.subject_name}</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="mr-3 p-2 bg-green-900 rounded-full">
                      <CIcon icon={cilPencil} size="xl" className="text-green-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-400">Gained Marks</p>
                      <p className="text-lg font-semibold">
                        {marks.gained_marks}/{marks.total_marks}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3 p-2 bg-indigo-900 rounded-full">
                      <CIcon icon={cilBook} size="xl" className="text-indigo-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-400">Subject Credit</p>
                      <p className="text-lg font-semibold">{marks?.subject?.credit}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-2 bg-gray-700">
                <div
                  className={`h-full ${getColorForPercentage(marks.percentage)}`}
                  style={{ width: `${marks.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-900 border border-red-700 text-red-100 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        <div ref={messagesEndRef} />

        {/* Predefined Message Options */}
        {!isLoading && showOptions && (
          <div className="daisychat daisychat-start">
            <div className="daisychat-image avatar">
              <div className="w-10 rounded-full bg-gray-700 p-1">
                <img alt="EduMate chatbot" src="./images/chatbot.png" className="rounded-full" />
              </div>
            </div>
            <div className="daisychat-bubble bg-gray-800 text-white">
              <p className="mb-2">Select an option:</p>
              <div className="grid grid-cols-2 gap-2">
                {predefinedMessages.map((message, index) => (
                  <button
                    key={index}
                    onClick={() => handleMessageClick(message)}
                    className="bg-gray-700 hover:bg-gray-600 text-white text-xs md:text-sm py-2 px-3 rounded-lg transition-colors duration-200"
                  >
                    {message.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Subject Selection */}
        {subjects.length > 0 && !selectedSubject && !selectedMarks && !showOptions && (
          <div className="daisychat daisychat-start">
            <div className="daisychat-image avatar">
              <div className="w-10 rounded-full bg-gray-700 p-1">
                <img alt="EduMate chatbot" src="./images/chatbot.png" className="rounded-full" />
              </div>
            </div>
            <div className="daisychat-bubble bg-gray-800 text-white">
              <p className="mb-2">Select a subject:</p>
              <div className="grid grid-cols-2 gap-2">
                {subjects.map((sub) => (
                  <button
                    key={sub.slug}
                    onClick={() => handleSubjectSelection(sub.slug)}
                    className="bg-gray-700 hover:bg-gray-600 text-white text-xs md:text-sm py-2 px-3 rounded-lg transition-colors duration-200"
                  >
                    {sub.subject_name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  )
}

export default ChatBox
