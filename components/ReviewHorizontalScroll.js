import { doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import VideoPreview from '../components/VideoPreviews';
import db from '../config/firebase'
import styles from '../styles/styles';

export const ReviewHorizontalScroll = ({ navigation, data }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        async function getReviews() {
            const reviewData = [];
            for (let i = 0; i<data.length; i++) {
                const docRef = doc(db, 'reviews', data[i])
                const docSnap = await getDoc(docRef);
                const item = docSnap.data();
                reviewData.push({
                    id: data[i],
                    categoryName: item.categoryName,
                    imgURI: item.thumbnailDownloadURL,
                    videoURI: item.videoDownloadURL,
                });
            }
            setReviews(reviewData);
        }
        getReviews()
    }, [data])

    return (
        <ScrollView horizontal>
            {reviews.map((element, index) => {
                console.log(element)
                return (
                <VideoPreview
                    style={styles.horizontalScrollItem}
                    navigation={navigation}
                    searchType='categoryName'
                    searchQuery={element.categoryName}
                    firstID={element.id}
                    imgURI={element.imgURI}
                    videoURI={element.videoURI}
                    key={index}
                />
            )})}
          </ScrollView>
    )
}