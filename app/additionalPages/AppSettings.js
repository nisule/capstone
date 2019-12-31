import React, {Component} from 'react';
import { Text, StyleSheet, View, SafeAreaView, Dimensions, ScrollView, Button} from 'react-native';

var viewWidth = Dimensions.get('window').width; 

export default class AppSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  render() {
    const {navigate} = this.props.navigation;

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#181818'}}>

            <View style={styles.titleStyle}>
                <Text style={styles.titleText}>App Settings</Text>
            </View>

            <ScrollView>

              <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>
                  TODO: Fill with Application settings.
                </Text>
              </View>

            </ScrollView>

            <View style={styles.buttonStyle}>
                <Button
                  title="Disable Notifications"
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