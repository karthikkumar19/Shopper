import React ,{useEffect, useState, useCallback}from 'react';
import {FlatList,Button, ActivityIndicator,View, StyleSheet,Text } from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import ProductItem from '../../components/Shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Headerbutton from '../../components/UI/Headerbutton';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';
import AwesomeAlert from 'react-native-awesome-alerts';

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['Setting a timer']);
LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);

const ProductsOverviewScreen = props => {
    const [showAlert,setShowAlert] = useState(false);

    const showAlertFunction = () => {
        setShowAlert(true)
      };
     
    const  hideAlert = () => {
       setShowAlert(false)
      };
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.availableProducts);
    const [loading,setLoading] = useState(false);
    const [refreshing,setRefreshing] = useState(false);
    const [error, setError] = useState('');

    const loadProducts = useCallback( async  () => {
        console.log('load')
        setRefreshing(true);
        setError(null)
        try{
            await dispatch(productsActions.fetchProduct());
        } catch (err) {
            setError(err.message)
        }
        setRefreshing(false)
    },[dispatch,setError,setLoading]);

useEffect(() => {
    const unSubscribe = props.navigation.addListener(
        'focus',
        loadProducts
    );

    return () => {
        unSubscribe();
    }
},[loadProducts])


    useEffect(() => {
        // YellowBox.ignoreWarnings(['Setting a timer'])
        setLoading(true);
        loadProducts().then(() => {
            setLoading(false)
        })
    },[dispatch, loadProducts])

const selectItemHandler = (id,title) => {
    props.navigation.navigate('ProductDetail',{
        productId:id,
        productTitle:title
    })
}


if(error){
return(
        <View style={styles.centered}>
            <Text>error occured</Text>
            <Button title='try again' onPress={loadProducts} />
        </View>
    )
}

if(loading){
    return(
        <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    )
}

if(!loading && products.length === 0){
    return(
        <View style={styles.centered}>
            <Text>No products</Text>
        </View>
    )
}

if(products){
    console.log(products)
}

    return(
        
        <FlatList 
        onRefresh={loadProducts}
        refreshing={refreshing}
         data={products} renderItem={
             
             itemData => <ProductItem image={itemData.item.imageUrl}
        title={itemData.item.title} price={itemData.item.price} 
        onSelect={() => {
            selectItemHandler(itemData.item.id,itemData.item.title)
        }}
        >
             <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title=""
          message={ 'added to cart'}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
        //   cancelText="No, cancel"
          confirmText="Okay"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            hideAlert();
          }}
          onConfirmPressed={() => {
            hideAlert();
          }}
        />
             <Button color={Colors.primary} title='View Details' onPress={() => {
            selectItemHandler(itemData.item.id,itemData.item.title)
        }}/>
                <Button color={Colors.primary} title='To Cart' onPress={() => {
            dispatch(cartActions.addToCart(itemData.item))
            showAlertFunction()
        }} />
        </ProductItem>}/>
    )
};

export const screenOptions = navData => {
    return{
        headerTitle: 'All Products',
        headerLeft : () => <HeaderButtons HeaderButtonComponent={Headerbutton}>
        <Item title='Menu' iconName={'bars'} onPress={() => {
            navData.navigation.toggleDrawer();
        }} />
    </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={Headerbutton}>
            <Item title='Cart' iconName={'shopping-cart'} onPress={() => {
                navData.navigation.navigate('Cart')
            }} />
        </HeaderButtons>
    }
   
}

const styles = StyleSheet.create({
    centered:{flex:1, justifyContent: 'center', alignItems:'center'}
})

export default ProductsOverviewScreen;