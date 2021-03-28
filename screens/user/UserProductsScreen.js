import React,{useEffect,useState,useCallback} from 'react';
import {FlatList,Button,Alert,View,Text} from 'react-native';
import {useSelector, useDispatch,} from 'react-redux';
import ProductItem from '../../components/Shop/ProductItem';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import Headerbutton from '../../components/UI/Headerbutton';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';

const UserProductsScreen = props => {
    const [loading,setLoading] = useState(false);
    const [refreshing,setRefreshing] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch(); 
    const userProducts = useSelector(state => state.products.userProducts); 

    const editProductHandler = id => {
        props.navigation.navigate('EditProduct', {productId: id})
    }

    const deleteHandler = (id) =>{
        Alert.alert('Are you Sure?', 'Do you really want to delete this item?', [
            {text: 'No', style:'default'},
            {text:' Yes' , style:'destructive', onPress:() => {
                dispatch(productsActions.deleteProduct(id));
                props.navigation.navigate('UserProducts')
            }}
        ])
    }
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


    if(userProducts.length === 0 ){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center' }}>
                <Text>user products is empty , maybe start creating some?</Text>
            </View>
        )
    }

    return (
        <FlatList   onRefresh={loadProducts}
        refreshing={refreshing} data={userProducts} keyExtractor={item => item.id}
        renderItem={itemData => <ProductItem image={itemData.item.imageUrl}
        title={itemData.item.title} price={itemData.item.price}
        onSelect={() => {
            editProductHandler(itemData.item.id)
        }}
        >
             <Button color={Colors.primary} title='Edit' onPress={() => {
                 editProductHandler(itemData.item.id)
        }}/>
                <Button color={Colors.primary} title='Delete' onPress={() => {
                    deleteHandler(itemData.item.id)
        }} />
        </ProductItem>}/>
    )
}


export const screenOptions =navData => {
    return{
        headerTitle: 'Admin Products',
        headerLeft : () => <HeaderButtons HeaderButtonComponent={Headerbutton}>
        <Item title='Menu' iconName={'bars'} onPress={() => {
            navData.navigation.toggleDrawer();
        }} />
    </HeaderButtons>,
    headerRight: () => <HeaderButtons HeaderButtonComponent={Headerbutton}>
    <Item title='Add' iconName={'plus'} onPress={() => {
        navData.navigation.navigate('EditProduct');
    }} />
</HeaderButtons>
    }
   
}

export default UserProductsScreen
