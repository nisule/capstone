import React, {Component} from 'react';
import { Text, StyleSheet, TextInput, View , TouchableOpacity, KeyboardAvoidingView, Image} from 'react-native';


export default class FooterView extends Component {
 
  render() {

    return (
        <View style={styles.Footer}>

        <TouchableOpacity style={styles.FooterButton} >
        <Image
            style={{flex: 1, resizeMode: 'center'}} 
            source={require('./img/coffeeFooter.png')} />  
        </TouchableOpacity>

        <TouchableOpacity style={styles.FooterButton} >
        <Image
                style={{flex: 1, resizeMode: 'center'}} 
                source={require('./img/sandwich.png')} />  
        </TouchableOpacity>

        <TouchableOpacity style={styles.FooterButton} >
        <Image
            style={{flex: 1, resizeMode: 'center', width: '50%'}} 
            source={require('./img/search.png')} />  
        </TouchableOpacity>

        <TouchableOpacity style={styles.FooterButton} >
            <Image
                style={{flex: 1, resizeMode: 'center', width: '50%'}} 
                source={require('./img/accountFooter.png')} />     
        </TouchableOpacity>

        <TouchableOpacity style={styles.FooterButton} >
            <Image
                style={{flex: 1, resizeMode: 'center', width: '50%'}} 
                source={require('./img/gear.png')} />     
        </TouchableOpacity>

        
        </View>

    );
  }
}

const styles = StyleSheet.create({
    Footer: {
        flex: 0.16,
        flexDirection: 'row',
        alignItems: 'stretch',
        marginBottom: 0,
        backgroundColor: 'rgba(52, 52, 52, 0.3)'
      },
    FooterButton: {
        flex: 0.25,
        alignItems: 'center',
        borderWidth: .3,
        borderColor: '#404040',
        borderRadius: 3,

    },
})

