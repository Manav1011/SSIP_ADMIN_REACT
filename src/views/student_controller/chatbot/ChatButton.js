import React from 'react'

function ChatButton({ setVisible, visible }) {
  return (
    <>
      <div className="fixed bottom-4 right-4 md:bottom-2 md:right-8 z-50 ">
        <div className="relative ">
          {!visible && (
            <div>
              <div className="absolute left-12 inset-0 z-50 border-4 border-green-400 w-3 h-3 blur-sm animate-ping rounded-full  opacity-100  transition-all duration-1000 ease-in-out"></div>
              <div className="absolute z-50 left-12 inset-0 bg-green-300 w-4 h-4 rounded-full opacity-70 transition-all duration-1000 ease-in-out animate-pulse"></div>
            </div>
          )}
          <button
            className={`relative bg-gray-900 transition-all duration-300 ease-linear hover:bg-blue-950 text-white rounded-full p-3 md:p-4 shadow-lg  focus:outline-none focus:ring-2 focus:ring-blue-300 border-2 border-zinc-400
              ${visible && 'transition-all duration-300 ease-in-out scale-110 rotate-12'}
              `}
            onClick={() => setVisible((prev) => !prev)}
            aria-label="Open chat"
          >
            <img src="./images/chat_icon.png" className="w-6 h-6 md:w-7 md:h-7 " alt="Chat icon" />
          </button>
        </div>
      </div>
    </>
  )
}

export default ChatButton
