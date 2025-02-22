import axios from 'axios';
import {useState, useEffect, useRef, useCallback} from 'react';
import React from 'react';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import placeHolderImage from '../images/steamMount.jpg';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
  p: 4,
};

let cropperState={ready:false};
function ImageEditModal(props){
    let {open,setOpen,pfpLink,setPfpLink}=props;
    const cropperRef = useRef(null);
    const inputRef=useRef(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        cropperState.ready=false;
        setTimeout(()=>setPfpLink(''),500);
        
    }
    const [src, setSrc]=useState(pfpLink);
    const onCropEnd = () => {
        console.log('cropend');
        const cropper = cropperRef.current.cropper;
        console.log(cropper);
        if(cropper && cropperState.ready){
            const containerData=cropper.getContainerData();
            const canvasData=cropper.getCanvasData();
            const right=canvasData.left+canvasData.width;
            const bottom=canvasData.top+canvasData.height;
            if(canvasData.left>0){
                cropper.setCanvasData({left:0});
            }
            if(canvasData.top>0){
                cropper.setCanvasData({top:0});
            }
            if(right<containerData.width){
                const offset=containerData.width-(canvasData.width+canvasData.left);
                const newLeft=canvasData.left+offset;
                cropper.setCanvasData({left:newLeft});
                
            }
            if(bottom<containerData.height){
                const offset=containerData.height-(canvasData.height+canvasData.top);
                const newTop=canvasData.top+offset;
                cropper.setCanvasData({top:newTop});
                
            }
            cropperState.ready=true;
        }
        
    };
    const ready=()=>{
        if (cropperRef.current && src) {
            
            setTimeout(()=>console.log(src),1000);
            const cropper = cropperRef.current.cropper;
            const containerData=cropper.getContainerData();
            const canvasData=cropper.getCanvasData();
            cropper.setCanvasData({
                left: 0,
                top: 0,
                width: containerData.width, 
                height: containerData.height, 
            });
            cropper.setCanvasData({
                left: (containerData.width-cropper.getCanvasData().width)/2,
                top: (containerData.height-cropper.getCanvasData().height)/2,
            });
             cropper.setCropBoxData({
                left: 0,
                top: 0,
                width: containerData.width, 
                height: containerData.height, 
            });
            console.log('ready');
            cropperState.ready=true;
        }
    }
    const onCrop = (e)=>{
        
        const cropper = cropperRef.current.cropper;
        let canvasData=cropper.getCanvasData();
        let ContainerData=cropper.getContainerData();
        if(cropper && cropperState.ready){
            if(canvasData.width<ContainerData.width){
                cropper.zoom(0.1);
                cropper.setCanvasData({left:0});
                if(canvasData.top>0){
                    cropper.setCanvasData({top:0});
                }
                canvasData=cropper.getCanvasData();
                const bottom=canvasData.top+canvasData.height;
                console.log('canvasData.top',canvasData.top);
                console.log('canvasData.height',canvasData.height);
                console.log(bottom);
                if(bottom<ContainerData.height){
                    const offset=ContainerData.height-(canvasData.height+canvasData.top);
                    const newTop=canvasData.top+offset;
//                    console.log('new top',newTop);
                    cropper.setCanvasData({top:newTop});
                }
            }
            if(canvasData.height<ContainerData.height){
                cropper.zoom(0.1);
                cropper.setCanvasData({top:0});
                if(canvasData.left>0){
                    cropper.setCanvasData({left:0});
                }
                canvasData=cropper.getCanvasData();
                const right=canvasData.left+canvasData.width;
                if(right<ContainerData.width){
                    const offset=ContainerData.width-(canvasData.width+canvasData.left);
                    const newLeft=canvasData.left+offset;
//                    console.log('new left', newLeft);
                    cropper.setCanvasData({left:newLeft});
                }
            }
        }
    }
    const uploadImage=async(blob)=>{
        console.dir(blob);
        const formData=new FormData();
        formData.append('newImage',blob);
        const sellerToken=await JSON.parse(localStorage.getItem('seller')).sellerToken;
        axios.defaults.headers.patch['Authorization'] = `Bearer ${sellerToken}`;
        const response= await axios.patch('http://localhost:3002/api/v1/seller/updateImage', formData, {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }).catch(err=>console.log(err));
        handleClose();
//        console.log(response);
    }
    const saveImage=(event)=>{
        console.log(event);
        const cropper = cropperRef.current.cropper;
        if(cropper && cropperState.ready){
            cropper.getCroppedCanvas().toBlob((blob)=>{
                uploadImage(blob);
            })
            
            
        }
    }
    const openStorage=()=>{
        if(inputRef.current){
            inputRef.current.click();
        }
    }
    const setImage=()=>{
        const file=inputRef.current.files[0];
        console.log('n',src);
        const reader= new FileReader();
        reader.addEventListener('load',()=>{
            setSrc(reader.result);
        });
        reader.readAsDataURL(file);
    }
    
    return          <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={open}
                            onClose={handleClose}
                          >
                             <Box className='w-2/3' sx={style}>
                                <div className='w-full flex justify-center'>
                                    <div className='w-1/2 aspect-square'>
                                         <Cropper
                                          src={src}
                                          style={{ height: "100%", width: "100%" }}
                                          // Cropper.js options
                                          initialAspectRatio={1 / 1}
                                          guides={false}
                                          cropend={onCropEnd}
                                          crop={onCrop}
                                          ref={cropperRef}
                                          cropBoxMovable={false}
                                          cropBoxResizable={false}
                                          ready={ready}
                                          autoCropArea={1}
                                          background={false}
                                          dragMode={'move'}
                                          toggleDragModeOnDblclick={false}
                                        />
                                    </div>
                                </div>
                                <Button onClick={saveImage}>Save</Button>
                                <Button onClick={openStorage}>select image</Button>
                                <input ref={inputRef} className='hidden' type='file' accept='image/*'  onChange={setImage}/>
                            </Box>  
                          </Modal>
}

export default ImageEditModal;