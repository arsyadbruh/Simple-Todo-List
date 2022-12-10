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
  Checkbox,
} from "native-base";
import {TouchableOpacity} from 'react-native'
import { Feather, FontAwesome5 } from "@expo/vector-icons";

export default function TaskList(props) {
  const item = props.data;
  const onChecked = props.onChecked;
  const onDeleted = props.onDeleted;
  const deletedIcon = props.deletedIcon;
  const onItemPress = props.onItemPress;
  return (
    <TouchableOpacity onPress={onItemPress}>
      <Box px={3} py={4} bg={item.isCompleted ? "primary.500":"#fff"} my={1} borderRadius={5}>
        <HStack w="100%" justifyContent="space-between" alignItems="center">
          <Checkbox
            isChecked={item.isCompleted}
            onChange={onChecked}
            accessibilityLabel="This is a dummy checkbox"
            value={item.title}
          />
          <Text
            width="100%"
            fontSize={16}
            flexShrink={1}
            textAlign="left"
            mx="2"
            strikeThrough={item.isCompleted}>
            {item.title}
          </Text>
          {deletedIcon && (
            <IconButton
              size="sm"
              colorScheme="trueGray"
              icon={<Icon as={FontAwesome5} name="trash" size="xs" color={item.isCompleted ? "#fff":"red.700"} />}
              onPress={onDeleted}
            />
          )}
        </HStack>
      </Box>
    </TouchableOpacity>
  );
}
