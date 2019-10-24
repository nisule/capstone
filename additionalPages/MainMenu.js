import React, {Component} from 'react';
import { Button, Text, StyleSheet, TextInput, View , TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';


class menuView extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  render() {
    const {navigate} = this.props.navigation;

    return (
        <View style={{backgroundColor: 'green'}}>
            <Text>Menu</Text>
        </View>

    );
  }
}

const styles = StyleSheet.create({

})

module.exports = menuView