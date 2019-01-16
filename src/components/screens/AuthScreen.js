import React, { Component } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Container, Text } from "native-base";
import { Actions } from "react-native-router-flux";

export default class AuthScreen extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.appIconArea}>
          <Image
            source={require("../../assets/app_icon.png")}
            style={styles.appIcon}
          />
        </View>
        <Button
          block
          style={styles.signinButton}
          onPress={() => Actions.signin()}
        >
          <Text>サインイン</Text>
        </Button>
        <Button
          block
          info
          style={styles.signupButton}
          onPress={() => Actions.signup()}
        >
          <Text>新規登録する</Text>
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  appIconArea: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  appIcon: {
    width: 150,
    height: 96
  },
  buttonArea: {
    flex: 1
  },
  signinButton: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 25
  },
  signupButton: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 50
  }
});
