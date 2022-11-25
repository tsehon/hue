import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Button, ScrollView } from 'react-native'
import { useState, useEffect } from 'react';
import { query, orderBy, getDocs, collection, where } from "firebase/firestore";
import db from '../config/firebase';

import VideoPreview from './VideoPreviews';

export default function ProductReviewsGrid(props) {
    const [reviews, setReviews] = useState([]);

    const width = Dimensions.get('window').width/3;
    const heightScaleFactor = 16/9

    useEffect(() => {
        getReviews(props.productName).then(setReviews);
    }, [props.productName]);


    return (
        <View style={styles.flexGrid}>
            {reviews.map((element, index) => {
                return (
                <View style={styles.thumbnail} key={index}>
                    <VideoPreview
                        style={{width: width-2, height: width*heightScaleFactor}}
                        navigation={props.navigation}
                        searchType='productName'
                        searchQuery={props.productName}
                        startIndex={index}
                        imgURI={element.thumbnailDownloadURL}
                        videoURI={element.videoDownloadURL}
                    />
                </View>
            )})}
        </View>
    );
}

const getReviews = async (productName) => {
    const q = query(collection(db, 'reviews'), where('productName', '==', productName), orderBy('upvotesMinusDownvotes', 'desc'));

    const querySnapshot = await getDocs(q);

    const arr = [];

    querySnapshot.forEach((doc) => {
        const id = doc.id;
        const data = doc.data();
        arr.push({id, ...data});
    });
    return arr;
}

const styles = StyleSheet.create({
    flexGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    thumbnail: {
        borderWidth: 1,
    }
});