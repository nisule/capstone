import React, {Component} from 'react';
import { Text, StyleSheet, View} from 'react-native';
import { SearchBar } from 'react-native-elements';

export default class Search extends Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    const { search } = this.state;

    return (
        <View style={{flex: 1, backgroundColor: '#181818'}}>

        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
        />
        
        </View>
    );
  }
}

const styles = StyleSheet.create({

})
