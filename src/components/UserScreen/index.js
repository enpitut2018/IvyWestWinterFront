import React, { Component } from "react";
import { AsyncStorage, Image, StyleSheet, View } from "react-native";
import { Button, Text } from "native-base";
import { Actions } from "react-native-router-flux";
import ImagePicker from "react-native-image-picker";
import InitialIcon from "../../assets/initial_icon.png";
import { getFetchWithToken, postFetchWithToken } from "../../models/fetchUtil";
import { baseURL } from "../../libs/const";

const options = {
  title: "Select Avatar",
  customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

export default class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      avatarSource: InitialIcon
    };
  }

  componentWillMount() {
    url = baseURL + "/user";
    getFetchWithToken(url)
      .then(json => {
        console.log(json);

        if (json.avatarurl) {
          const source = { uri: json.avatarurl };
          this.setState({
            userId: json.userid,
            avatarSource: source
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  onPushUserAvatar() {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };
        let body = { source: response.data };
        postFetchWithToken(baseURL + "/uploadUserFace", body)
          .then(json => {
            console.log(json);
            this.setState({
              avatarSource: source
            });
          })
          .catch(error => {
            console.error(error);
          });
      }
    });
  }

  onPushSignout() {
    AsyncStorage.removeItem("@IvyWest:token").then(() => {
      Actions.reset("auth");
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>
          {this.state.userId}
        </Text>
        <Image source={this.state.avatarSource} style={styles.userAvatar} />
        <Button
          block
          style={styles.button}
          onPress={() => this.onPushUserAvatar()}
        >
          <Text>ユーザー画像を変更</Text>
        </Button>
        <Button
          block
          warning
          style={styles.button}
          onPress={() => this.onPushSignout()}
        >
          <Text>Sign out</Text>
        </Button>
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
  button: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 30
  },
  userAvatar: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    borderRadius: 50,
    marginBottom: 20
  }
});
