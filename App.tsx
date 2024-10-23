//app 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import List from './app/screens/List';
import Details from './app/screens/Details';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { FIREBASE_AUTH } from './FirebaseConfig';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout({username, email}: {username: string, email: string}) {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name='My todos'>
        {(props) => <List {...props} username = {username} email={email}/>}
      </InsideStack.Screen>
      <InsideStack.Screen name='Details' component={Details}/>
    </InsideStack.Navigator>
  );
}
export default function App() {
const [user, setUser] = useState<User | null>(null);

useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
}, []);


const username = user?.displayName || 'Guest'; // Extract username or use 'Guest' as default
const email = user?.email || ''; // Extract email or use empty string as default

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          <Stack.Screen name='Inside'>
            {(props) => <InsideLayout {...props} username = {username} email={email}/>}
          </Stack.Screen>
        ) : (
          <Stack.Screen name='Login' component={Login} options = {{headerShown: false}}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
