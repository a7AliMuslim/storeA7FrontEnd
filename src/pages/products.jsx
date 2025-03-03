import React from 'react';
import {useState} from 'react';
import FilterSidebar from '../components/filterSidebar.jsx';
import ProductsContainer from '../components/productsContainer.jsx';
import {useLocation} from 'react-router-dom';

function Products(){
    const location=useLocation();
    const [state, setState]=useState(location.state||'');
    const [filter, setFilter]=useState('');
    
    return <div className='flex m-8'>
            <FilterSidebar setFilter={setFilter} state={state}></FilterSidebar>
            <ProductsContainer filter={filter}></ProductsContainer>
        </div>
}
export default Products;