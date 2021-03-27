import React from 'react';
import {View,StyleSheet,ScrollView} from 'react-native'; 
import Headerbutton from '../../components/UI/Headerbutton';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CategoryList from '../../components/Shop/CategoryList';



const  CategoryOverViewScreen = props => {

    const selectCategoryHandler = (category) => {
        props.navigation.navigate('CategoryName',{
           
            categoryName:category
        })
    }

    return (      
        <ScrollView style={{flex:1,backgroundColor:'black'}}>
<View style={styles.screen}>
<CategoryList onSelect={() => {selectCategoryHandler("Diary")}} image={'diary'} title="Diary" />
        <CategoryList onSelect={() => {selectCategoryHandler("Vegetables")}} image={'vegetables'}  title="Vegetables" />
       
        <CategoryList onSelect={() => {selectCategoryHandler("Snacks")}} image={'snacks'}  title="Snacks" />
        <CategoryList onSelect={() => {selectCategoryHandler("Breakfast")}} image={'breakfast'}  title="Breakfast" />
        <CategoryList onSelect={() => {selectCategoryHandler("Beverages")}} image={'beverages'}  title="Beverages" />
        <CategoryList onSelect={() => {selectCategoryHandler("Cleaning")}} image={'cleaning'}  title="Cleaning" />
        <CategoryList onSelect={() => {selectCategoryHandler("Health/Beauty")}} image={'health'} title="Health/Beauty" />
        <CategoryList onSelect={() => {selectCategoryHandler("Children")}} image={'children'} title="Children" />


      

        </View>
        </ScrollView>
      
      
           
    )
}

export const screenOptions = navData => {
    return{
        headerTitle: 'Categories',
        headerLeft : () => <HeaderButtons HeaderButtonComponent={Headerbutton}>
        <Item title='Menu' iconName={'bars'} onPress={() => {
            navData.navigation.toggleDrawer();
        }} />
    </HeaderButtons>,

    }
   
}


const styles = StyleSheet.create({
    screen:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
        backgroundColor:'black'
    }
})

export default CategoryOverViewScreen;
