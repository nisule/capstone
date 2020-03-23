import React, {Component} from 'react';
import { StyleSheet, View , TouchableOpacity, Image, AsyncStorage} from 'react-native';
import { withNavigation } from 'react-navigation';


export class FooterView extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isEmployee: false
        };
      }

    retrieveEmployeeBoolean = async () => {
        try {
            const info = await AsyncStorage.getItem('user_info');
            if (info !== null) {
              const infoJson = JSON.parse(info);
      
              this.setState({isEmployee: infoJson.isEmployee});
            }
          } catch (error) {
            alert("Error retrieving user data: " + error);
          }
    };

    render(){
        this.retrieveEmployeeBoolean();
        return (
            // Using conditional rendering to load the appropriate footer for an employee and non-employee.
            this.state.isEmployee?
                <View style={styles.Footer}>
                    <TouchableOpacity style={styles.FooterButton} onPress = {()=> this.props.navigation.navigate('MainMenuView')}>
                        <Image
                            style={{flex: 1, resizeMode: 'center', width: '80%'}} 
                            source={require('./img/home.png')} />     
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.FooterButton} onPress = {()=> this.props.navigation.navigate('EmployeeView')}>
                        <Image
                            style={{flex: 1, resizeMode: 'center', width: '100%'}} 
                            source={require('./img/barista.png')} />  
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
        
                </View>
            :
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
        flex: 0.33,
        alignItems: 'center',
        borderWidth: .3,
        borderColor: '#404040',
        borderRadius: 3,
        backgroundColor: 'rgba(52, 52, 52, 0.2)',

    },
})

  export default withNavigation(FooterView);