import { useState } from 'react';
import StarRating from 'react-native-star-rating-widget';

/*
Props:
rating: rating out of five stars
disabled: boolean, true or false
    if false, this is just a static star display
    if true, this is responsive to touch to allow user to input new rating, with animation
alignSelf: if set to 'flex-end', will override alignSelf: 'flex-start' (presumably inherent to library)
*/
const Stars = (props) => {
    const [rating, setRating] = useState(props.rating);
    return (
        <StarRating
            rating={rating}
            onChange={(props.disabled) ? (() => {}) : setRating}
            animationConfig={(props.disabled) ? {scale: 1, duration: 0} : {scale: 1.1, duration: 200, delay: 200}}
            starSize={16}
            style={{alignSelf: props.alignSelf}}
            color={'#040404'}
            emptyColor={'#B0B0B0'}
        />
    );
}

export default Stars;
