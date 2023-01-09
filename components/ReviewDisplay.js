import { StyleSheet, View, Text, TouchableOpacity, Button, ScrollView } from 'react-native'

export default function ReviewButton(props) {
    return (
        <TouchableOpacity
            style={styles.button}
        >
            <Text style={styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
    );
}

export function ReviewScrollView(props) {
    return (
        <ScrollView horizontal>
            { props.children }
        </ScrollView>
    );
}

export function ReviewGrid(props) {
    return (
        <ProductButton title={props.title}></ProductButton>
    );
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: '#EDEDED',
        width: 174,
        height: 300,
        margin: 10,
        borderRadius: 10,
        paddingTop: 10,
        paddingLeft: 14,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000000',
        fontFamily: 'PlusJakartaSans-Regular',
    }
});