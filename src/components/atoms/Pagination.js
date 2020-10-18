import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display:flex;
    margin-top:8px;
    justify-content:flex-end;
`

export const Pagination = ({ pagination }) => {
    const { next, previous, setPage, page } = pagination || {}
    const onNext = () => next ? setPage(page + 1) : null
    const onPrevious = () => previous ? setPage(page - 1) : null
    return (
        <Container>
            <ul className='pagination'>
                <li onClick={onPrevious} className={`paginate_button page-item previous ${!previous ? 'disabled' : ''}`}>
                    <i className='page-link bx bx-left-arrow' style={{ color: !previous ? '#828D99' : '#5A8DEE' }} />
                </li>
                <li className='paginate_button page-item active' style={{ marginRight: 5 }}>
                    <div className='page-link'>{page}</div>
                </li>
                <li onClick={onNext} className={`paginate_button page-item previous ${!next ? 'disabled' : ''}`}>
                    <i className='page-link bx bx-right-arrow' style={{ color: !next ? '#828D99' : '#5A8DEE' }} />
                </li>
            </ul>
        </Container>
    )
}