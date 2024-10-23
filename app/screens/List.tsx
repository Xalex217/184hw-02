//list 
import {View, Text, Button} from 'react-native';
import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

interface RouterProps {
    navigation: NavigationProp<any, any>;
    username: string;
    email: string;
}

const List = ({navigation, username, email} : RouterProps) => {
    return (
        <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text> User ID: {username} </Text>
            <Text> Email: {email} </Text>
        <Button onPress = {() => navigation.navigate('Details')} title = "Open details"/>
        <Button onPress = {() => FIREBASE_AUTH.signOut()} title = "Logout"/>
        </View>
    );
};
export default List;