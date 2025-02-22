import React from 'react';
import {useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import FilterSidebar from '../components/filterSidebar.jsx';
import ProductsContainer from '../components/productsContainer.jsx';

function Products(){
    const [filter, setFilter]=useState('');
    console.log(filter);
    return <div className='flex m-8'>
            <FilterSidebar setFilter={setFilter}></FilterSidebar>
            <ProductsContainer filter={filter}></ProductsContainer>
        </div>
}
export default Products;