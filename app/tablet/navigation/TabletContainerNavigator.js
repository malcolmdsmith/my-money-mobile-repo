import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
//import SignInScreen from "../screens/SignInScreen";
import TransactionAllocatorScreen from "../screens/TransactionAllocatorScreen";
import BudgetTypesManagerScreen from "../screens/BudgetTypesManagerScreen";
import TransactionRulesManagerScreen from "../screens/TransactionRulesManagerScreen";
import SearchTransactionsScreen from "../screens/SearchTransactionsScreen";
import TestScreen from "../screens/TestScreen";

const Stack = createStackNavigator();

const TabletContainerNavigator = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="Home"
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Test" component={TestScreen} />
    {/* <Stack.Screen name="SignIn" component={SignInScreen} />  */}
    <Stack.Screen
      name="TransactionAllocator"
      component={TransactionAllocatorScreen}
    />
    <Stack.Screen
      name="BudgetTypesManager"
      component={BudgetTypesManagerScreen}
    />
    <Stack.Screen
      name="TransactionRulesManager"
      component={TransactionRulesManagerScreen}
    />
    <Stack.Screen
      name="SearchTransactions"
      component={SearchTransactionsScreen}
    />
  </Stack.Navigator>
);

export default TabletContainerNavigator;
