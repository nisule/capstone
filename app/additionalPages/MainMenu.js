import React, {Component} from 'react';
import { Button, TouchableOpacity, Text, StyleSheet, View, SafeAreaView, FlatList, AsyncStorage, Modal, Dimensions, Image} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { ListItem } from "react-native-elements";
import RNFetchBlob from 'rn-fetch-blob';

import DrinkMenu from './DrinkMenu.js';
import FoodMenu from './FoodMenu.js';
import AccountSettings from './Account.js';
import AppSettings from './AppSettings.js';
import { FooterView } from './Footer.js';
import EmployeeHome from '../employeePages/EmployeeHome.js';

var viewWidth = Dimensions.get('window').width;
var viewHeight = Dimensions.get('window').height;

class cartItem{
  constructor(key, id, item_name, price, quantity){
    this.key = key;
    this.item_id = id;
    this.item_name = item_name;
    this.price = price;
    this.quantity = quantity;
  }
}

export default class menuView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: 0,
      first_name: "",
      balance: 0,
      orderHistory: [
        {order_id: 1, total: 10.22, date: "2019-11-23"},
        {order_id: 2, total: 13.52, date: "2019-11-28"},
        {order_id: 3, total: 5.21, date: "2019-12-05"},
        {order_id: 4, total: 13.37, date: "2019-12-15"},
        {order_id: 5, total: 2.25, date: "2019-12-16"},
        {order_id: 6, total: 5.41, date: "2020-01-15"}
      ],
      cartItems: [],
      modalVisible: false,
    };
  }

  retrieveUserData = async () => {
    try {
      const info = await AsyncStorage.getItem('user_info');
      if (info !== null) {
        const infoJson = JSON.parse(info);

        this.setState({first_name: infoJson.firstName, balance: infoJson.balance, user_id: infoJson.userID});
      }
    } catch (error) {
      alert("Error retrieving user data: " + error);
    }
  }

  retrieveCartData = async () => {
    try {
      const items = await AsyncStorage.getItem('Cart');
      if (items !== null) {
        const itemsJson = JSON.parse(items);
        
        let key = 0;
        for (var item of itemsJson){
          this.state.cartItems.push(new cartItem(key, item.id, item.name, item.price, item.qty));
          key++;
        }
      }
    } catch (error) {
      alert("Error retrieving cart data: " + error);
    }
  };

  renderSeparator = () => {
    return (
      <View
        style={styles.separator}
      />
    );
  };

  componentDidMount = () => {
    //this.retrieveUserData();
  }

  clearCart = async () => {
    let tempData = [];
    try {
      await AsyncStorage.setItem('Cart', JSON.stringify(tempData))
    } catch (error) {
        console.error("Error clearing cart. " + error);
      }
  };

  loadAndViewCart = async () => {
    // Retrieve the cart items in async storage and update the local list of items.
    this.setState({cartItems: []});
    await this.retrieveCartData();
    this.setModalVisible(true);
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  };

  submitOrder = () => {
    if(this.state.cartItems.length ==0){
      alert("Please add items to the cart.")
      return;
    }
    let orderTotal = this.calcTotal();
    RNFetchBlob.config({
      trusty: true
    }).fetch( 'POST', 'https:10.0.2.2:5001/SubmitOrder', { 'Content-Type': 'application/json'},  JSON.stringify({
      Items: this.state.cartItems,
      userID: this.state.user_id,
      total: orderTotal
    }))
    .then( (response) => {
      let status = response.info().status;
      if(status == 200){
        this.clearCart();
        alert("Order successfully submitted! An employee will review your order shortly.");
        this.setModalVisible(false);
      }else{
        alert("Server error, order not submitted.")
        this.setModalVisible(false);
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Request could not be handled.");
    })
  }

  calcTotal = () => {
    let total = 0.00;
    for (var item of this.state.cartItems){
      let price = parseFloat(item.price);
      let qty = parseInt(item.quantity);
      total += price*qty;
    }
    return total.toFixed(2);
  }

  _removeCartItem = async (item_id, item_name) => {
    try {
      let storedData = await AsyncStorage.getItem('Cart');
      let tempData = JSON.parse(storedData);
      var arrayLength = tempData.length;

      // Scan through the items currently in the cart and if the item being removed has only 1 quantity, then remove
      // the item from the cart. Otherwise lower the quantity by one.
      for (var i = 0; i < arrayLength; i++){
        if(tempData[i]["id"] == item_id){
          var quantity = parseInt(tempData[i]["qty"]);
          if(quantity > 1){
            quantity--;
            tempData[i]["qty"] = quantity.toString();
          } else{
              // Remove the item from the cart if the quantity will be lowered to zero.
              tempData.splice(i, 1);
          }
          break;
        }
      }
    
      await AsyncStorage.setItem('Cart', JSON.stringify(tempData))
      alert(item_name + " removed from cart!");
      this.setModalVisible(false);
    } catch (error) {
        alert("Error removing item from cart: " + error);
    }
  };

  render() {
    this.retrieveUserData();
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#181818', justifyContent: 'space-between'}}>
          <View style={styles.titleStyle}>
            <Text style={styles.titleText}>Cunning Coders' Cafe</Text>
          </View>

          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}> Welcome, {this.state.first_name}!</Text>
            <View style={styles.separator}/>
            <Text style={{ alignContent: "flex-start", fontSize: 20, color: 'white'}}> Balance: ${this.state.balance}</Text>
            <View style={styles.separator}/>
            <Text style={{ alignContent: "flex-start", fontSize: 20, color: 'white'}}> User ID: {this.state.user_id}</Text>
          </View>

          <View style={styles.cartView}>
            <TouchableOpacity style = {styles.cartButton} onPress={() => this.loadAndViewCart()}>
            <Image
             style={{flex: .9, resizeMode: 'center', width: '100%', height: '100%'}} 
              source={require('./img/shopping_cart.png')} /> 
              <Text style={{fontSize: 18, color: 'white'}}>View Cart</Text>
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(false);
            }}>

            <View style={styles.currentOrder}>
              <FlatList
                style= {{flex: 0.7, backgroundColor: "white"}}
                data={this.state.cartItems}
                renderItem={({ item }) => (
                  <ListItem
                    leftElement={
                      <Image style={{width:75, height:75}} source={require("./img/comingSoon.png")}/>
                    }
                    rightElement={
                      <Button
                        onPress={() => {this._removeCartItem(item.item_id, item.item_name)}}
                        title="--"
                        color="red"
                      />
                    }
                    title={`${item.item_name} x ${item.quantity}`}
                    subtitle={`$${item.price}`}
                    containerStyle={styles.itemContainer}
                    titleStyle={styles.itemText}
                    subtitleStyle={styles.itemText}
                  />
                )}
                keyExtractor={item => item.item_name + ""}
                ItemSeparatorComponent={this.renderSeparator}
              />
              <View style={{height: 3, backgroundColor: "black",}}/>
              <TouchableOpacity style={styles.checkoutButton} onPress={() => {this.submitOrder();}} >
                <Text style={styles.checkoutButtonText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </Modal> 

          <View style={styles.orderHistoryView}>
            <Text style={styles.orderHistoryTitle}>Order History</Text>
            <View style={styles.separator}/>

            <FlatList
              style= {{marginBottom: 5}}
              data={this.state.orderHistory}
              renderItem={({ item }) => (

                <ListItem
                  title={`Total: ${item.total}`}
                  rightTitle={item.date}
                  containerStyle={styles.itemContainer}
                  titleStyle={styles.itemText}
                  subtitleStyle={styles.itemText}
                  onPress={() => { alert("Add popup to show items in order."); }}
                />
              )}
              keyExtractor={item => item.order_id + ""}
              ItemSeparatorComponent={this.renderSeparator}
            />
          </View>
          
        </SafeAreaView>
    );
  }
}
const TabNavigator = createBottomTabNavigator(
  {
    MainMenuView: {
      screen: menuView,
    },
    EmployeeView: {
      screen: EmployeeHome,
    },
    DrinkMenuView: {
      screen: DrinkMenu,
    },
    FoodMenuView: {
      screen: FoodMenu,
    },
    AccountSettingsView: {
      screen: AccountSettings,
    },
    AppSettingsView: {
      screen: AppSettings, }
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 20,
        alignContent: 'center',
      },
      style: {
        backgroundColor: 'rgba(52, 52, 52, .9)',
      },
    },
    tabBarComponent: props => (
      <FooterView{...props} />
      ),
  },
);

const styles = StyleSheet.create({
  cartView: {
    flex: .15,
    backgroundColor: '#363636',
    alignSelf: 'center',
    flexDirection: 'row',
    width: viewWidth * .75,
    marginBottom: -(viewHeight * .1),
    borderRadius: 10,
  },
  cartButton: {
    flex: 1,
    //backgroundColor: "#fbba37",
    //backgroundColor: 'rgba(52, 52, 52, 1)',
    width: viewWidth * .75,
    borderRadius: 10,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',

  },
  checkoutButton: {
    marginTop: 5,
    marginBottom: 5,
    alignSelf: "center",
    justifyContent: "center",
    padding: 6,
    backgroundColor: '#fbba37',
    borderWidth: 3,
    borderColor: '#404040',
    borderRadius: 6,
  },
  checkoutButtonText: {
    color: 'black',
    fontSize: 20
  },
  currentOrder:{
    marginTop: viewHeight* 0.1,
    marginLeft: viewWidth * 0.08,
    width: viewWidth * 0.85,
    height: viewHeight * 0.75,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 3,
    backgroundColor: '#363636',
  },
  itemContainer:{
    backgroundColor: "white"
  },
  itemText:{
    color: "black",
    fontSize: 18
  },
  modal:{
    alignItems: "center",
    backgroundColor:"white", 
    width: viewWidth * 0.6, 
    height: viewHeight * 0.4,
    justifyContent: "center",
    marginLeft: viewWidth * 0.2,
    marginTop: viewHeight * 0.3,
    borderRadius: 10
  },
  modalButtons: {
    width: viewWidth * 0.3,
    height: viewWidth * 0.15,
    justifyContent: "center",
    backgroundColor: '#fbba37',
    alignContent: 'center',
    borderWidth: 1,
    borderColor: '#404040',
    borderRadius: 6,
    marginTop: viewHeight * 0.05,
    marginBottom: viewHeight * 0.05
  },
  modalButtonText: {
    fontSize: 18,
    textAlign: "center"
  },
  orderHistoryTitle: {
    fontSize: 20,
    color:"black",
    fontWeight: "bold",
    textAlign: "center"
  },
  orderHistoryView: {
    marginBottom: 5,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 3,
    backgroundColor: 'white',
    flex: .3
  },
  separator:{
    height: 1,
    backgroundColor: "#A79E9C",
  },
  titleText:{
    fontSize: 25,
    color: 'black'
  },
  titleStyle:{
    flex: 0.07,
    marginBottom: -(viewHeight * .1),
    backgroundColor:'#fbba37',
    alignContent:"center",
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 5
  },
  welcomeSection:{
    flex: .12,
    backgroundColor: "#363636",
    alignSelf: 'auto',
    marginBottom: -(viewHeight * .1),
    borderRadius: 10,
    borderWidth: 3,

  },
  welcomeText:{
    color:'white',
    fontSize: 20,
    marginRight: 10,
    marginLeft: 10,
    textAlign: "center"
  }
})
module.exports = createAppContainer(TabNavigator);
