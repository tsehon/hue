import { Component, useEffect, useState } from 'react';
import StarRating from 'react-native-star-rating-widget';

/**
 * 
 * @param {number} rating - rating out of five stars 
 * @param {boolean} disabled - if true, this is a static display of a fixed rating.
 * If false, this is responsive to touch to allow user to input new rating, with animation
 * @param {object} style
 * @param {number} starSize
 * @param {function} onChange - parent function to call when rating changes (so rating can be passed up to parent)
 * @returns 
 */
export default class Stars extends Component {
    static defaultProps = {
        disabled: true,
        starSize: 16,
        color: '#040404',
        emptyColor: '#B0B0B0',
    }

    render() {
        return (
            <StarRating
                rating={this.props.rating}
                onChange={(this.props.disabled) ? (() => { }) : this.props.onChange}
                animationConfig={(this.props.disabled) ? { scale: 1, duration: 0 } : { scale: 1.1, duration: 200, delay: 100 }}
                starSize={this.props.starSize}
                style={this.props.style}
                color={this.props.color}
                emptyColor={this.props.emptyColor}
            />
        )
    }
}
