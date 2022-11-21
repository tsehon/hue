import { StyleSheet, View, Text, Image } from 'react-native'

export default function HomePageSection(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            {props.children}
        </View>
    );
}


const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        fontFamily: 'Plus-Jakarta-Sans',
    },
    container: {
        padding: 10,
    }
});