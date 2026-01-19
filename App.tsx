import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import { PaperProvider, MD3LightTheme as DefaultTheme, IconButton } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Screens
import AuthScreen from './src/screens/Auth';
import HomeScreen from './src/screens/Home';
import AddBookScreen from './src/screens/AddBook';
import BookDetailScreen from './src/screens/BookDetail';
import ProfileScreen from './src/screens/Profile';

export type RootStackParamList = {
    Auth: undefined;
    Home: undefined;
    AddBook: { initialBook?: { title: string; author?: string } } | undefined;
    BookDetail: { bookId: number };
    Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#6200ee',
        secondary: '#03dac6',
        background: '#f6f6f6',
        surface: '#ffffff',
        error: '#B00020',
    },
    roundness: 12,
};

function App() {
    return (
        <SafeAreaProvider>
            <PaperProvider theme={theme}>
                <StatusBar barStyle="light-content" backgroundColor="#6200ee" />
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="Auth"
                        screenOptions={{
                            headerStyle: { backgroundColor: '#6200ee' },
                            headerTintColor: '#fff',
                            headerTitleStyle: { fontWeight: 'bold' },
                        }}
                    >
                        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={({ navigation }) => ({
                                title: 'My Library',
                                headerRight: () => (
                                    <IconButton
                                        icon="account-circle"
                                        iconColor="#fff"
                                        size={30}
                                        onPress={() => navigation.navigate('Profile')}
                                    />
                                ),
                            })}
                        />
                        <Stack.Screen name="AddBook" component={AddBookScreen} options={{ title: 'New Book' }} />
                        <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ title: 'Details' }} />
                        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'My Profile' }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </SafeAreaProvider>
    );
}

export default App;

AppRegistry.registerComponent('main', () => App);
