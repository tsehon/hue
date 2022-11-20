import { StyleSheet, View, Text, TouchableOpacity, Button} from 'react-native'

function CategoryButton(props) {
    return (
        <TouchableOpacity
            style={styles.button}
        >
            <Text style={styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
    );
}


export default function CategoryButtonGrid(props) {
    return (
        <CategoryButton title={props.title}></CategoryButton>
    );
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: '#EDEDED',
        width: 174,
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
    }
});