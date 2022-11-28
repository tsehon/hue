import { StyleSheet, TouchableOpacity, Text, View, ScrollView, Linking } from 'react-native';
import BackButton from './BackButton';

export default function Header({ navigation, title, style }) {
    return (
        <View style={[styles.headerContainer, style]}>
            <BackButton navigation={navigation} size={30} color={'black'} style={styles.button}></BackButton>
            <Text style={styles.title}>
                {title}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
    },
    button: {
        position: 'absolute',
        left: 12,
    },
    title: {
      fontSize: 20,
      lineHeight: 23,
      fontFamily: 'PlusJakartaSans-Bold',
    },
  });