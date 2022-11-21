import React, { useState, useEffect } from 'react';
// import { SearchBar } from 'react-native-elements';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { collection, getDocs } from "firebase/firestore";

import { Feather } from '@expo/vector-icons';

import db from '../config/firebase';

import SearchItem from '../lib/SearchItem';
import BackButton from '../components/BackButton';

export default function SearchPage({ navigation, route }) {
    const [query, setQuery] = useState(route.text);
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

    const filterResults = (input) => {
        console.log("called: filterResults");

        input = input.toLowerCase();
        setQuery(input);

        if (input.trim()) {
            const results = data.filter((id) => {
                let item = itemDict[id];
                console.log(item);
                const name = item.name ? item.name.toLowerCase() : ''.toLowerCase();
                return name.indexOf(input) > -1;
            });

            setItems(results);
        } else {
            setItems([]);
        }

        console.log("query matched items: " + items);
    }

    const renderSearchItem = ({ item }) => {
        if (item && itemDict[item]) {
            const itemData = itemDict[item];
            const name = itemData["name"];
            console.log("rendering item WITH ID: " + item + " and NAME: " + name);

            return (
                <Text
                    style={styles.dropdownitem}
                    onPress={() => navigation.navigate('Product', {
                        productId: item
                    })}>
                    {name}
                </Text>
            );
        }
    }

    return (
        <SafeAreaView>
            <SafeAreaView style={styles.container}>
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
                    value={query}
                    placeholder="Search for a product or category..."
                    platform='ios'
                />
            </SafeAreaView>
            <FlatList
                data={items}
                keyExtractor={(item) => item}
                extraData={query}
                renderItem={renderSearchItem}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        fill: 1,
        flexDirection: 'row',
    },
    backButton: {
        fill: 1,
        paddingLeft: 20,
        paddingVertical: 30,
    },
    searchbar: {
        width: 325
    },
    dropdownitem: {
        paddingLeft: 15,
        marginTop: 15,
        paddingBottom: 15,
        fontSize: 20,
        borderBottomColor: '#26a69a',
        borderBottomWidth: 1
    }
});