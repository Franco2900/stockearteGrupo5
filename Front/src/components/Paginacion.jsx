import  {Pagination} from 'react-bootstrap';
export default function Pagicacion({handlePageChange, handlePreviousPage, handleNextPage, data,activePage,itemsPerPage}){
    return (<>
        {/*PAGINACION */}
        <Pagination className='Pagination'>
          <Pagination.Prev onClick={handlePreviousPage} />
          {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === activePage}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={handleNextPage} />
        </Pagination>
    </>)
}