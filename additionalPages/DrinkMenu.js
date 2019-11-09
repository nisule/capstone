import React, {Component} from 'react';
import { Text, StyleSheet, View, TouchableHighlight, FlatList} from 'react-native';
import FooterView from './Footer.js'
export default class DrinkMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  
  addToOrder(){
    alert("Added item to order")
  }

  render() {
    return (
        <View style={{flex: 1, backgroundColor: '#181818'}}>

            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: 30, color: 'white'}}>Drinks</Text>
            </View>

            <View style={styles.container}>
              <FlatList
                data={[
                  {key: 'Caramel Frap'},
                  {key: 'Frap Mocha'},
                  {key: 'Frap Vanilla'},
                  {key: 'Frap Coffee'},
                  {key: 'Raspberry Rockstar'},
                  {key: 'Sweet Tea'},
                  {key: 'Raspberry Tea'},
                  {key: 'Cappuccino'},
                  {key: 'Macchiato'},
                  {key: 'Iced Coffee'},
                  {key: 'Iced Americano'},
                  {key: 'Hot Chocolate'}
                ]}
                renderItem={({item}) => {
                  return(
                    <TouchableHighlight onPress={() => this.addToOrder()}>
                      <Text style={styles.item}>{item.key}</Text>
                    </TouchableHighlight>
                  )
                  }
                }
              />
            </View>
          
            {/* <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <FooterView/>
            </View> */}

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 25,
   paddingTop: 10
  },
  item: {
    padding: 10,
    fontSize: 26,
    height: 60,
    color: 'white'
  },
})
