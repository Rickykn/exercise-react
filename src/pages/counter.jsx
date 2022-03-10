import { Button, Center, Flex, Text, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CounterPage = () => {
  const [counter, setCounter] = useState(0);
  const counterSelector = useSelector((state) => state.counter);
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();

  const inputHandler = (event) => {
    const { value } = event.target;

    setInputValue(value);
  };

  const handleButton = (type) => {
    if (type === "increment") {
      dispatch({
        type: "INCREMENT_COUNTER",
      });
    } else if (type === "decrement") {
      dispatch({
        type: "DECREMENT_COUNTER",
      });
    } else if (type === "setvalue") {
      dispatch({
        type: "SET_VALUE",
        value: inputValue ? inputValue : 0,
      });
    } else if (type === "resetvalue") {
      dispatch({
        type: "RESET_VALUE",
      });
    }
  };

  return (
    <Flex marginLeft="100">
      <Center flexDirection="column">
        <Flex alignItems="center" marginTop="10" marginBottom="10">
          <Button onClick={() => handleButton("decrement")} marginRight="4">
            -
          </Button>
          <Text fontSize="lg">{counterSelector.count}</Text>
          <Button onClick={() => handleButton("increment")} marginLeft="4">
            +
          </Button>
        </Flex>
        <Flex>
          <Input onChange={inputHandler}></Input>
          <Button onClick={() => handleButton("setvalue")} marginLeft="5">
            Set Count
          </Button>
        </Flex>

        <Flex>
          <Button
            onClick={() => {
              handleButton("resetvalue");
            }}
          >
            Reset Count
          </Button>
        </Flex>
      </Center>
    </Flex>
  );
};

export default CounterPage;
