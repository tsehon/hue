import { StyleSheet, View, Text, TouchableOpacity, Button, ScrollView } from 'react-native'
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';

const colors = {
    'Beauty': '#fddfdf',
    'Skincare': '#fcf7de',
    'Tech': '#def3fd',
    'Lawnmowers': '#defde0',
};

const icons = {
    'Beauty': 'diamond',
    'Lawnmowers': 'eco',
    'Tech': 'computer',
    'Skincare': 'pink',
};

function CategoryButton(props) {

    const renderIcon = (title) => {
        return (
            <View style={{
                position: 'relative',
                left: '70%',
                bottom: '-5%',
            }}>
                <MaterialIcons fill={0} name={icons[title]} size={28}  />
            </View>
        );
    }

    return (
        <TouchableOpacity
            style={[styles.button, { width: props.buttonWidth, backgroundColor: colors[props.title] }]}
            onPress={() => {
                props.navigation.push('ReviewFeed', {
                    searchType: 'categoryName',
                    searchQuery: props.title,
                });
            }}
        >
            <Text style={styles.buttonText}>{props.title}</Text>
            {renderIcon(props.title)}
        </TouchableOpacity>
    );
}

export function CategoryButtonScrollView(props) {
    return (
        <ScrollView horizontal>
            {props.children}
        </ScrollView>
    );
}

export default function CategoryButtonGrid(props) {

    return (
        <View style={styles.flexGrid}>
            {props.categories.map((element, index) => (
                <View
                    style={{
                        marginTop: 8,
                    }}
                    key={index}>
                    <CategoryButton
                        key={index}
                        title={element}
                        buttonWidth={props.buttonWidth}
                        navigation={props.navigation}
                    />
                </View>
            ))}
        </View>
    );
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: '#EDEDED',
        // width: 180,
        height: 84,
        borderRadius: 10,
        paddingTop: 10,
        paddingLeft: 14,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000000',
        fontFamily: 'Plus-Jakarta-Sans',
    },
    flexGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridButton: {
        marginTop: 8,
    }
});