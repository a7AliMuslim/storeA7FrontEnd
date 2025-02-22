import { Button, Modal, Box, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, lime, purple } from '@mui/material/colors';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import{useState} from 'react';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
  p: 4,
};

function checkValidity(str){
    console.log('A-Z',/[A-Z]/g.test(str));
    console.log('a-z',/[a-z]/g.test(str));
    console.log('0-9',/[0-9]/g.test(str));
    if(/[A-Z]/g.test(str) && /[a-z]/g.test(str) && /[0-9]/g.test(str)){
        return true;
    }
    return false;
}
function SellerPasswordChangeModal({passwordModalOpen, setPasswordModalOpen}){
    const [oldPassword, setOldPassword]=useState('');
    const [newPassword, setNewPassword]=useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [oldPasswordColor, setOldPasswordColor]= useState('primary');
    const [newPasswordColor, setNewPasswordColor]= useState('primary');
    const [buttonColor, setButtonColor]=useState('primary');
    const handlePasswordModalOpen=()=>{
        setPasswordModalOpen(false);
    };
    const oldPasswordChangeHandler=(event)=>{
        const value=event.currentTarget.value;
        const check=checkValidity(value)
        console.log(value.length<8 && check)
        if(value.length>8 && check){
            setOldPasswordColor('primary');
        }else{
            setOldPasswordColor('error');
        }
        setOldPassword(value);
    };
    const newPasswordChangeHandler=(event)=>{
        const value=event.currentTarget.value;
        const check=checkValidity(value)
        console.log(value.length<8 && check)
        if(value.length>8 && check){
            setNewPasswordColor('primary');
        }else{
            setNewPasswordColor('error');
        }
        setNewPassword(value);
    };
    const checkOldPassword=(event)=>{
//        console.log(oldPassword);
    }
    const uploadChangeRequest=async (oldPassword, newPassword)=>{
        const sellerToken=await JSON.parse(localStorage.getItem('seller')).sellerToken;
        axios.defaults.headers.patch['Authorization'] = `Bearer ${sellerToken}`;
        const response=await axios.patch('http://localhost:3002/api/v1/seller/updateSellerPassword',{oldPassword,newPassword});
        console.log(response.data);
    }
    const submitChange=()=>{
        if(newPasswordColor=='error' || newPassword=='' || oldPasswordColor=='error' || oldPassword==''){
            setButtonColor('error');
            console.log('error');
            return;
        }
        setButtonColor('primary');
        uploadChangeRequest(oldPassword,newPassword);
        setOldPassword('');
        setNewPassword('');
        
        
    }
    const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };
    
    return              <Modal
                            aria-labelledby="Change password dialog"
                            aria-describedby="enter your previous password and new password to change to new password"
                            open={passwordModalOpen}
                            onClose={handlePasswordModalOpen}
                          >
                             <Box className='w-2/3 bg-white/80 rounded-lg' sx={style}>
                                <div className='w-full flex justify-center'>
                                    <div className='w-1/2 aspect-video p-2'>
                                         <div className='w-full mb-4'>
                                             <FormControl color={oldPasswordColor} className='w-full' variant="outlined">
                                                  <InputLabel htmlFor="Old password">Old Password</InputLabel>
                                                  <OutlinedInput
                                                    inputProps={{
                                                         className:'focus:!outline-0 focus:!border-0 focus:!ring-0'
                                                     }}
                                                    value={oldPassword}
                                                    onChange={oldPasswordChangeHandler}
                                                    onBlur={checkOldPassword}
                                                    type={showOldPassword ? 'text' : 'password'}
                                                    endAdornment={
                                                      <InputAdornment position="end">
                                                        <IconButton
                                                          aria-label={
                                                            showOldPassword ? 'hide the password' : 'display the password'
                                                          }
                                                          onClick={handleClickShowOldPassword}
                                                          onMouseDown={handleMouseDownPassword}
                                                          onMouseUp={handleMouseUpPassword}
                                                          edge="end"
                                                        >
                                                          {showOldPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                      </InputAdornment>
                                                    }
                                                    label="Old Password"
                                                  />
                                                  
                                            </FormControl>
                                         </div>
                                         <div className='w-full mb-4'>    
                                             <FormControl color={newPasswordColor} className='w-full' variant="outlined">
                                                  <InputLabel htmlFor="New password">New Password</InputLabel>
                                                  <OutlinedInput
                                                    inputProps={{
                                                         className:'focus:!outline-0 focus:!border-0 focus:!ring-0'
                                                     }}
                                                    value={newPassword}
                                                    onChange={newPasswordChangeHandler}
                                                    type={showNewPassword ? 'text' : 'password'}
                                                    endAdornment={
                                                      <InputAdornment position="end">
                                                        <IconButton
                                                          aria-label={
                                                            showNewPassword ? 'hide the password' : 'display the password'
                                                          }
                                                          onClick={handleClickShowNewPassword}
                                                          onMouseDown={handleMouseDownPassword}
                                                          onMouseUp={handleMouseUpPassword}
                                                          edge="end"
                                                        >
                                                          {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                      </InputAdornment>
                                                    }
                                                    label="New Password"
                                                  />
                                                  
                                             </FormControl>
                                         </div>
                                         <div className='flex'>
                                             <Button color={buttonColor} onClick={submitChange}>Change</Button>
                                         </div>
                                    </div>
                                </div>
                            </Box>  
                          </Modal>
}
export default SellerPasswordChangeModal;