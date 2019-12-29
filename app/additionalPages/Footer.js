import React, {Component} from 'react';
import { StyleSheet, View , TouchableOpacity, Image} from 'react-native';
import { withNavigation } from 'react-navigation';


export class FooterView extends React.Component {

  render(){
    return (
        <View style={styles.Footer}>
            <TouchableOpacity style={styles.FooterButton} onPress = {()=> this.props.navigation.navigate('MainMenuView')}>
                <Image
                    style={{flex: 1, resizeMode: 'center', width: '80%'}} 
                    source={require('./img/home.png')} />     
            </TouchableOpacity>

            <TouchableOpacity style={styles.FooterButton} onPress = {()=> this.props.navigation.navigate('DrinkMenuView')} >                
                <Image
                style={{flex: 1, resizeMode: 'center', width: '90%'}} 
                source={require('./img/coffeeFooter.png')} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.FooterButton} onPress = {()=> this.props.navigation.navigate('FoodMenuView')}>
                <Image
                    style={{flex: 1, resizeMode: 'center', width: '90%'}} 
                    source={require('./img/sandwich.png')} />  
            </TouchableOpacity>

            <TouchableOpacity style={styles.FooterButton} onPress = {()=> this.props.navigation.navigate('SearchView')}>
                <Image
                style={{flex: 1, resizeMode: 'center', width: '50%'}} 
                source={require('./img/search.png')} />  
            </TouchableOpacity>
   
        </View>

    );
  }
}

const styles = StyleSheet.create({
    Footer: {
        flex: 0.11,
        flexDirection: 'row',
        alignItems: 'stretch',
        marginBottom: 0,
        backgroundColor: '#181818'
      },
    FooterButton: {
        flex: 0.25,
        alignItems: 'center',
        borderWidth: .3,
        borderColor: '#404040',
        borderRadius: 3,
        backgroundColor: 'rgba(52, 52, 52, 0.2)',

    },
})

  export default withNavigation(FooterView);