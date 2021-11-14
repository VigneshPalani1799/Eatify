import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../HomePage";
import Learnmore from "../Learnmore";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Learnmore" component={Learnmore} />
    </Stack.Navigator>
  );
}

export default MyStack;
