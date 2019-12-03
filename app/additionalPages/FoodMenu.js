import React, {Component} from 'react';
import { Text, StyleSheet, View, SafeAreaView, SectionList, TouchableOpacity} from 'react-native';
import { Card } from 'react-native-elements';

const data = [
  {
    title:"Your Favorites",
    data:[
      {key:1, name:"Apple Slices", image:require("./img/apple_slices.jpg"), price: "0.50"},
    ]
  },
  {
    title:"All Food",
    data:[
      {key:1, name:"Apple Slices", image:require("./img/apple_slices.jpg"), price: "0.50"},
      {key:2, name:"Carrots", image:require("./img/carrots.jpg"), price: "0.50"},
    ]
  }
]


export default class FoodMenu extends Component {
  constructor(props) {
    super(props);

  }

  addToOrder(){
    alert("TODO: Add navigation to popup to look at nutrition and add to order.")
  }

  render() {
		return (
      <SafeAreaView>
        <SectionList
            sections={data}
            
            // Generating section headers
            renderSectionHeader={({section}) => {
              return (
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>
                    {section.title}
                  </Text>
                </View>
              )
            }}

            // Generating items for each section
            renderItem={({item}) => {
              return (
                <TouchableOpacity  style={styles.cardBackground} onPress={() => this.addToOrder()}>
                  <Card imageProps={styles.image} containerStyle={styles.cardContainer} titleStyle={styles.titleStyle}
                  image={item.image}
                  title={item.name}>
                    <Text style={{textAlign: 'center', color:'#ffffff', fontSize: 20}}>
                      Price: ${item.price}
                    </Text>
                  </Card>
                </TouchableOpacity>
              )
            }}/>
      </SafeAreaView>
    );

	}
}

const styles = StyleSheet.create({
  cardBackground: { 
    backgroundColor:'#1c1c1c'
  },
  cardContainer:{
    backgroundColor:'#3d3d3d', 
    borderColor:"#b3b3b3", 
    borderRadius: 20, 
    borderWidth: 2,
    marginBottom: 20
  },
  titleContainer:{
    backgroundColor:"#5c4646",
    padding:10
  },
  titleStyle: {
    color:"#ffffff", 
    fontSize:20
  },
  title:{
    fontSize:25,
    color:"#ffffff"
  },
  image:{
    resizeMode: 'contain',
    borderRadius: 20,
    marginLeft:20
  }
});
