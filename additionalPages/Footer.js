import React, {Component} from 'react';
import { StyleSheet, View , TouchableOpacity, Image} from 'react-native';
import { withNavigation } from 'react-navigation';


export class FooterView extends React.Component {

  render(){
    return (
        <View style={styles.Footer}>

            <TouchableOpacity style={styles.FooterButton} onPress = {()=> this.props.navigation.navigate('DrinkMenu')} >                
                <Image
                style={{flex: 1, resizeMode: 'center'}} 
                source={require('./img/coffeeFooter.png')} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.FooterButton} onPress = {()=> this.props.navigation.navigate('FoodMenu')}>
                <Image
                    style={{flex: 1, resizeMode: 'center'}} 
                    source={require('./img/sandwich.png')} />  
            </TouchableOpacity>

            <TouchableOpacity style={styles.FooterButton} onPress = {()=> this.props.navigation.navigate('Search')}>
                <Image
                style={{flex: 1, resizeMode: 'center', width: '50%'}} 
                source={require('./img/search.png')} />  
            </TouchableOpacity>

            <TouchableOpacity style={styles.FooterButton} onPress = {()=> this.props.navigation.navigate('AccountSettings')}>
                <Image
                    style={{flex: 1, resizeMode: 'center', width: '50%'}} 
                    source={require('./img/accountFooter.png')} />     
            </TouchableOpacity>

            <TouchableOpacity style={styles.FooterButton} onPress = {()=> this.props.navigation.navigate('AppSettings')}>
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

  export default withNavigation(FooterView);