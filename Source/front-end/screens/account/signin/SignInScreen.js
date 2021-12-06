import React from 'react';
import { Keyboard, Text, StyleSheet, TouchableHighlight, View, TouchableOpacity, Image } from 'react-native';
import { WebBrowser } from 'expo'
import Button from 'apsl-react-native-button';
import Message from '../../../ui/Message';
import CurrentUser from '../../../api/CurrentUser';
import SignInForm from '../../../components/SignInForm';
import { colours } from '../../../constants/Colors';
import { AsyncStorage } from 'react-native';

export default class SignInScreen extends React.Component {
    constructor(props) {
        super(props);

        //If the app is running as dev, then populate the username and password text field with
        //default development usernames and passwords.
        if (__DEV__ || !__DEV__) {
            this.state = {
                username: 'Dev',
                password: 'Wee',
                loginButtonText: 'Sign in',
                loginButtonDisabled: false
            };
        } else {
            this.state = {
                username: '',
                password: '',
                loginButtonText: 'Sign in',
                loginButtonDisabled: false
            };
        }
        
        //If we are at the sign in screen, we can assume that the user wants to sign in to an account,
        //in which case, we should clear all previous authentication tokens.
        CurrentUser.SignOut();
    }

    static navigationOptions = {
        title: null,
        header: null
    };
    
    componentWillMount = async () => {
        await AsyncStorage.setItem('intro_complete', 'false');
        let introDone = await AsyncStorage.getItem('intro_complete');

        if (introDone !== 'true') {
            this.props.navigation.navigate('Intro');
        }
    }

    render() {
        return (
            <TouchableHighlight activeOpacity={1} underlayColor="#0099cc" style={styles.containerWrapper} onPress={() => {
                Keyboard.dismiss();
            }}>
                <View style={styles.container}>
                    {/* Removed this pending an updated logo from the client. */}
                    {/* Now re-added having received logo from client */}
                    <Image source={require('../../../images/nhs_wales_logo_main.png')} style={styles.logo} />
                    {/* <View style={styles.logo}></View> */}
                    {/* The above line is added as a placeholder for a logo awaiting an updated logo from the client. */}
                    <Text style={styles.title}>Ambicare</Text>
                    <Text style={[styles.informationText, styles.haveAccount]}>Have an account? Sign in below.</Text>
                    <SignInForm ref="signInForm" username={this.state.username} password={this.state.password} onSubmit={this.signInAsync} />
                    <Button isDisabled={this.state.loginButtonDisabled} style={styles.button} textStyle={styles.buttonText} onPress={this.signInAsync}>
                        {this.state.loginButtonText}
                    </Button>
                    <Text style={[[styles.informationText, styles.haveActivationCode], {marginTop: 45}]}>Have an activation code? Get started below.</Text>
                    <Button style={styles.button} textStyle={styles.buttonText} onPress={() => {
                        this.props.navigation.navigate('Step1PatientVerification');
                    }}>
                        Register
                    </Button>
                    {/* Removed due to not implemented. */}
                    {/* <Text style={styles.helpText} onPress={() => {
                        WebBrowser.openBrowserAsync('https://www.wales.nhs.uk');
                    }}>Account Help</Text> */}
                </View>
            </TouchableHighlight>
        );
    }

    signInAsync = async() => {
        if(this.refs["signInForm"].state.username === '' || this.refs["signInForm"].state.password === '') {
            Message.ShowOkMessage('Invalid Credentials', 'You could not be signed in. Please ensure that your username and password are correct, and then try again.', () => { });
            
            return;
        }
        
        this.setState({
            loginButtonText: 'Signing in...',
            loginButtonDisabled: true
        });

        //Call the CurrentUser.SignIn method which in turn calls the Api.Authenticate method, parsing in a username and
        //password provided from the state of the sign in form. This then creates a HTTP request to the back-end server
        //login endpoint. If this method returns false, the login has been unsuccessful, in which case, we should show an error message.
        if(await CurrentUser.SignIn(this.refs["signInForm"].state.username, this.refs["signInForm"].state.password) === false) {
            Message.ShowOkMessage('Invalid Credentials', 'You could not be signed in. Please ensure that your username and password are correct, and then try again.', () => { 
                //Only reset the sign in button once the message has been dismissed by the end-user. This is
                //done by setting the state calling the method this.setState(...);.
                
                this.setState({
                    loginButtonText: 'Sign in',
                    loginButtonDisabled: false
                });
            });
            
            return;
        }

        //The Api.Authenticate method stores an authenticate token (JWT token) and the user identity itself (the user details) in local storage.
        //This can be seen by calling the method CurrentUser.GetUserIdentity();
        let userIdentity = await CurrentUser.GetUserIdentity();
        let patientIdentity = await CurrentUser.GetPatientIdentity();

        Message.ShowOkMessage('Welcome Back', 'Welcome back ' + userIdentity.firstName + ' ' + userIdentity.lastName + ', for patient ' + patientIdentity.firstName + ' ' + patientIdentity.lastName + '.', () => { 
            //Navigate to the main screen once login has been successful and the welcome message has been dismissed.

            this.props.navigation.navigate('Main');
        });
    }
}

const styles = StyleSheet.create({
    logo: {
        width: 164,
        height: 90,
        marginTop: 50,
        marginBottom: 40
    },
    title: {
        color: colours.white,
        fontSize: 30,
        marginBottom: 30,
        fontFamily: 'System'
    },
    informationText: {
        color: colours.white,
        fontSize: 18,
        textAlign: 'center'
    },
    helpText: {
        color: colours.white,
        fontSize: 18,
        textAlign: 'center',
    },
    button: {
        height: 35,
        marginTop: 30,
        backgroundColor: colours.brightBlue,
        borderRadius: 3,
        borderWidth: 0
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16
    },
    haveAccount: {
        marginBottom: 30
    },
    haveActivationCode: {
        marginBottom: 10
    },
    containerWrapper: {
        width: '100%',
        height: '100%',
        marginBottom: 50,
        backgroundColor: colours.boldBlue
    },
    container: {
        padding: 45,
        flex: 1,
        width: '100%',
        height: 50,
        alignItems: 'center',
        // justifyContent: 'center',
        marginBottom: 45
    }
});