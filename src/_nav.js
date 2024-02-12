import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDrop,
  cilPencil,
  cilAccountLogout
  //cilSpeedometer,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'
import { useContext } from 'react'






const _nav = {
  admin_role:[
    {
      component: CNavTitle,
      name: 'ADMNISTRATION',
    },
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/',
      icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Subject',
      to: '/subject',    
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Teachers',
      to: '/manage-teachers',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Add Student',
      to: '/addstudent',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Timetable',
      to: '/timetable',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Logout',
      to: '/logout',    
      icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
    },  
      
  ],
  teacher_role:[
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/teacherdashboard',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Logout',
      to: '/logout',    
      icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
    },
  ],
  student_role:[
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/studentdashboard',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    }, 
    {
      component: CNavItem,
      name: 'Logout',
      to: '/logout',    
      icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
    },
  ]
}

export default _nav
