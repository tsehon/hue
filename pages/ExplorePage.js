import React, { useState, useEffect } from 'react';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

import HomePageSection from '../components/HomePageSection';
import CategoryButton, { CategoryButtonScrollView } from '../components/CategoryButtons';
import CategoryButtonGrid from '../components/CategoryButtons';
import ProductButton, { ProductScrollView } from '../components/ProductDisplay';
import ReviewButton, { ReviewScrollView } from '../components/ReviewDisplay';

export default function ExplorePage({ navigation, route }) {
    const [data, setData] = useState([]);
    const [items, setItems] = useState([]);
    const [itemDict, setItemDict] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const snapshot_products = await getDocs(collection(db, 'products').withConverter(itemConverter));
        const snapshot_categories = await getDocs(collection(db, 'categories').withConverter(itemConverter));
        console.log("fetching data..");

        const newData = [];
        const idList = [];

        snapshot_products.forEach((doc) => {
            let item = doc.data();
            item.setType("product");
            newData.push(item);
            idList.push(item.id.toString());
        });
        snapshot_categories.forEach((doc) => {
            let item = doc.data();
            item.setType("category");
            newData.push(item);
            idList.push(item.id.toString());
        });

        setData(idList);
        setItemDict(Object.fromEntries(newData.map(({ id, ...rest }) => ([id, rest]))));
    }

    const itemConverter = {
        toFirestore: (item) => {
            return {
                name: item.name,
            };
        },
        fromFirestore: (snapshot, options) => {
            const data = snapshot.data(options);
            const id = snapshot.id;
            return new SearchItem(data.name, id);
        }
    };
    return (
        <SafeAreaView style={styles.page}>
            <ScrollView contentContainerStyle={styles.page}>
                <SearchBar
                    style={styles.searchbar}
                    onPressIn={() => navigation.navigate('Search')}
                    placeholder="Search"
                    platform='ios'
                />
                <HomePageSection
                    title="Trending Reviews"
                >
                    <ReviewScrollView>
                        <ReviewButton title="Yeezy Boost"></ReviewButton>
                        <ReviewButton title="Yeezy Boost"></ReviewButton>
                        <ReviewButton title="Yeezy Boost"></ReviewButton>
                    </ReviewScrollView>
                </HomePageSection>
                <HomePageSection
                    title="Trending Products"
                >
                    <ProductScrollView>
                        <ProductButton productName="Greenworks Lawnmower" productId="g8CN9lm5cxXeZ1BhwYN2"></ProductButton>
                        <ProductButton productName="Logitech Monitor"></ProductButton>
                        <ProductButton productName="Logitech Monitor"></ProductButton>
                    </ProductScrollView>
                </HomePageSection>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    container: {
        padding: 30,
        flex: 1,
        backgroundColor: 'lightblue',
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    feed: {
        flex: 4,
        backgroundColor: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'center',
    },
});