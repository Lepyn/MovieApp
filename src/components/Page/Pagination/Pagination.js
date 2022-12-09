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
    <div className="footer paginate"> 
       <Pagination showSizeChanger={false} defaultPageSize={20} defaultCurrent={1} total={total_results} onChange={handlePaginate} current={current}/>
    </div>
   )
};

export default Paginate;
