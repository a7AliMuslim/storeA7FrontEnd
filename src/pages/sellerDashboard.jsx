import axios from 'axios';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Button, Tabs, Tab, Typography, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import PostProduct from '../components/postProduct';
import ProductsStatus from '../components/productsStatus';
import SellerBio from '../components/sellerBio';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, lime, purple } from '@mui/material/colors';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
const theme = createTheme({
  palette: {
    primary: {
        main:grey[200],
        light:grey[100],
        dark:grey[400],
        contrastText: grey[800],
    },
    info:{
        main:grey[200],
    },
    
  },
});

axios.defaults.headers.patch['Authorization'] = `Bearer ${localStorage.getItem('key')}`
function SellerDashboard(){
    const [seller, setSeller]=useState(JSON.parse(localStorage.getItem('seller') || null));
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!seller){
            navigate('/becomeSeller');
        }
    });
    const [quantities, setQuantities]=useState([]);
    const submitHandler=async ()=>{
        const prod={
            title:document.getElementById('title').value,
            price:document.getElementById('price').value,
            category:document.getElementById('category').value,
            miniDescription:document.getElementById('miniDescription').value,
            description:document.getElementById('description').value,
            quality:document.getElementById('quality').value,
            quantities:quantities,
        }
        console.log(prod);
        const jsonProd=JSON.stringify(prod);
        console.log(jsonProd);
        const prodBlob=new Blob([jsonProd],{type: "application/json"});
        const formData=new FormData();
        formData.append('productImage',document.getElementById('imageInput').files[0]);
        formData.append('prodBlob', prodBlob, 'prodBlob.json');
        console.log(formData);
        const response= await axios.patch('http://localhost:3002/api/v1/products/withImage', formData, {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }).catch(err=>console.log(err));
        console.log(response);
    }
    const quantityAddHandler=()=>{
        const color=document.getElementById('color').value;
        const size=document.getElementById('size').value;
        const quantity=document.getElementById('quantity').value;
        
        const matchingDetails=quantities.find(qt=>{
            if(qt.attributesPair.color==color && qt.attributesPair.size==size){
                return true;
            }else{
                return false;
            }
        });
        if(matchingDetails){
            const oldVal=Number(matchingDetails.qty);
            const newVal=Number(quantity);
            matchingDetails.qty=oldVal+newVal+'';
        }else{
            quantities.push({
                qty:quantity,
                attributesPair:{
                    color,
                    size,
                }
            });
        }
        
        console.log(quantities)
    }
    const handleChange = (event, newValue) => {
    setValue(newValue);
  }
    
    return <>
            <div className='flex w-full h-full'>
            <ThemeProvider theme={theme}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                    className='shrink-0'
                  >
                    <Tab label="Post product " {...a11yProps(0)} />
                    <Tab label="Products status" {...a11yProps(1)} />
                    <Tab label="Seller bio" {...a11yProps(2)} />
                    <Tab label="Item Four" {...a11yProps(3)} />
                    <Tab label="Item Five" {...a11yProps(4)} />
                    <Tab label="Item Six" {...a11yProps(5)} />
                    <Tab label="Item Seven" {...a11yProps(6)} />
                  </Tabs>
              </ThemeProvider>
              <TabPanel value={value} index={0} className='grow'>
                <PostProduct/>
              </TabPanel>
              <TabPanel value={value} index={1} className='grow'>
                <ProductsStatus/>
              </TabPanel>
              <TabPanel value={value} index={2} className='grow'>
                <SellerBio/>
              </TabPanel>
              <TabPanel value={value} index={3} className='grow'>
                Item Four
              </TabPanel>
              <TabPanel value={value} index={4} className='grow'>
                Item Five
              </TabPanel>
              <TabPanel value={value} index={5} className='grow'>
                Item Six
              </TabPanel>
              <TabPanel value={value} index={6} className='grow'>
                Item Seven
              </TabPanel>
              </div>
            
        </>
}
export default SellerDashboard;