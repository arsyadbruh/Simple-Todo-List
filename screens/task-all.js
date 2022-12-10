import React from "react";
import {
  Center,
  Text,
  HStack,
  VStack,
  Button,
  IconButton,
  Input,
  Icon,
  Box,
  Toast,
  ScrollView,
} from "native-base";
import { ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import TaskList from "../components/Task";

class TaskScreen extends React.Component {
  constructor(props) {
    super(props);
    this.toastID = "toast-add-task";
    this.state = {
      list: [],
      inputValue: "",
      isLoading: true,
    };
  }

  readAllList = async () => {
    try {
      const value = await AsyncStorage.getItem("@todo-list");
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      console.log("Error read all list: in task-all.js");
      console.error(e);
    }
  };

  handleAddTask = (data) => {
    console.log("adding");
    if (data === "") {
      if (!Toast.isActive(this.toastID)) {
        Toast.show({
          id: this.toastID,
          title: "Masukan nama task",
        });
      }
      return;
    }

    const prevList = this.state.list;

    this.setState({ list: [...prevList, { title: data, isCompleted: false }] }, () => {
      try {
        AsyncStorage.setItem("@task-list", JSON.stringify(this.state.list));
      } catch (e) {
        console.log("Error add task: in task-all.js");
        console.error(e.message);
      }
    });
  };

  handleDeleteTask = (index) => {
    const deletedList = this.state.list.filter((list, listIndex) => listIndex !== index);
    this.setState({ list: deletedList }, () => {
      try {
        AsyncStorage.setItem("@task-list", JSON.stringify(this.state.list));
      } catch (e) {
        console.log("Error delete task: in task-all.js");
        console.error(e.message);
      }
    });
  };

  handleStatusChange = (index) => {
    const newList = this.state.list;
    newList[index].isCompleted = !newList[index].isCompleted;
    this.setState({ list: newList }, () => {
      try {
        AsyncStorage.setItem("@task-list", JSON.stringify(this.state.list));
      } catch (e) {
        console.log("Error update status task: in task-all.js");
        console.error(e.message);
      }
    });
  };

  getTaskList = async () => {
    try {
      const value = await AsyncStorage.getItem("@task-list");
      if (value !== null) {
        console.log(value);
        this.setState({ list: JSON.parse(value) });
      } else {
        console.log("tidak ada task");
      }
    } catch (e) {
      console.log("Error get task: in task-all.js");
      console.error(e);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount() {
    this.getTaskList();
  }

  render() {
    const { list, inputValue, isLoading } = this.state;
    return (
      <Box mx={3} mt={5} flex={1}>
        <Box>
          <HStack space={2}>
            <Input
              flex={6}
              onChangeText={(char) => this.setState({ inputValue: char })}
              value={inputValue}
              variant="filled"
              borderWidth={1}
              borderColor="primary.600"
              placeholder="Add Task"
            />
            <IconButton
              flex={1}
              borderRadius="sm"
              variant="solid"
              icon={<Icon as={Feather} name="plus" size="sm" color="warmGray.50" />}
              onPress={() => {
                this.handleAddTask(inputValue);
                this.setState({ inputValue: "" });
              }}
            />
          </HStack>
        </Box>
        {isLoading ? (
          <Center flex={1}>
            <ActivityIndicator size="large" />
          </Center>
        ) : (
          <ScrollView mt={3}>
            {list.map((item, index) => {
                return (
                  <Box key={item.title + index.toString()}>
                    <TaskList
                      data={item}
                      index={index}
                      deletedIcon={true}
                      onItemPress={() => this.handleStatusChange(index)}
                      onChecked={() => this.handleStatusChange(index)}
                      onDeleted={() => this.handleDeleteTask(index)}
                    />
                  </Box>
                );
            })}
          </ScrollView>
        )}
      </Box>
    );
  }
}

export default TaskScreen;
