import React, {Component} from "react";
import {FlatList, StyleSheet, View, SafeAreaView, ActivityIndicator} from "react-native";
import {SearchBar, ListItem} from "react-native-elements";

export default class DrinkMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };

    // Delete this after API is working, just have this data to demonstrate how the views are working.
    this.allDrinks = [
      {key:1, name:"Chocolate Milk", image:require("./img/Chocolate_Milk.jpg"), price: "0.50"},
      {key:2, name:"Gatorade", image:require("./img/gatorade.jpg"), price: "1.89"},
      {key:3, name:"Chocolate Milk1", image:require("./img/Chocolate_Milk.jpg"), price: "0.50"},
      {key:4, name:"Gatorade1", image:require("./img/gatorade.jpg"), price: "1.89"},
      {key:5, name:"Chocolate Milk2", image:require("./img/Chocolate_Milk.jpg"), price: "0.50"},
      {key:6, name:"Gatorade2", image:require("./img/gatorade.jpg"), price: "1.89"},
      {key:7, name:"Chocolate Milk3", image:require("./img/Chocolate_Milk.jpg"), price: "0.50"},
      {key:8, name:"Gatorade3", image:require("./img/gatorade.jpg"), price: "1.89"},
      {key:9, name:"Chocolate Milk4", image:require("./img/Chocolate_Milk.jpg"), price: "0.50"},
      {key:10, name:"Gatorade4", image:require("./img/gatorade.jpg"), price: "1.89"},
      {key:11, name:"Chocolate Milk5", image:require("./img/Chocolate_Milk.jpg"), price: "0.50"},
      {key:12, name:"Gatorade5", image:require("./img/gatorade.jpg"), price: "1.89"},
      {key:13, name:"Chocolate Milk6", image:require("./img/Chocolate_Milk.jpg"), price: "0.50"},
      {key:14, name:"Gatorade6", image:require("./img/gatorade.jpg"), price: "1.89"},
      {key:15, name:"Chocolate Milk7", image:require("./img/Chocolate_Milk.jpg"), price: "0.50"},
      {key:16, name:"Gatorade7", image:require("./img/gatorade.jpg"), price: "1.89"},
    ];
  }

  // This method is invoked once after the native UI for this component has finished rendering. This will
  // automatically load all the drinks from the API once the screen is loaded.
  componentDidMount(){
    this.makeRemoteRequest();
  }


  makeRemoteRequest = () => {
    this.setState({loading: true});

    // Delete this statement after API is working.
    this.setState({loading: false, data: this.allDrinks, error: null})

    // Once we get the api set up, retrieve list of all drinks and save to local list:
    // const url = `https://<url to get list of drinks>`;
    // this.setState({ loading: true });

    // fetch(url)
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState({
    //       data: res.results,
    //       error: res.error || null,
    //       loading: false,
    //     });
    //     this.allDrinks = res.results;
    //   })
    //   .catch(error => {
    //     this.setState({ error, loading: false });
    //   });
  };

  addToOrder(){
    alert("TODO: Add navigation to popup to look at nutrition and add to order.")
  }

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.allDrinks.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    
    this.setState({
      data: newData,
    });
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
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              leftAvatar={{ source: item.image}}
              title={`${item.name}`}
              subtitle={`$${item.price}`}
              containerStyle={styles.itemContainer}
              titleStyle={styles.itemText}
              subtitleStyle={styles.itemText}
              onPress={() => this.addToOrder()}
            />
          )}
          keyExtractor={item => item.name}
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
    color: "white"
  },
  loading: { 
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