import { useContext } from 'react'
import { CAlert, CCardHeader, CCard, CCardBody, CCardFooter } from '@coreui/react'
import { Store } from 'src/views/forms/validation/store'
function Results() {
  const { state } = useContext(Store)
  const { notifications } = state
  return (
    <>
      <CAlert
        className="m-0 rounded-0 w-100 p-2 d-flex justify-content-between align-items-center mb-2"
        color="primary"
        visible={true}
      >
        Exam Results
      </CAlert>
      <div>
        {notifications?.results.length > 0 &&
          notifications?.results.map((result, index) => (
            <CCard className="my-4" key={index}>
              <CCardHeader>
                <h5 className="mb-2 text-xl font-semibold tracking-tight text-dark">
                  Subject - {result.subject.subject_name}
                </h5>
                <span className="mb-2 text-sm font-medium tracking-tight text-dark">
                  Remarks - {result.remarks}
                </span>
              </CCardHeader>
              <CCardBody>
                <p className="font-bold dark:text-black">
                  Gained Marks - {result.gained_marks} / {result.total_marks}
                </p>
              </CCardBody>
              <CCardFooter>Datetime - {result.created_at}</CCardFooter>
            </CCard>
          ))}
      </div>
    </>
  )
}

export default Results
