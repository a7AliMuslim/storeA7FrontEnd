import {useState} from 'react';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
        main:'#76B900',
    },
  },
  components: {
    MuiRating: {
      styleOverrides: {
        iconFilled: {
          color: '#76B900', // Green for filled stars
        },
        iconHover: {
          color: '#76B900', // Green when hovered
        },
        iconEmpty: {
          color: '#76B900', // Green for empty stars (optional)
          opacity: 0.3, 
        },
      },
    },
  },
});

export default function RatingFilter({filterObj}){
    const [ratingValue, setRatingValue]=useState(null);
    const [hoverValue, setHoverValue]=useState(null);
    filterObj.rating=ratingValue;
    return <div>
        <div className='py-2 text-light-text'>
            Ratings
        </div>
    
        
            
        <div className='flex justify-center text-light-text'>
            <div className={hoverValue==-1?'flex-none w-6 opacity-0':'w-6 flex-none'}>
                {hoverValue}
            </div>
            <ThemeProvider theme={theme}>
                <Rating
                  name="hover-rating"
                  value={ratingValue}
                  onChange={(event, newValue) => {
                    setRatingValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHoverValue(newHover);
                  }}
                  emptyIcon={<StarIcon fontSize="inherit" />}
                  classes='flex-auto'
                />
            </ThemeProvider>
            
    </div>
    </div>
}