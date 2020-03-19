import React, {Component} from 'react';
import { Text, StyleSheet, View, SafeAreaView, FlatList, AsyncStorage, Modal, Dimensions, TouchableHighlight, Image} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { ListItem} from "react-native-elements";

import DrinkMenu from './DrinkMenu.js';
import FoodMenu from './FoodMenu.js';
import AccountSettings from './Account.js';
import AppSettings from './AppSettings.js';
import { FooterView } from './Footer.js';
import { TouchableOpacity } from 'react-native-gesture-handler';

var viewWidth = Dimensions.get('window').width;
var viewHeight = Dimensions.get('window').height;

class cartItem{
  constructor(key, id, item_name, price, quantity){
    this.key = key;
    this.id = id;
    this.item_name = item_name;
    this.price = price;
    this.quantity = quantity;
  }
}


export default class menuView extends Component {
  constructor(props) {
    super(props);

    // TODO: when this page loads, make a call to the API to get all the user's information, including orderHistory,
    // user_id, first_name, balance, etc.
    // A better solution would be to somehow have this information available globally once a user logs in.
    this.state = {
      user_id: 12345678,
      first_name: "",
      balance: 500.14,
      orderHistory: [
        {order_id: 1, total: 10.22, date: "2019-11-23"},
        {order_id: 2, total: 13.52, date: "2019-11-28"},
        {order_id: 3, total: 5.21, date: "2019-12-05"},
        {order_id: 4, total: 13.37, date: "2019-12-15"},
        {order_id: 5, total: 2.25, date: "2019-12-16"},
        {order_id: 6, total: 5.41, date: "2020-01-15"}
      ],
      cartItems: [
        //{key:1, item_name:"Apples", image:require("./img/apple_slices.jpg"), price: "2.50", quantity: 5},
        //{key:2, item_name:"Carrots", image:require("./img/carrots.jpg"), price: "1.50", quantity: 3},
        //{key:3, item_name:"Chocolate Milk", image:require("./img/Chocolate_Milk.jpg"), price: "4.50", quantity: 9},
        //{key:4, item_name:"Gatorade", image:require("./img/gatorade.jpg"), price: "1.89", quantity: 1},
      ],
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


  loadAndViewCart = async () => {
    // Retrieve the cart items in async storage and update the local list of items.
    this.setState({cartItems: []});
    await this.retrieveCartData();
    this.setModalVisible(true);
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  };

  renderItem = item => {
    return (
        <ListItem
          leftAvatar={{
          source: require("./img/comingSoon.png"),
          size: "medium",
          borderWidth: 1
        }}
        title={`${item.item.item_name} x ${item.item.quantity}`}
        subtitle={`Price: $${item.item.price}`}
        containerStyle={styles.itemContainer}
        titleStyle={styles.itemText}
        subtitleStyle={styles.itemText}
        onPress={() => {alert("TODO: Remove item from cart.");}}
        ></ListItem>

    );
  }

  render() {
    this.retrieveUserData();
    return (
       // TODO: Somehow be able to access the current user's information to retrieve their first name and balance.
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
                renderItem={item => this.renderItem(item)} 
                keyExtractor={item => item.item_name + ""}
                ItemSeparatorComponent={this.renderSeparator}
              />
              <View style={{height: 3, backgroundColor: "black",}}/>
              <TouchableOpacity style={styles.checkoutButton} onPress={() => {alert("TODO: Fill in with Order Review and button to Pay.")}}>
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
