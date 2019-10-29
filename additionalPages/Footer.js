import React, {Component} from 'react';
import { Text, StyleSheet, TextInput, View , TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';


export default class FooterView extends Component {
 
  render() {

    return (
        <View style={styles.Footer}>
            <Text>Navigation Buttons</Text>
        </View>

    );
  }
}

const styles = StyleSheet.create({
    Footer: {
        flex: 0.16,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 0,
        backgroundColor: 'rgba(52, 52, 52, 0.3)'
      },

})

