//login 
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native';
import React, {useState} from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH; 

    const signIn = async () => {
        setLoading(true);
        try {
           const response = await signInWithEmailAndPassword(auth, email, password);
           console.log(response);
           alert('Login successful');
        } catch (error: any) {
            console.error(error);
            alert('Login failed: ' + error.message);
        }
        finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
           const response = await createUserWithEmailAndPassword(auth, email, password);
           console.log(response);
           alert('Check your emails');
        } catch (error: any) {
            console.error(error);
            alert('Login failed: ' + error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <View style = {styles.container}>
        <KeyboardAvoidingView behavior="padding"> 
        <TextInput value = {email} style = {styles.input} placeholder = "Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
        <TextInput secureTextEntry = {true} value = {password} style = {styles.input} placeholder = "password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>
        { loading ? (
            <ActivityIndicator size="large" color="#0000ff" /> 
        ):(<>
            <Button title="Login" onPress={signIn}/>
            <Button title="Sign Up" onPress={signUp}/>

                </>)}
            </KeyboardAvoidingView>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 50,
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        marginVertical: 4,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    }
});