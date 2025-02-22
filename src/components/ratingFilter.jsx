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
    
        <div className='flex ml-8'>
            <Rating
              name="hover-feedback"
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
            <div className='flex-none'>
                {hoverValue==-1?'':hoverValue}
            </div>
    </div>
    </div>
}