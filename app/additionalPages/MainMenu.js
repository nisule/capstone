import React, {Component} from 'react';
import { Text, StyleSheet, View, SafeAreaView, FlatList} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { ListItem} from "react-native-elements";

import DrinkMenu from './DrinkMenu.js';
import FoodMenu from './FoodMenu.js';
import AccountSettings from './Account.js';
import AppSettings from './AppSettings.js';
import { FooterView } from './Footer.js';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class menuView extends Component {
  constructor(props) {
    super(props);

    // TODO: when this page loads, make a call to the API to get all the user's information, including orderHistory,
    // user_id, first_name, balance, etc.
    // A better solution would be to somehow have this information available globally once a user logs in.
    this.state = {
      user_id: 12345678,
      first_name: 'Tester',
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
        {key:1, item_name:"Apple Slices", image:require("./img/apple_slices.jpg"), price: "2.50", quantity: 5},
        {key:2, item_name:"Carrots", image:require("./img/carrots.jpg"), price: "1.50", quantity: 3},
        {key:3, item_name:"Chocolate Milk", image:require("./img/Chocolate_Milk.jpg"), price: "4.50", quantity: 9},
        {key:4, item_name:"Gatorade", image:require("./img/gatorade.jpg"), price: "1.89", quantity: 1},
      ],
    };
  }

  renderSeparator = () => {
    return (
      <View
        style={styles.separator}
      />
    );
  };

  render() {
    alert(global.items);
    return (
       // TODO: Somehow be able to access the current user's information to retrieve their first name and balance.
        <SafeAreaView style={{flex: 1, backgroundColor: '#181818'}}>
            <View style={styles.titleStyle}>
              <Text style={styles.titleText}>Cunning Coders' Cafe</Text>
            </View>

            <View style={styles.welcomeSection}>
              <Text style={styles.welcomeText}> Welcome, {this.state.first_name}!</Text>
              <View style={styles.separator}/>
              <Text style={{ alignContent: "flex-start", fontSize: 20}}> Balance: ${this.state.balance}</Text>
              <View style={styles.separator}/>
              <Text style={{ alignContent: "flex-start", fontSize: 20}}> User ID: {this.state.user_id}</Text>
            </View>

            <View style={styles.currentOrder}>
              <FlatList
                style= {{}}
                data={this.state.cartItems}
                renderItem={({ item }) => (
                  <ListItem
                    leftAvatar={{
                      source: item.image,
                      size: "medium",
                      borderWidth: 1
                    }}
                    title={`${item.item_name} x ${item.quantity}`}
                    subtitle={`Total: $${item.price}`}
                    containerStyle={styles.itemContainer}
                    titleStyle={styles.itemText}
                    subtitleStyle={styles.itemText}
                    onPress={() => {alert("TODO: Remove item from cart.");}}
                  />
                )}
                keyExtractor={item => item.item_name}
                ItemSeparatorComponent={this.renderSeparator}
              />
              <View style={{height: 3, backgroundColor: "black",}}/>
              <TouchableOpacity style={styles.checkoutButton} onPress={() => alert("TODO: Fill in with Order Review and button to Pay.")}>
                <Text style={styles.checkoutButtonText}>Checkout</Text>
              </TouchableOpacity>

            </View>

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
                    onPress={() => {alert("TODO: Show popup of all items in this order.");}}
                  />
                )}
                keyExtractor={item => item.order_id}
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
    marginBottom: 5,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 3,
    backgroundColor: '#7A5959',
    flex: 0.6
  },
  itemContainer:{
    backgroundColor: "white"
  },
  itemText:{
    color: "black",
    fontSize: 18
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
    flex: 0.3
  },
  separator:{
    height: 2,
    backgroundColor: "#A79E9C",
  },
  titleText:{
    fontSize: 25,
    color: 'white'
  },
  titleStyle:{
    flex: 0.09,
    marginBottom: 5,
    backgroundColor:'grey',
    alignContent:"center",
    alignItems: "center"
  },
  welcomeSection:{
    backgroundColor: "white",
    alignSelf: 'auto',
    marginBottom: 5,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 3
  },
  welcomeText:{
    color:'black',
    fontSize: 20,
    marginRight: 10,
    marginLeft: 10,
    textAlign: "center"
  }
})
module.exports = createAppContainer(TabNavigator);
