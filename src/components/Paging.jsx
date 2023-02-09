import React from "react"

const Paging = ({ itemPerPage, totalItem, selectedPage, onPaging }) => {
    const pages = []

    for (let idx = 1; idx <= Math.ceil(totalItem / itemPerPage); idx++) {
        pages.push(idx)
    }

    return (
        <nav>
            <ul className='pagination'>
                {pages.map(item => (
                    <li key={item} className={selectedPage === item ? "page-item active" : "page-item"}>
                        <a onClick={() => onPaging(item)} href='#' className='page-link'>
                            {item}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
  )
}

export default Paging