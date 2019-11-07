import React, {Component} from 'react';
import { Text, StyleSheet, View} from 'react-native';
import FooterView from './Footer.js';

export default class menuView extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
        <View style={{flex: 1, backgroundColor: '#181818'}}>

            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: 30, color: 'white'}}>Cunning Coders' Cafe</Text>
            </View>
          
 
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <FooterView navigation={this.props.navigation}/>
            </View>

        </View>
    );
  }
}

const styles = StyleSheet.create({

})