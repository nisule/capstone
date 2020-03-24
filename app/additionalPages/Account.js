import React, {Component} from 'react';
import { Alert, Button, Text, View, SafeAreaView, StyleSheet, Dimensions, AsyncStorage} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

var viewWidth = Dimensions.get('window').width; 

class AccountSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: "",
      email: "",
      balance: 0
    }
  }

  retrieveUserData = async () => {
    try {
      const info = await AsyncStorage.getItem('user_info');
      if (info !== null) {
        const infoJson = JSON.parse(info);

        this.setState({email: infoJson.email, balance: infoJson.balance, user_id: infoJson.userID});
      }
    } catch (error) {
      alert("Error retrieving user data: " + error);
    }
  }
  
  render() {
    const {navigate} = this.props.navigation;
    this.retrieveUserData();

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#181818'}}>

            <View style={styles.titleStyle}>
                <Text style={styles.titleText}>Your Account</Text>
            </View>

            <ScrollView>

              <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>
                  Email: {this.state.email}
                </Text>
              </View>

              <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>
                  Dining Dollars: ${this.state.balance}
                </Text>
              </View>

              <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>
                  Student ID: {this.state.user_id}
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