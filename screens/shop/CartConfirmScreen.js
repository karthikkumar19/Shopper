import React, { useEffect,useState, useCallback, useReducer } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  Button,
  Text,
  ActivityIndicator
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/Headerbutton';
import * as ordersActions from '../../store/actions/orders';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';

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

const CartConfirmScreen = props => {
 
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();


  const cartItems = props.route.params.cartItems;
  const cartTotalAmount = props.route.params.totalAmount;


  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name:  '',
      address : '',
      email:  '',
      mobile:  '',
      pincode: ''
    },
    inputValidities: {
      name: false,
      address : false,
      email: false,
      mobile: false,
      pincode: false
    },
    formIsValid:  false
  });


  useEffect(() => {
    if(error){
      Alert.alert('an error', error, [{text:'Okay'}])
    }
  },[error])

  const submitHandler = useCallback( async() => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'Okay' }
      ]);
      return;
    }
    setError(null);
     // setLoading(true);
    // try{
    //     await dispatch(ordersActions.addOrder(cartItems,cartTotalAmount));
    //     setLoading(false)
    // } catch(err){
    //     console.log(err)
    // }
    setLoading(true);
    try{
       await  dispatch(
           ordersActions.addOrder(
             cartItems,
             cartTotalAmount,
             formState.inputValues.name,
             formState.inputValues.address,
             formState.inputValues.email,
             formState.inputValues.mobile,
             +formState.inputValues.pincode
           )
         );
       
       props.navigation.goBack();
    } catch (err){
      setError(err.message)
    }
    setLoading(false);
  }, [dispatch,  formState]);

  useEffect(() => {
    props.navigation.setOptions({
      // headerRight: () => (
      //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
      //     <Item
      //       title="Save"
      //       iconName={
      //         Platform.OS === 'android' ? 'check' : 'check'
      //       }
      //       onPress={submitHandler}
      //     />
      //   </HeaderButtons>
      // )
     });
  }, [submitHandler]);

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

  if(loading){
    return(
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }

  return (
 
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="name"
            label="Name"
            errorText="Please enter a valid Name!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={ ''}
            initiallyValid={false}
            required
          />
          {/* dropdown */}
        
          <Input
            id="address"
            label="Address"
            errorText="Please enter a valid address!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={ ''}
            initiallyValid={false}
            required
            minLength={5}
          />

<Input
              id="email"
              label="Email Address"
              errorText="Please enter a valid email address!"
              keyboardType='email-address'
              required email autoCaptialize='none' 
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              
            />

<Input
              id="mobile"
              label="Mobile Number"
              errorText="Please enter a valid mobile number!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
              minLength={10}
            />
          
          <Input
              id="pincode"
              label="Pincode"
              errorText="Please enter a valid pincode!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
              minLength={6}
            />
           
        
           <Button color={Colors.accent} title='Confirm Order' 
                onPress={submitHandler}/>
             
        </View>
      </ScrollView>
  );
};

export const screenOptions = navData => {
  // const submitFn = navData.route.params ? navData.route.params.submit : null;
  const routeParams = navData.route.params ? navData.route.params : {};
  return {
    headerTitle: 'Shipping Address',
   
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  centered:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});

export default CartConfirmScreen;
