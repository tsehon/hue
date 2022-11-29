import React, { useState, useEffect } from 'react';
// import { SearchBar } from 'react-native-elements';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { collection, getDocs } from "firebase/firestore";

import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import db from '../config/firebase';

import SearchItem from '../lib/SearchItem';
import BackButton from '../components/BackButton';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import SearchTabView from '../components/SearchTabView';

export default function SearchPage({ navigation, route }) {
    const [query, setQuery] = useState(route.text);

    const [data, setData] = useState([]);
    const [items, setItems] = useState([]);
    const [itemDict, setItemDict] = useState({});

    const [recentlyViewed, setRecentlyViewed] = useState([]);

    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const snapshot_products = await getDocs(collection(db, 'products').withConverter(itemConverter));
        const snapshot_categories = await getDocs(collection(db, 'categories').withConverter(itemConverter));

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

    const filterResults = (input) => {
        setSubmitted(false);
        setQuery(input);

        if (input.trim()) {
            const results = data.filter((id) => {
                let item = itemDict[id];
                const name = item.name ? item.name.toLowerCase() : ''.toLowerCase();
                return name.indexOf(input.toLowerCase()) > -1;
            });

            setItems(results);
        } else {
            setItems([]);
        }
    }

    const renderSearchItem = ({ item }) => {
        if (item && itemDict[item]) {
            const itemData = itemDict[item];
            const name = itemData["name"];
            console.log("rendering item WITH ID: " + item + " and NAME: " + name);

            return (
                <TouchableOpacity
                    style={styles.searchItemContainer}
                    onPress={() => {
                        const recents = recentlyViewed;
                        var index = recents.indexOf(item);
                        if (index > -1) {
                            recents.splice(index, 1);
                        }
                        recents.push(item);
                        console.log("recents: ");
                        console.log(recents);

                        setRecentlyViewed(recents);
                
                        if (itemData.type == 'product') navigation.navigate('Product', {productId: item});
                        else if (itemData.type == 'category') {
                            navigation.push('ReviewFeed', {
                                searchType: 'categoryName',
                                searchQuery: name,
                            })
                        }
                    }}
                >
                    {query ? <Ionicons name='ios-search' size={20} color='black' /> : 
                        <MaterialCommunityIcons name="clock-time-four-outline" size={20} color="black" />}
                    <Text style={[styles.text, {marginLeft: 15}]}>
                        {name}
                    </Text>
                </TouchableOpacity>
            );
        }
    }

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <FocusAwareStatusBar barStyle='dark-content'/>
            <SafeAreaView style={styles.searchContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => { navigation.goBack() }}
                >
                    <Feather
                        name="arrow-left"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
                <SearchBar
                    containerStyle={styles.searchbar}
                    onChangeText={filterResults}
                    onSubmitEditing={() => setSubmitted(true)}
                    value={query}
                    placeholder="Search for a product or category..."
                    returnKeyType='search'
                    platform='ios'
                    autoFocus={true}
                />
            </SafeAreaView>
            { !submitted ?
                <FlatList
                    data={ query ? items : recentlyViewed }
                    keyExtractor={(item) => item}
                    extraData={query}
                    renderItem={renderSearchItem}
                    keyboardShouldPersistTaps='handled'
                /> : <SearchTabView data={items} dict={itemDict} navigation={navigation}/>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    searchContainer: {
        fill: 1,
        flexDirection: 'row',
    },
    dropdownContainer: {
        fill: 1,
    },
    backButton: {
        fill: 1,
        paddingLeft: 20,
        marginTop: 25,
    },
    searchbar: {
        width: 325
    },
    searchItemContainer: {
        paddingTop: 17,
        paddingBottom: 17,
        paddingLeft: 38,
        paddingRight: 38,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Plus-Jakarta-Sans',
        fontSize: 16,
    },
});