import React, {Component} from 'react';
import { Alert, Button, Text, TextInput, View, StyleSheet, Dimensions, AsyncStorage, Modal, TouchableOpacity} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

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
      authToken: ""
    }
  }

  retrieveAuthToken = async (info) => {
    try {
      const info = await AsyncStorage.getItem('authentication_data');
      if (info !== null) {
        const infoJson = JSON.parse(info);
        this.setState({authToken: infoJson});
      }
    } catch (error) {
      console.error(error);
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

        this.setState({email: infoJson.email, balance: infoJson.balance, user_id: infoJson.userID, authToken: infoJson.authToken});
      }
    } catch (error) {
      alert("Error retrieving user data: " + error);
    }
  }

  changePassword() {
    //this.retrieveAuthToken();

    // check if new passwords entered are the same
    if (this.state.newPassword === this.state.newPassword2) {
      // checks if password is long enough
      if (this.state.newPassword.length > 7) { 
        // make api call
        RNFetchBlob.config({
          trusty: true
      }).fetch( 'POST', 'http://kc499.us-west-2.elasticbeanstalk.com/ChangePassword', 
        { 'Content-Type': 'application/json'}, 
        JSON.stringify({ 
          currentPassword: this.state.currentPassword,
          password: this.state.newPassword,
          password2: this.state.newPassword2,
          authToken: this.state.authToken
        }))
        .then((response) => {
          let status = response.info().status;
         
          if(status == 200){
            // password change was successful
            alert("Password changed successfully.");
          } else{
            // password change failed
            alert("Password change failed, please try again.");
          }
        })
        .catch((error) => {
          console.error(error);
          alert("Request could not be handled.");
      })

      } else {
        alert("Password must be at least 8 characters long, please try again.")
      }
    } else {
      alert("New passwords must match, please try again.")
    }
  }
  
  render() {
    const {navigate} = this.props.navigation;
    this.retrieveUserData();
    
    return (
        <View style={{flex: 1, backgroundColor: '#181818'}}>

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
                      onSubmitEditing={() => { this.changePassword(); }}
                      ref={(input) => { this.confirmPassword = input; }}
                    />
                    
                    
                    <TouchableOpacity style={styles.changePasswordButton} onPress={() => {
                        this.changePassword();
                      }}
                      ref={(touchable) => this._touchable = touchable}
                      >
                    
                      <Text style={styles.buttonText}>Change password</Text>
                    </TouchableOpacity>
                    
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
  buttonText: {
    color: 'white',
    fontSize: 18
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
  },
  changePasswordButton: {
    justifyContent: "center",
    backgroundColor: '#fbba37',
    alignItems: 'center',
    fontSize: 50,
    flex: 0.15,
    borderWidth: 1,
    borderColor: '#404040',
    borderRadius: 6
  },
})

module.exports = AccountSettings