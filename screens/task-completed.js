import React from "react";
import { Center, Text } from "native-base";

class TaskCompletedScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Center flex={1}>
        <Text>Ini Screen Task</Text>
      </Center>
    );
  }
}

export default TaskCompletedScreen;
