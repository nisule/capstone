import React, {Component} from 'react';
import { Alert, Button, Text, TextInput, View, SafeAreaView, StyleSheet, Dimensions, AsyncStorage, Modal, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { green } from 'color-name';

var viewWidth = Dimensions.get('window').width; 
var viewHeight = Dimensions.get('window').height;

class AccountSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: "",
      email: "",
      balance: 0,
      isModalVisible: false,
      isChangePasswordVisible: true,
      currentPassword: "",
      newPassword: "",
      newPassword2: "",
      text: "",
    }
  }

  setModalVisible(visible) {
    this.setState({isModalVisible: visible});
  };

  setChangePasswordVisibile(visible) {
    this.setState({isChangePasswordVisible: visible});
  };

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
        <View 
          style={{flex: 1, backgroundColor: '#181818'}}
          >

              <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.isModalVisible}
              onRequestClose={() => {
                this.setModalVisible(false);
                this.setChangePasswordVisibile(true);
              }}>

              
                <View style={styles.container}>
                  <View style={styles.textInputContainer}>
                    <TextInput
                      style={styles.signupBoxes}
                      placeholder="Current password"
                      placeholderTextColor='white'
                      onChangeText={(text) => this.setState({currentPassword: text})}
                      passwordInput={this.state.text}
                      secureTextEntry

                      returnKeyType = { "next" }
                      onSubmitEditing={() => { this.Password.focus(); }}
                      blurOnSubmit={false}
                      ref={(input) => { this.currentPassword = input; }}
                    />
                    <TextInput
                      style={styles.signupBoxes}
                      placeholder="New password"
                      placeholderTextColor='white'
                      onChangeText={(text) => this.setState({newPassword: text})}
                      passwordInput={this.state.text}
                      secureTextEntry

                      returnKeyType = { "next" }
                      onSubmitEditing={() => { this.confirmPassword.focus(); }}
                      blurOnSubmit={false}
                      ref={(input) => { this.Password = input; }}
                    />
                    <TextInput
                      style={styles.signupBoxes}
                      placeholder="Confirm Password"
                      placeholderTextColor='white'
                      onChangeText={(text) => this.setState({newPassword2: text})}
                      passwordInput={this.state.text}
                      secureTextEntry
                      //onSubmitEditing={() => { this._touchable.touchableHandlePress() }}
                      ref={(input) => { this.confirmPassword = input; }}
                      // TODO: TRY TO MAKE KEYBOARD NOT SQUISH THE VIEWS, THEN DO PASSWORD CHECKS AND API CALL
                    />
                    
                    <Button 
                      title="Confirm password change"
                      color="#fbba37"
                    />
                  </View>
                </View>
              
            </Modal>
            

            <View style={styles.titleStyle}>
                <Text style={styles.titleText}>Your Account</Text>
            </View>  

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

            
            <View style={styles.buttonStyle}>
              {
                this.state.isChangePasswordVisible ?
                <Button
                  title="Change Password"
                  onPress={() => {
                    this.setModalVisible(true);
                    this.setChangePasswordVisibile(false);
                  }}
                  color="#fbba37"
                />
                : null
              }
            </View>

            
        </View>
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
    flex: 0.1,
    justifyContent: "flex-end",
    marginLeft: viewWidth * 0.3,
    marginRight: viewWidth * 0.3,
    marginBottom: 10,
  },
  signupBoxes: {
    flex: 0.09,
    fontSize: 18,
    backgroundColor: '#303030',
    color:'white',
    borderRadius: 6,
    alignItems: 'center',
  },
  container: {
    height: viewHeight / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: viewHeight * .3,
  },
  textInputContainer: {
    flex: 1
  }
})

module.exports = AccountSettings