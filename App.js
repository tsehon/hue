import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Text, View, ScrollView } from 'react-native';

const Searchbar = () => {
  return (
      <TextInput
        style={styles.searchbar}
        placeholder="Search"
      />
  );
}

export default function App() {
  return (
    <ScrollView style={styles.page}>
      <Searchbar/>
      <View style={styles.container}>
        <Text>hue</Text>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 60,
    flex: 1,
    width: '100%',
  },
  searchbar: {
    height: 40,
    width: '90%',
    alignSelf: 'center',
    textAlign: 'center',
    borderColor: 'purple',
    borderWidth: 1,
  },
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
