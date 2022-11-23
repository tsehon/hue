import { useEffect, useState } from 'react';
import StarRating from 'react-native-star-rating-widget';

/**
 * 
 * @param {number} rating - rating out of five stars 
 * @param {boolean} disabled - if true, this is a static display of a fixed rating.
 * If false, this is responsive to touch to allow user to input new rating, with animation
 * @param {string} alignSelf - if set to 'flex-end', will override alignSelf: 'flex-start' (presumably inherent to library)
 * @param {number} starSize
 * @param {function} onChange - parent function to call when rating changes (so rating can be passed up to parent)
 * @returns 
 */
const Stars = (props) => {
    return (
        <StarRating
            rating={props.rating}
            onChange={(props.disabled) ? (() => { }) : props.onChange}
            animationConfig={(props.disabled) ? { scale: 1, duration: 0 } : { scale: 1.1, duration: 200, delay: 100 }}
            starSize={props.starSize}
            style={{ alignSelf: props.alignSelf }}
            color={'#040404'}
            emptyColor={'#B0B0B0'}
        />
    );
}

export default Stars;
