import React ,{useCallback,useReducer,useState,useEffect}from 'react';
import {View,ScrollView,KeyboardAvoidingView,StyleSheet,Button, ActivityIndicator
,Alert} from 'react-native';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';
import {useDispatch} from 'react-redux';


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};


const AuthScreen = props => {
    const [isSignup, setIsSignup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
  
    const [formState, dispatchFormState] = useReducer(formReducer, {
      inputValues: {
        email: '',
        password: ''
      },
      inputValidities: {
        email: false,
        password: false
      },
      formIsValid: false
    });

    useEffect(() => {
        if(error){
            Alert.alert('An Error Occured', error , [{text: 'Okay'}])
        }
        
    },[error])
  
    const authHandler = async () => {
      let action;
      if (isSignup) {
        action = authActions.signup(
          formState.inputValues.email,
          formState.inputValues.password
        );
      } else {
        action = authActions.login(
          formState.inputValues.email,
          formState.inputValues.password
        );
      }
      setError(null);
      setLoading(true);
      try{
        await dispatch(action);
        // props.navigation.navigate('Shop');
      } catch (err) {
          setError(err.message);
          setLoading(false);
      }
    };
  
    const inputChangeHandler = useCallback(
      (inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
          type: FORM_INPUT_UPDATE,
          value: inputValue,
          isValid: inputValidity,
          input: inputIdentifier
        });
      },
      [dispatchFormState]
    );


    return (
       <KeyboardAvoidingView 
       keyboardVerticalOffset={0}
       style={styles.screen}>
           {/* <LinearGradient colors={['#ffedff','#ffe3ff']} style={styles.gradient}> */}
           <View style={styles.gradient}>
           <Card style={styles.authContainer}>
               <ScrollView>
        <Input id='email' label='E-Mail' 
        keyboardType='email-address'
        required email autoCaptialize='none' 
        errorText='Plese enter the vaild email address'
        onInputChange={inputChangeHandler}
        initialValue='' />

         <Input id='password' label='Password' 
        keyboardType='default'
        secureTextEntry
        required
        minLength={5}
         autoCaptialize='none'
        errorText='Plese enter the vaild Password'
        onInputChange={inputChangeHandler}
        initialValue='' />
        <View >
       { loading ? (
           <ActivityIndicator size='small' color={Colors.primary} />
       ) : <Button
       title={isSignup ? 'Sign Up' : 'Login'}
       color={Colors.primary}
       onPress={authHandler}
     /> } 
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignup(prevState => !prevState);
                }}
              />
        </View>

               </ScrollView>
           </Card>
           </View>
           {/* </LinearGradient> */}
       </KeyboardAvoidingView>

    )
}

export const screenOptions = () => {
    return{
        headerTitle:'Authenticate'
    }
    
}

const styles = StyleSheet.create({
    screen:{
        flex:1,

    },
    authContainer:{
       width:'80%',
       maxWidth:400,
       maxHeight:400,
       padding:20
    },
    gradient:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    buttonContainer:{
        marginTop:10
    }
})

export default AuthScreen
