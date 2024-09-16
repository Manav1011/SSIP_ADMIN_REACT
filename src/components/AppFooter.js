import React, { useState } from 'react'
import { CFooter } from '@coreui/react'
import ChatButton from 'src/views/student_controller/chatbot/ChatButton'
import ChatBox from 'src/views/student_controller/chatbot/ChatBox'
import { useContext } from 'react'
import { Store } from 'src/views/forms/validation/store'
const AppFooter = () => {
  const [visible, setVisible] = useState(false)
  const { state } = useContext(Store)
  const { profileDetails } = state
  return (
    <CFooter className="border-none">
      <div className="mx-auto">
        {/* <span className="ms-1">Powered by</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          SmartRoll
         
        </a> */}

        {profileDetails.obj.profile.role === 'student' && (
          <ChatButton setVisible={setVisible} visible={visible} />
        )}
        <ChatBox visible={visible} setVisible={setVisible} />
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
