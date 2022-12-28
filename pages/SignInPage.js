import React, { useState } from 'react';
import { StyleSheet, Text, Button, Alert, TextInput } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

export default function SignInPage({navigation, route}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function signIn() {
        if (email === '' || password === '') {
            Alert.alert('All fields must be completed')
            return;
        }
      
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    return (
        <SafeAreaView style={styles.page} edges={['top', 'left', 'right']}>
            <FocusAwareStatusBar barStyle='dark-content'/>
            <TextInput
                placeholder='Email'
                value={email}
                onChangeText={(text) => setEmail(text)}
                textContentType='username'
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect='false'
                spellCheck='false'
                style={styles.input}
            />
            <TextInput
                placeholder='Password'
                value={password}
                onChangeText={(text) => setPassword(text)}
                textContentType='password'
                secureTextEntry
                autoCorrect='false'
                spellCheck='false'
                style={styles.input}
            />
            <Button
                title='Sign in'
                onPress={() => signIn()}
            />
            <Button
                title='Create a new account'
                onPress={() => navigation.navigate('Sign Up')}
            />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
        padding: 70,
    },
    input: {
        fontSize: 18,
        fontFamily: 'Plus-Jakarta-Sans',
        borderColor: 'lightgrey',
        borderWidth: 1,
        padding: 5,
        borderRadius: 6,
        marginBottom: 15,
    },
});