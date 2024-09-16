import React from 'react'

function AddSurveyButton({ setVisible }) {
  return (
    <div
      className="fixed bottom-0 right-0 w-16 h-16 mr-12 mb-8 cursor-pointer"
      id="box_btn"
      onClick={() => {
        setVisible(true)
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={60}
        height={60}
        fill="currentColor"
        className="bi bi-plus-circle-fill"
        viewBox="0 0 16 16"
      >
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
      </svg>
    </div>
  )
}

export default AddSurveyButton
