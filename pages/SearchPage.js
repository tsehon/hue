import React, { useState, useEffect } from 'react';
import { SearchBar } from 'react-native-elements';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import { collection, getDocs } from "firebase/firestore";

import db from '../config/firebase';
import SearchItem from '../lib/SearchItem';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function SearchPage({navigation}) {
    const [query, setQuery] = useState('');
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
                    onPress={({ item }) => navigation.navigate('Product', {
                        productId: { item }
                    })}>
                    {name}
                </Text>
            );
        }
    }

    return (
        <View style={styles.container}>
            <SearchBar
                onChangeText={filterResults}
                value={query}
                placeholder="Search for a product or category..."
                platform='ios'
            />
            <FlatList
                data={items}
                keyExtractor={(item) => item}
                extraData={query}
                renderItem={renderSearchItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        fill: 1,
        paddingHorizontal: 10,
        alignSelf: 'center',
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