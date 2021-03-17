import React ,{useEffect, useState, useCallback}from 'react';
import {FlatList,Button, ActivityIndicator,View, StyleSheet,Text, YellowBox } from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import ProductItem from '../../components/Shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Headerbutton from '../../components/UI/Headerbutton';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';

const ProductsOverviewScreen = props => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.availableProducts);
    const userProduct = useSelector(state => state.products.userProducts)
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

    return(
        <FlatList 
        onRefresh={loadProducts}
        refreshing={refreshing}
         data={products} renderItem={itemData => <ProductItem image={itemData.item.imageUrl}
        title={itemData.item.title} price={itemData.item.price} 
        onSelect={() => {
            selectItemHandler(itemData.item.id,itemData.item.title)
        }}
        >
             <Button color={Colors.primary} title='View Details' onPress={() => {
            selectItemHandler(itemData.item.id,itemData.item.title)
        }}/>
                <Button color={Colors.primary} title='To Cart' onPress={() => {
            dispatch(cartActions.addToCart(itemData.item))
        }} />
        </ProductItem>}/>
    )
};

export const screenOptions = navData => {
    return{
        headerTitle: 'All Products',
        headerLeft : () => <HeaderButtons HeaderButtonComponent={Headerbutton}>
        <Item title='Menu' iconName={'md-menu'} onPress={() => {
            navData.navigation.toggleDrawer();
        }} />
    </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={Headerbutton}>
            <Item title='Cart' iconName={'md-cart'} onPress={() => {
                navData.navigation.navigate('Cart')
            }} />
        </HeaderButtons>
    }
   
}

const styles = StyleSheet.create({
    centered:{flex:1, justifyContent: 'center', alignItems:'center'}
})

export default ProductsOverviewScreen;