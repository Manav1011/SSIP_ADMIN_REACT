import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useEffect, useContext , useState} from 'react'
import { Store } from 'src/views/forms/validation/store'
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AppHeaderDropdown = () => {
  const navigate = useNavigate()  
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { profileDetails } = state
  const [adminEmail, setadminEmail] = useState("");
  
  useEffect(() => {
    if(profileDetails){
      setadminEmail(profileDetails.obj.profile.email)
    }
  }, [profileDetails]);
  const logoutAdmin = () => {
        
        localStorage.clear()
        navigate("/login")
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
      <div className="text-medium-emphasis">{adminEmail}</div>
      </CDropdownToggle>              
    </CDropdown>
  )
}

export default AppHeaderDropdown
