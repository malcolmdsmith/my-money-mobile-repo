import { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import TabletContainerNavigator from "./app/tablet/navigation/TabletContainerNavigator";
import { logIn, logInClientToken } from "./app/api/userApi";

export default class App extends Component {
  // state = {
  //   cntr: 0,
  // };

  async componentDidMount() {
    await logIn("malcolms65@gmail.com", "123456");
    //await logInClientToken();
  }

  // runProcess = () => {
  //   for (let i = 1; i <= 50; i++) {
  //     this.setState({ cntr: i });
  //   }
  // };

  render() {
    // const { cntr } = this.state;
    return (
      <>
        <NavigationContainer>
          <TabletContainerNavigator />
        </NavigationContainer>

        {/* <Button title="Run" onPress={() => this.runProcess()} />
        <ProgressBar value={cntr} /> */}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
