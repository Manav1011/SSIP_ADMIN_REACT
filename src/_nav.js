import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDrop,
  cilPencil,
  cilAccountLogout,
  cilCalendar,
  cilNotes,
  cilPeople,
  cilLibraryBuilding,
  cilSchool,
  cilClock,
  cilCloudUpload,
  cilFolderOpen,
  //cilSpeedometer,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'
import { useContext } from 'react'

const _nav = {
  superadmin_role: [
    {
      component: CNavTitle,
      name: 'ADMNISTRATION',
    },
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/superadmin',
      icon: <CIcon icon={cilLibraryBuilding} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Manage Events',
      to: '/superadmin/events',
      icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Logout',
      to: '/logout',
      icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
    },
  ],
  admin_role: [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/',
      icon: <CIcon icon={cilLibraryBuilding} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Subject',
      to: '/subject',
      icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Teachers',
      to: '/manage-teachers',
      icon: <CIcon icon={cilSchool} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Add Student',
      to: '/addstudent',
      icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Timetable',
      to: '/timetable',
      icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Attendance History',
      to: '/attendance-history',
      icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Ongoing Events',
      to: '/ongoing-events',
      icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Logout',
      to: '/logout',
      icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
    },
  ],
  teacher_role: [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/teacher/dashboard',
      icon: <CIcon icon={cilLibraryBuilding} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'LectureHistory',
      to: '/teacher/lectures/history',
      icon: <CIcon icon={cilClock} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Additional Features',
      to: '/teacher/lectures/additional-features',
      icon: <CIcon icon={cilClock} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Upload Materials',
      to: '/teacher/upload-materials',
      icon: <CIcon icon={cilCloudUpload} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Ongoing Events',
      to: '/ongoing-events',
      icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Upload Results',
      to: '/upload-results',
      icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Logout',
      to: '/logout',
      icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
    },
  ],
  student_role: [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/studentdashboard',
      icon: <CIcon icon={cilLibraryBuilding} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Surveys',
      to: '/surveys',
      icon: <CIcon icon={cilClock} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Ongoing Events',
      to: '/ongoing-events',
      icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'View Materials',
      to: '/view-materials',
      icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Exam Results',
      to: '/exam-results',
      icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Logout',
      to: '/logout',
      icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
    },
  ],
}

export default _nav
