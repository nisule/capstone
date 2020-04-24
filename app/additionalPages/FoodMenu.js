import React, {Component} from "react";
import {Dimensions, Text, TouchableHighlight, Alert, FlatList, StyleSheet, View, SafeAreaView, ActivityIndicator, AsyncStorage} from "react-native";
import {SearchBar, ListItem} from "react-native-elements";
import RNFetchBlob from 'rn-fetch-blob';
import { getURL } from '../URL.js';

var viewWidth = Dimensions.get('window').width;
var viewHeight = Dimensions.get('window').height;

class Item{
  constructor(id, name, price, qty){
    this.id = id;
    this.name = name;
    this.price = price;
    this.qty = qty;
  }
}

export default class FoodMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      currentDataDisplayed: [],
      error: null,
    };
  }

  _storeData = async (item) => {
    let tempData = [];
    try {
      let storedData = await AsyncStorage.getItem('Cart');
      if (storedData !== null) { //Data already stored
        tempData = JSON.parse(storedData);
      }

      var itemExists = false;
      var arrayLength = tempData.length;

      // Scan through the items currently in the cart and if the item being added already exists, increase its
      // quantity by one.
      for (var i = 0; i < arrayLength; i++){
        if(tempData[i]["id"] == item.id){
          var quantity = parseInt(tempData[i]["qty"]) + 1;
          tempData[i]["qty"] = quantity.toString();
          itemExists = true;
        }
      }

      // If item wasn't found in list, append it to the tempData.
      if(!Boolean(itemExists))
        tempData.push(item);

      await AsyncStorage.setItem('Cart', JSON.stringify(tempData))
      alert(item.name + " added to cart!");
    } catch (error) {
        alert("Error adding to cart. " + error);
      }
  };

  // This method is invoked once after the native UI for this component has finished rendering. This will
  // automatically load all the drinks from the API once the screen is loaded.
  componentDidMount(){
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    //const url = 'http://kc499.us-west-2.elasticbeanstalk.com/FoodItems';
    const url = getURL('local') + 'FoodItems';
    this.setState({ loading: true });

    RNFetchBlob.config({
      trusty: true
    }).fetch( 'GET', url, 
      { 'Content-Type': 'application/json'})
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson,
          currentDataDisplayed: responseJson,
          error: responseJson.error || null,
          loading: false,
        })
      })
      .catch((error) => {
        console.error(error);
        this.setState({loading: false})
        alert("Request could not be handled.")
    })
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    if(this.state.value == ""){
      this.setState({
        // If the search bar is empty, set the current data being displayed to all items.
        currentDataDisplayed: this.state.data,
      });
    } else{
      const newData = this.state.data.filter(item => {
        const itemData = `${item.item_name.toUpperCase()}`;
        const textData = text.toUpperCase();
  
        return itemData.indexOf(textData) > -1;
      });
      
      this.setState({
        currentDataDisplayed: newData,
      });
    }
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={styles.separator}
      />
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <SafeAreaView style={styles.loading}>
          <ActivityIndicator />
        </SafeAreaView>
      );
    }
		return (
      <SafeAreaView>
        <FlatList
          data={this.state.currentDataDisplayed}
          renderItem={({ item }) => (
            <ListItem
              leftAvatar={{ 
                source: require("./img/comingSoon.png"),
                size: "large"
              }}
              rightAvatar={{ 
                source: require("./img/plus.png"),
                size: "medium",
                onPress: () => {
                  this._storeData(new Item(item.item_id, item.item_name, item.price, "1"));
                }
              }}
              title={`${item.item_name}`}
              subtitle={`$${item.price}`}
              containerStyle={styles.itemContainer}
              titleStyle={styles.itemText}
              subtitleStyle={styles.itemText}
            />
          )}
          keyExtractor={item => item.item_name + ""}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </SafeAreaView>
    );

	}
}

const styles = StyleSheet.create({
  itemContainer:{
    backgroundColor: "#181818"
  },
  itemText:{
    color: "white",
    fontSize: 18
  },
  loading:{ 
    backgroundColor: "#1c1c1c", 
    flex: 1,
    alignItems: "center", 
    justifyContent: "center" 
  },
  separator:{
    height: 2,
    backgroundColor: "#A79E9C",
  },
});