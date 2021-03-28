import React, { useEffect,useState, useCallback, useReducer } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  Text,
  ActivityIndicator
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/Headerbutton';
import * as productsActions from '../../store/actions/products';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import {Picker} from '@react-native-picker/picker';

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

const EditProductScreen = props => {
  const prodId = props.route.params ? props.route.params.productId : null;
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId)
  );
  const [loading,setLoading] = useState(false);
  const [category, setCategory] = useState('Diary');
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      category : editedProduct ? editedProduct.category : category,
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: ''
    },
    inputValidities: {
      title: editedProduct ? true : false,
      category : editedProduct ? true : true,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false
    },
    formIsValid: editedProduct ? true : false
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
    setLoading(true);
    try{
      if (editedProduct) {
        console.log(category)

        await dispatch(
           productsActions.updateProduct(
             prodId,
             formState.inputValues.title,
             category,
             formState.inputValues.description,
             formState.inputValues.imageUrl
           )
         );
       } else {
         console.log(category)
       await  dispatch(
           productsActions.createProduct(
             formState.inputValues.title,
             category,
             formState.inputValues.description,
             formState.inputValues.imageUrl,
             +formState.inputValues.price
           )
         );
       }
       props.navigation.goBack();
    } catch (err){
      setError(err.message)
    }
    setLoading(false);
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === 'android' ? 'check' : 'check'
            }
            onPress={submitHandler}
          />
        </HeaderButtons>
      )
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
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ''}
            initiallyValid={!!editedProduct}
            required
          />
          {/* dropdown */}
          <Text style={{paddingTop:20}}>Select Category</Text>
          <Picker
        selectedValue={ category}
        style={{ marginLeft:'-4%',height: 60, width: '50%' }}
        selectedValue={category}
        onValueChange={(itemValue, itemIndex) => {
          setCategory(itemValue)
        console.log(category)}}
      >
        <Picker.Item label="Diary" value="Diary" />
        <Picker.Item label="Vegetables" value="Vegetables" />
        <Picker.Item label="Snacks" value="Snacks" />
        <Picker.Item label="Breakfast" value="Breakfast" />
        <Picker.Item label="Beverages" value="Beverages" />
        <Picker.Item label="Health/Beauty" value="Health/Beauty" />
        <Picker.Item label="Children" value="Children" />


      </Picker>


          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
             
        </View>
      </ScrollView>
  );
};

export const screenOptions = navData => {
  // const submitFn = navData.route.params ? navData.route.params.submit : null;
  const routeParams = navData.route.params ? navData.route.params : {};
  return {
    headerTitle: routeParams.productId
      ? 'Edit Product'
      : 'Add Product',
   
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

export default EditProductScreen;
