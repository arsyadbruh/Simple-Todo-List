import React from "react";
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  ScrollView,
  Text,
  VStack,
  Center,
  AlertDialog,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

class AboutScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        isClearDataOpen: false
    }
  }

  handleClearData = async () => {
    try {
      await AsyncStorage.clear();
      this.setState({isClearDataOpen: false})
      console.log("Cleared");
    } catch (e) {
      console.log("Error clear data: in about.js");
      console.error(e);
    }
  };

  AlertClearData = () => {
    return (
      <Center>
        <AlertDialog isOpen={this.state.isClearDataOpen} onClose={() => this.setState({isClearDataOpen: false})}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Clear Data</AlertDialog.Header>
            <AlertDialog.Body>
                ini akan menghapus semua data todo list, data yang sudah dihapus tidak dapat dikembalikan
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button variant="unstyled" colorScheme="coolGray" onPress={() => this.setState({isClearDataOpen: false})}>
                  Cancel
                </Button>
                <Button colorScheme="danger" onPress={this.handleClearData}>
                  Delete
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>
    );
  };

  render() {
    return (
      <Box flex={1}>
        <this.AlertClearData/>
        <ScrollView px={3} py={5}>
          <Box mb={5}>
            <Heading>Aplikasi apa ini?</Heading>
            <Text textAlign={"justify"} mt={3} fontSize={"16px"} lineHeight={"xl"}>
              ini adalah aplikasi todo list yang sederhana digunakan untuk pembelajaran implementasi
              AsyncStorage pada react native.
            </Text>
          </Box>
          <Divider bg="gray.600" thickness="2" mt={5} />
          <Box mt={3}>
            <Heading>App Info</Heading>
            <VStack my={3}>
              <HStack my={1} justifyContent={"space-between"}>
                <Text color="dark.400" fontSize={"18px"} fontWeight={"bold"}>
                  Version
                </Text>
                <Text fontSize={"18px"}>v0.0.1</Text>
              </HStack>
              <HStack my={1} justifyContent={"space-between"}>
                <Text color="dark.400" fontSize={"18px"} fontWeight={"bold"}>
                  Update on
                </Text>
                <Text fontSize={"18px"}>Desember, 11 2022</Text>
              </HStack>
              <HStack my={1} justifyContent={"space-between"}>
                <Text color="dark.400" fontSize={"18px"} fontWeight={"bold"}>
                  Created By
                </Text>
                <Text fontSize={"18px"}>Muhamad Arsyad</Text>
              </HStack>
            </VStack>
          </Box>
          <Box mb={5}>
            <Button colorScheme="danger" onPress={() => this.setState({isClearDataOpen: true})} mb={5}>
              Clear Data
            </Button>
          </Box>
        </ScrollView>
      </Box>
    );
  }
}

export default AboutScreen;
