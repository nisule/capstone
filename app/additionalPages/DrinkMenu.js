import React, {Component} from "react";
import {TouchableHighlight, Dimensions, Modal, Text, Alert, FlatList, StyleSheet, View, SafeAreaView, ActivityIndicator} from "react-native";
import {SearchBar, ListItem} from "react-native-elements";
import RNFetchBlob from 'rn-fetch-blob'

var viewWidth = Dimensions.get('window').width;
var viewHeight = Dimensions.get('window').height;  

export default class DrinkMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      modalVisible: false,
    };
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
    const url = 'https:10.0.2.2:5001/DrinkItems';
    this.setState({ loading: true });

    RNFetchBlob.config({
      trusty: true
    }).fetch( 'GET', url, 
      { 'Content-Type': 'application/json'})
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson,
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

  addToOrder(){
    alert("TODO: Add navigation to popup to look at nutrition and add to order.")
  }

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.state.data.filter(item => {
      const itemData = `${item.item_name.toUpperCase()}`;
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
                source: require("./img/Chocolate_Milk.jpg"),
                size: "large"
              }}
              title={`${item.item_name}`}
              subtitle={`$${item.price}`}
              containerStyle={styles.itemContainer}
              titleStyle={styles.itemText}
              subtitleStyle={styles.itemText}
              onPress={() => {this.setModalVisible(true);}}
            />
          )}
          keyExtractor={item => item.item_name}
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