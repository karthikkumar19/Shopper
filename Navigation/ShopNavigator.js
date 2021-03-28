import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator,DrawerItemList } from '@react-navigation/drawer';
import {Platform, SafeAreaView, ScrollView, View, Text,TouchableOpacity,StyleSheet} from 'react-native';

import ProductsOverviewScreen,{screenOptions as productsOverviewScreenOptions} from '../screens/shop/ProductsOverviewScreen';

import ProductDetailScreen,{screenOptions as productDetailScreenOptions} from '../screens/shop/ProductDetailScreen';
import CategoryOverViewScreen,{screenOptions as CategoryOverviewScreenOptions} from '../screens/shop/CategoryOverViewScreen';
import CategoryProductsScreen, {screenOptions as CategoryProductsScreenOptions}from '../screens/shop/CategoryProductsScreen';
import OrdersScreen, {screenOptions as ordersScreenOptions} from '../screens/shop/OrdersScreen';
import CartScreen,{screenOptions as cartScreenOptions} from '../screens/shop/CartScreen';
import CartConfirmScreen,{screenOptions as cartConfirmScreenOptions} from '../screens/shop/CartConfirmScreen';
import AuthScreen,{screenOptions as authScreenOptions} from '../screens/user/AuthScreen';
import UserProductsScreen ,{screenOptions as userProductsScreenOptions} from '../screens/user/UserProductsScreen';
import EditProductScreen ,{screenOptions as editProductsScreenOptions}from '../screens/user/EditProductScreen';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth';

const defaultNavOptions = {
    headerStyle:{
        backgroundColor:Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle:{
        fontFamily: 'open-sans-reg',
    },
    headerBackTitleStyle:{
        fontFamily:'open-sans-reg'
    },
    headerTintColor:Platform.OS === 'android' ? 'white' : Colors.primary
}

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
    return ( <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <ProductsStackNavigator.Screen name="ProductsOverview"
         component={ProductsOverviewScreen}
         options={productsOverviewScreenOptions} />
        <ProductsStackNavigator.Screen name="ProductDetail"
        component={ProductDetailScreen}
        options={productDetailScreenOptions} />
        <ProductsStackNavigator.Screen name="Cart"
        component={CartScreen} 
        options={cartScreenOptions}/>
         <ProductsStackNavigator.Screen name="ConfirmOrder"
        component={CartConfirmScreen} 
        options={cartConfirmScreenOptions}/>

    </ProductsStackNavigator.Navigator>
    )
}

const CategoryStackNavigator = createStackNavigator();

export const CategoryNavigator = () => {
    return(
        <CategoryStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <CategoryStackNavigator.Screen name="Categories"
            component={CategoryOverViewScreen}
             options={CategoryOverviewScreenOptions} />
             {/* <CategoryStackNavigator.Screen name="Add Category"
            component={AddCategoryScreen} 
            options={AddCategoryScreenOptions} /> */}
            <CategoryStackNavigator.Screen name="CategoryName"
            component={CategoryProductsScreen} 
            options={CategoryProductsScreenOptions} />
             <CategoryStackNavigator.Screen name="Cart"
            component={CartScreen} 
            options={cartScreenOptions} />
            <CategoryStackNavigator.Screen name="ProductDetail"
            component={ProductDetailScreen} 
            options={productDetailScreenOptions} />
        </CategoryStackNavigator.Navigator>
    )
}

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
    return (
        <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
                <OrdersStackNavigator.Screen name="Orders"
                component={OrdersScreen}
                options={ordersScreenOptions} />
        </OrdersStackNavigator.Navigator>
    );
};

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
    return(
        <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AdminStackNavigator.Screen name="UserProducts"
            component={UserProductsScreen} 
            options={userProductsScreenOptions}/>
           
            <AdminStackNavigator.Screen name="EditProduct"
            component={EditProductScreen}
            options={editProductsScreenOptions} />

        </AdminStackNavigator.Navigator>
    )
}




const styles = StyleSheet.create({
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor:'#d43545',
      width:'99%',
      borderRadius:8,
      marginHorizontal:2,
      marginVertical:3
      
    },
    label: {
      margin: 16,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, .87)',
    },
    iconContainer: {
      marginHorizontal: 16,
      width: 24,
      alignItems: 'center',
    },
    icon: {
      width: 24,
      height: 24,
    }
  });

export const ShopNavigator = () => {
    const dispatch = useDispatch();

    return (
        <ShopDrawerNavigator.Navigator drawerContent={
            props => {
                        return <ScrollView contentContainerStyle={{flex: 1,  flexDirection: 'column', justifyContent: 'space-between' }}>
                        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                          <DrawerItemList {...props} />
                        </SafeAreaView>
                        <TouchableOpacity onPress={() => {
                            dispatch(authActions.logout())
                        }}>
                          <View style={styles.item}>
                              <View style={styles.iconContainer}>
                              <Icon name='sign-out' size={23} color={props.Color} />
                              </View>
                            <Text style={styles.label}>Logout</Text>
                          </View>
                        </TouchableOpacity>
                      </ScrollView>
                        
                      
                    }
        } 
        drawerContentOptions={
            {
                activeTintColor:Colors.primary
            }
        }>
            <ShopDrawerNavigator.Screen name="Products" 
            component={ProductsNavigator} 
            options={
                {
            drawerIcon: props => ( 
              <Icon name='shopping-basket' size={23} color={props.Color} /> )
                        }
            } />
            <ShopDrawerNavigator.Screen name="Category" 
            component={CategoryNavigator} 
            options={
                {
            drawerIcon: props => ( 
              <Icon name='th-large' size={23} color={props.Color} /> )
                        }
            } />
              <ShopDrawerNavigator.Screen name="Orders" 
            component={OrdersNavigator} options={
                {
             drawerIcon: props => ( 
         <Icon name='history' size={23} color={props.Color} /> )
                        }
            } />
              <ShopDrawerNavigator.Screen name="Admin" 
            component={AdminNavigator}
            options={
                {
                 drawerIcon: props => ( 
                 <Icon name='user' size={23} color={props.Color} /> )
                        }
            } />
        </ShopDrawerNavigator.Navigator>
    )
}





const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return(
        <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AuthStackNavigator.Screen name="Auth" component={AuthScreen}
            options={authScreenOptions} />
        </AuthStackNavigator.Navigator>
    )
}

const ShopDrawerNavigator = createDrawerNavigator();


