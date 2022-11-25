import { StyleSheet, View, Text, Image } from 'react-native'

export default function HomePageSection(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={props.escapeStyle}>
                {props.children}
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
        fontFamily: 'PlusJakartaSans-SemiBold',
    },
    container: {
        padding: 10,
    }
});