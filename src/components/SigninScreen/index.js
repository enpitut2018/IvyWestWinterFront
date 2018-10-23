import React, { Component } from "react";
import {
  AsyncStorage,
  Button,
  StyleSheet,
  TextInput,
  View
} from "react-native";
import { Header, Body, Title } from "native-base";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "signin", // signin or signup
      userId: "",
      pass: ""
    };
  }

  onPushSubmit() {
    let body = {
      Userid: this.state.userId,
      Password: this.state.pass
    };
    console.log(body);
    if (this.state.mode === "signin") {
      // ログイン
      fetch("http://localhost:8080/signin", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(body)
      })
        .then(response => response.json())
        .then(json => {
          // ログイン完了処理
          AsyncStorage.setItem("@IvyWest:token", json.Token);
        })
        .catch(error => console.log(error));
    } else {
      // サインアップ
      fetch("http://localhost:8080/signup", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(body)
      })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          // サインアップ完了処理
          AsyncStorage.setItem("@IvyWest:token", json.Token);
        })
        .catch(error => console.log(error));
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
