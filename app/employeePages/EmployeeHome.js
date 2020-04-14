import React, {Component} from 'react';
import { FlatList, Dimensions, Text, StyleSheet, View, SafeAreaView, ActivityIndicator} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { ListItem } from "react-native-elements";

var viewWidth = Dimensions.get('window').width;
var viewHeight = Dimensions.get('window').height;


export default class EmployeeHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      orderQueue: [],
    }
  }

  componentDidMount(){
    this.retrieveOrderQueue();
  }

  renderSeparator = () => {
    return (
      <View
        style={styles.separator}
      />
    );
  };

  retrieveOrderQueue(){
    const url = 'http://kc499.us-west-2.elasticbeanstalk.com/GetOrderQueue';
    this.setState({ loading: true });

    RNFetchBlob.config({
      trusty: true
    }).fetch( 'GET', url, 
      { 'Content-Type': 'application/json'})
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          orderQueue: responseJson.orders,
          error: responseJson.error || null,
          loading: false,
        })
        console.warn(this.state.orderQueue)
      })
      .catch((error) => {
        console.error(error);
        this.setState({loading: false})
        alert("Order queue could not be loaded.")
    })
  }

  convertItemsJsonToString(items){
    var formattedString = "";
    var arrayLength = items.length;

    // Get the name and quantity of each item in the items list and create a nicely formatted string:
    for (var i = 0; i < arrayLength; i++){
      var itemName = items[i]["item_name"];
      var itemQuantity = items[i]["quantity"];

      formattedString = formattedString.concat(itemName, " x ", itemQuantity, "\n");
    }

    console.warn(formattedString);
    return formattedString;
  }

  approveOrder(orderID){
    if(orderID == null){
      alert("Invalid order ID, cannot process.")
      return;
    }

    RNFetchBlob.config({
      trusty: true
    }).fetch( 'POST', 'http://kc499.us-west-2.elasticbeanstalk.com/ApproveOrder', { 'Content-Type': 'application/json'},  JSON.stringify({ orderID: orderID }))
    .then( (response) => {
      let status = response.info().status;
      if(status == 200){
        this.removeOrderFromQueue(orderID);
        alert("Order successfully approved! \nPlease have the items ready for pickup.");   
      }else if(status == 403){
        alert("Insufficient funds.");
      }else{
        alert("Server error, order.")
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Server Error: Request could not be handled.");
    })
  }

  denyOrder(orderID){
    if(orderID == null){
      alert("Invalid order ID, cannot process.")
      return;
    }

    RNFetchBlob.config({
      trusty: true
    }).fetch( 'POST', 'http://kc499.us-west-2.elasticbeanstalk.com/DenyOrder', { 'Content-Type': 'application/json'},  JSON.stringify({ orderID: orderID }))
    .then( (response) => {
      let status = response.info().status;
      if(status == 200){
        this.removeOrderFromQueue(orderID);
        alert("Order successfully denied!");    
      }else{
        alert("Server error, order.")
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Request could not be handled.");
    })
  }

  removeOrderFromQueue(orderID){
    var tempData = this.state.orderQueue;
    var arrayLength = tempData.length;

    // Remove the order with orderID
    for (var i = 0; i < arrayLength; i++){
      if(tempData[i]["orderID"] == orderID){
          tempData.splice(i, 1);
          break;
      }
    }

    this.setState({ orderQueue: tempData });
  }

  render() {

    if (this.state.loading) {
      return (
        <SafeAreaView style={styles.loading}>
          <ActivityIndicator />
        </SafeAreaView>
      );
    }

    const {navigate} = this.props.navigation;

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#181818', justifyContent: 'space-between'}}>

          <View style={styles.titleStyle}>
            <Text style={styles.titleText}>Employees</Text>
          </View>
            
          <View style={styles.queueHeaderContainer}>
            <Text style={styles.queueHeaderText}>Order Queue</Text>
            <View style={styles.separator}></View>
          </View>

          <FlatList
          data={this.state.orderQueue}
          style= {styles.queueList}
          renderItem={({ item }) => (
            <ListItem
              leftAvatar={{ 
                source: require("../additionalPages/img/green3DCheck.png"),
                size: "medium",
                overlayContainerStyle: {backgroundColor: "#363636"},
                onPress: () => {
                  this.approveOrder(item.orderID);
                }
              }}
              rightAvatar={{ 
                source: require("../additionalPages/img/redCircleX.png"),
                size: "medium",
                overlayContainerStyle: {backgroundColor: "#363636"},
                onPress: () => {
                  this.denyOrder(item.orderID);
                }
              }}
              title={`Name: ${item.firstName} ${item.lastName} \nTotal: $${item.total}`}
              subtitle={`${this.convertItemsJsonToString(item.items)} \n\n${item.date}`}
              containerStyle={styles.itemContainer}
              titleStyle={styles.itemText}
              subtitleStyle={styles.itemSubtitleText}
            />
          )}
          keyExtractor={item => item.total + ""}
          ItemSeparatorComponent={this.renderSeparator}
        />

          

        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer:{
    backgroundColor: "#363636"
  },
  itemSubtitleText:{
    color: "grey",
    fontSize: 14
  },
  itemText:{
    color: "white",
    fontSize: 17
  },
  queueList:{
    flex: 0.5, 
    backgroundColor: '#363636',
    marginBottom: 15,
    borderWidth: 5,
    borderRadius: 5,
    borderColor: "grey"
  },
  queueHeaderContainer:{
    alignItems: "center",
    flex: 0.1,
    marginTop: 5,
  },
  queueHeaderText:{
    color: "white",
    fontSize: 25,
    borderColor: "grey",
    borderWidth: 2,
    width: viewWidth* 0.95,
    textAlign: "center",
    backgroundColor: "#363636",
    borderRadius: 5
  },
  separator:{
    height: 1,
    backgroundColor: "#A79E9C",
  },
  titleText:{
    fontSize: 25,
    color: "black"
  },
  titleStyle:{
    flex: 0.07,
    backgroundColor:"#fbba37",
    alignContent:"center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
})
