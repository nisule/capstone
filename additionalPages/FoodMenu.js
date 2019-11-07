import React, {Component} from 'react';
import { Text, StyleSheet, View} from 'react-native';
import FooterView from './Footer.js';

export default class FoodMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  render() {

    return (
        <View style={{flex: 1, backgroundColor: '#181818'}}>

            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: 30, color: 'white'}}>Food</Text>
            </View>
          


 
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <FooterView/>
            </View>

        </View>
    );
  }
}

const styles = StyleSheet.create({

})


