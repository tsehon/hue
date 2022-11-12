import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, ScrollView } from 'react-native';

const Dropdown = () => {

}

const Searchbar = () => {
    const [searchText, setSearchText] = useState('');
    return (
        <TextInput
            style={styles.searchbar}
            placeholder="Search"
            onChangeText={newText => setSearchText(newText)}
            defaultValue={searchText}
        />
    );
}

const styles = StyleSheet.create({
    searchbar: {
        height: 40,
        width: '90%',
        alignSelf: 'center',
        textAlign: 'center',
        borderColor: 'black',
        borderWidth: 1,
    },
});

export default Searchbar;