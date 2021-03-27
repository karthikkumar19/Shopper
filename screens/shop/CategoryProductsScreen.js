import React ,{ useState}from 'react';
import {FlatList,Button, View, StyleSheet,Text } from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import ProductItem from '../../components/Shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import AwesomeAlert from 'react-native-awesome-alerts';
import Headerbutton from '../../components/UI/Headerbutton';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';


import Colors from '../../constants/Colors';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

const ProductsOverviewScreen = props => {
    const categoryName = props.route.params.categoryName;
    const products = useSelector(state => state.products.availableProducts.filter(product => product.category === categoryName))

    const dispatch = useDispatch();

    const [showAlert,setShowAlert] = useState(false);

    const showAlertFunction = () => {
        setShowAlert(true)
      };
     
    const  hideAlert = () => {
       setShowAlert(false)
      };
  

const selectItemHandler = (id,title) => {
    props.navigation.navigate('ProductDetail',{
        productId:id,
        productTitle:title
    })
}


if( products.length === 0){
    return(
        <View style={styles.centered}>
            <Text style={{color:'black'}}>No Products Found in this Category</Text>
        </View>
    )
}

    return(
        
        <FlatList 
       
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
        headerTitle:navData.route.params.categoryName,
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