import React, {Component} from "react";
import {Dimensions, Modal, Text, TouchableHighlight, Alert, FlatList, StyleSheet, View, SafeAreaView, ActivityIndicator} from "react-native";
import {SearchBar, ListItem} from "react-native-elements";

var viewWidth = Dimensions.get('window').width;
var viewHeight = Dimensions.get('window').height;  

export default class FoodMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      modalVisible: false,
    };

    // Delete this after API is working, just have this data to demonstrate how the views are working.
    this.allFood = [
      {key:1, name:"Apple Slices", image:require("./img/apple_slices.jpg"), price: "0.50"},
      {key:2, name:"Carrots", image:require("./img/carrots.jpg"), price: "0.50"},
      {key:3, name:"Apple Slices1", image:require("./img/apple_slices.jpg"), price: "0.50"},
      {key:4, name:"Carrots1", image:require("./img/carrots.jpg"), price: "0.50"},
      {key:5, name:"Apple Slices2", image:require("./img/apple_slices.jpg"), price: "0.50"},
      {key:6, name:"Carrots2", image:require("./img/carrots.jpg"), price: "0.50"},
      {key:7, name:"Apple Slices3", image:require("./img/apple_slices.jpg"), price: "0.50"},
      {key:8, name:"Carrots3", image:require("./img/carrots.jpg"), price: "0.50"},
      {key:9, name:"Apple Slices4", image:require("./img/apple_slices.jpg"), price: "0.50"},
      {key:10, name:"Carrots4", image:require("./img/carrots.jpg"), price: "0.50"},
      {key:11, name:"Apple Slices5", image:require("./img/apple_slices.jpg"), price: "0.50"},
      {key:12, name:"Carrots5", image:require("./img/carrots.jpg"), price: "0.50"},
      {key:13, name:"Apple Slices6", image:require("./img/apple_slices.jpg"), price: "0.50"},
      {key:14, name:"Carrots6", image:require("./img/carrots.jpg"), price: "0.50"},
      {key:15, name:"Apple Slices7", image:require("./img/apple_slices.jpg"), price: "0.50"},
      {key:16, name:"Carrots7", image:require("./img/carrots.jpg"), price: "0.50"},
    ];
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  // This method is invoked once after the native UI for this component has finished rendering. This will
  // automatically load all the drinks from the API once the screen is loaded.
  componentDidMount(){
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    this.setState({loading: true});

    // Delete this statement after API is working.
    this.setState({loading: false, data: this.allFood, error: null})

    // Once we get the api set up, retrieve list of all food and save to local list:
    // const url = `https://<url to get list of food>`;
    // this.setState({ loading: true });

    // fetch(url)
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState({
    //       data: res.results,
    //       error: res.error || null,
    //       loading: false,
    //     });
    //     this.allFood = res.results;
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

    const newData = this.allFood.filter(item => {
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible(false);
        }}>
        <View style={styles.modal}>
          <Text style={styles.modalNutritionalText}>Fat: 0g</Text>
          <Text style={styles.modalNutritionalText}>Carbs: 0g</Text>
          <Text style={styles.modalNutritionalText}>Protein: 0g</Text>
          <Text style={styles.modalNutritionalText}>Calories: 0g</Text>

          <TouchableHighlight
            style={styles.modalButtons}
            onPress={() => {
              alert("Item added to cart!")
              this.setModalVisible(!this.state.modalVisible);
            }}>
            <Text style={styles.modalButtonText}>Add To Order</Text>
          </TouchableHighlight>
        </View>
      </Modal>

        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              leftAvatar={{ 
                source: item.image,
                size: "large"
              }}
              title={`${item.name}`}
              subtitle={`$${item.price}`}
              containerStyle={styles.itemContainer}
              titleStyle={styles.itemText}
              subtitleStyle={styles.itemText}
              onPress={() => {this.setModalVisible(true);}}
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
    color: "white",
    fontSize: 18
  },
  loading:{ 
    backgroundColor: "#1c1c1c", 
    flex: 1,
    alignItems: "center", 
    justifyContent: "center" 
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
  modalNutritionalText: {
    fontSize: 20
  },
  separator:{
    height: 2,
    backgroundColor: "#A79E9C",
  },
});