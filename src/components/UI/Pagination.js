import React from 'react'
import classes from './Pagination.module.css'
const Pagination = (props) => {
  const { setPageNumber, pageNumber, itemLimit, setFirstLoaded } = props
  const totalPages = Math.ceil(props.itemNum / itemLimit)
  const handlePrevPage = () => {
    setFirstLoaded(false)
    setPageNumber(pageNumber - 1)
  }
  const handleNextPage = () => {
    setFirstLoaded(false)
    setPageNumber(pageNumber + 1)
  }
  return (
    <div className={classes.pagination}>
      <button
        disabled={pageNumber <= 1}
        onClick={handlePrevPage}
        className={pageNumber <= 1 ? classes.disableButton : classes.button}
      >
        Prev
      </button>

      <span>  {pageNumber} </span>
      <button
        disabled={pageNumber >= totalPages}
        onClick={handleNextPage}
        className={pageNumber >= totalPages ? classes.disableButton : classes.button}
      >
        Next
      </button>
    </div >
  )
}

export default Pagination
