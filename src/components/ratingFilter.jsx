import {useState} from 'react';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export default function RatingFilter({filterObj}){
    const [ratingValue, setRatingValue]=useState(null);
    const [hoverValue, setHoverValue]=useState(null);
    filterObj.rating=ratingValue;
    return <div>
        <div className='py-2'>
            Ratings
        </div>
    
        
            
        <div className='flex justify-center'>
            <div className={hoverValue==-1?'flex-none w-6 opacity-0':'w-6 flex-none'}>
                {hoverValue}
            </div>
            
            <Rating
              name="hover-rating"
              value={ratingValue}
              onChange={(event, newValue) => {
                setRatingValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHoverValue(newHover);
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              classes='flex-auto'
            />
            
    </div>
    </div>
}