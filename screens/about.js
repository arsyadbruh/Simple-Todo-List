import React from "react";
import { Center, Text, Button } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

class AboutScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClearData = async () => {
    try {
      await AsyncStorage.clear();
      console.log("Cleared");
    } catch (e) {
      console.log("Error clear data: in about.js");
      console.error(e);
    }
  };

  render() {
    return (
      <Center flex={1}>
        <Text>Ini about screen</Text>
        <Button onPress={this.handleClearData}>Clear Data</Button>
      </Center>
    );
  }
}

export default AboutScreen;
