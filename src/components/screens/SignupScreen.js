import React, { Component } from "react";
import { Alert, StyleSheet } from "react-native";
import {
  Button,
  Container,
  Content,
  Form,
  Item,
  Input,
  Text
} from "native-base";
import { signup } from "../../models/auth";
import { Actions } from "react-native-router-flux";

export default class SigninScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      pass: ""
    };
  }

  onPushSubmit() {
    signup(this.state.userId, this.state.pass)
      .then(json => {
        Alert.alert(
          "新規登録完了",
          "まずはマイページで顔写真を登録しましょう！",
          [
            {
              text: "OK"
            }
          ]
        );
        Actions.reset("tab");
      })
      .catch(error => {
        return Alert.alert(error.message, "やり直してください。", [
          {
            text: "OK"
          }
        ]);
      });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Form>
            <Item>
              <Input
                onChangeText={text => this.setState({ userId: text })}
                value={this.state.userId}
                placeholder="ユーザーID"
                autoCapitalize="none"
              />
            </Item>
            <Item last>
              <Input
                onChangeText={text => this.setState({ pass: text })}
                value={this.state.pass}
                secureTextEntry={true}
                placeholder="パスワード"
                autoCapitalize="none"
              />
            </Item>
            <Button
              block
              info
              style={styles.button}
              onPress={() => this.onPushSubmit()}
            >
              <Text>新規登録する</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  button: {
    marginTop: 30,
    marginRight: 20,
    marginLeft: 20
  }
});
