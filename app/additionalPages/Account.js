import React, {Component} from 'react';
import { Alert, Button, Text, View, SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

var viewWidth = Dimensions.get('window').width; 

class AccountSettings extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const {navigate} = this.props.navigation;

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#181818'}}>

            <View style={styles.titleStyle}>
                <Text style={styles.titleText}>Your Account</Text>
            </View>

            <ScrollView>

              <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>
                  Email: ~Use API~
                </Text>
              </View>

              <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>
                  Dining Dollars: ~Use API~
                </Text>
              </View>

              <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>
                  ID Number: ~Use API~
                </Text>
              </View>

            </ScrollView>

            <View style={styles.buttonStyle}>
                <Button
                  title="Change Password"
                  onPress={() => Alert.alert('Add popup window to create new password.')}
                  color="#fbba37"
                />
              </View>
              
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  titleText:{
    fontSize: 30, 
    color: 'white'
  },
  titleStyle:{
    marginBottom: 15,
    backgroundColor:'grey',
    alignItems:'center'
  },
  textStyle: {
    color: 'white',
    fontSize: 24
  },
  viewStyle: {
    marginBottom: 15,
    borderWidth: 1.5,
    borderColor: 'grey',
  },
  buttonStyle: {
    justifyContent: "flex-end",
    marginLeft: viewWidth * 0.3,
    marginRight: viewWidth * 0.3,
    marginBottom: 10,
  }
})

module.exports = AccountSettings