import { Pagination } from "antd";
import { useState } from "react";
 

const Paginate = ({ datas, allFetchMovies }) => {
const {total_results} = datas
 const [current, setCurrent] = useState(1);
 const handlePaginate = (numbers) => { 
    setCurrent(numbers)
    allFetchMovies(numbers)
 }
   return ( 
    <> 
       <Pagination defaultCurrent={1} total={total_results} onChange={handlePaginate} current={current} className="paginate"/>
    </>
   )
};

export default Paginate;
