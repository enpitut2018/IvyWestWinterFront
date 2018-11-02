import React, { Component } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { Header, Body, Title } from "native-base";
import { signin, signup } from "../../models/auth";

export default class AuthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "signin", // signin or signup
      userId: "",
      pass: ""
    };
  }

  onPushSubmit() {
    if (this.state.mode === "signin") {
      // ログイン
      try {
        signin(this.state.userId, this.state.pass);
      } catch (error) {
        console.error(error);
      }
    } else {
      // サインアップ
      try {
        signup(this.state.userId, this.state.pass);
      } catch (error) {
        console.error(error);
      }
    }
  }

  onPushChangeMode() {
    if (this.state.mode === "signin") {
      this.setState({ mode: "signup" });
    } else {
      this.setState({ mode: "signin" });
    }
  }

  render() {
    return (
      <View>
        <Header>
          <Body>
            <Title>
              {this.state.mode === "signin" ? "サインイン" : "サインアップ"}
            </Title>
          </Body>
        </Header>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={text => this.setState({ userId: text })}
          value={this.state.userId}
          placeholder="ユーザーID"
          autoCapitalize="none"
        />
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={text => this.setState({ pass: text })}
          value={this.state.pass}
          placeholder="パスワード"
          autoCapitalize="none"
        />
        <Button
          onPress={() => this.onPushSubmit()}
          title={this.state.mode === "signin" ? "Sign in" : "Sign up"}
          color="#841584"
        />
        <Button
          onPress={() => this.onPushChangeMode()}
          title={
            this.state.mode === "signin"
              ? "Sign upへ切り替え"
              : "Sign inへ切り替え"
          }
          color="#841584"
        />
      </View>
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
  sample: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
