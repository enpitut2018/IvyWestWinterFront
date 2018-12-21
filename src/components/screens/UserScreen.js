import React, { Component } from "react";
import { Alert, AsyncStorage, Image, StyleSheet, View } from "react-native";
import { Button, Text } from "native-base";
import { Actions } from "react-native-router-flux";
import ImagePicker from "react-native-image-picker";
import InitialIcon from "../../assets/initial_icon.png";
import { getFetchWithToken, postFetchWithToken } from "../../models/fetchUtil";
import { baseURL } from "../../libs/const";

// ユーザアバター用カメラ起動オプション
const userAvatarCameraOptions = {
  cameraType: "front", // フロントカメラで起動 TODO フロント固定
  mediaType: "photo",
  quality: "0.1", // TODO 検証をしやくするため、品質を落としている。本番では0.5ほどに設定したい
  allowsEditing: true,
  storageOptions: {
    skipBackup: true, // iCloudのバックアップをしない
    path: "ivy-west-winter", // 画像を保存するフォルダ名
    cameraRoll: true // 本体のカメラロールに画像を保存する
  }
};

// 顔認証用カメラ起動オプション
const userFaceCameraOptions = {
  cameraType: "front", // フロントカメラで起動 TODO フロント固定
  mediaType: "photo",
  quality: "0.1", // TODO 検証をしやくするため、品質を落としている。本番では0.5ほどに設定したい
  allowsEditing: true,
  storageOptions: {
    skipBackup: true, // iCloudのバックアップをしない
    path: "ivy-west-winter", // 画像を保存するフォルダ名
    cameraRoll: true // 本体のカメラロールに画像を保存する
  }
};

class UserScreen extends Component {
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
    ImagePicker.launchCamera(userAvatarCameraOptions, response => {
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

  onPushUserFace() {
    ImagePicker.launchCamera(userAvatarCameraOptions, response => {
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
        postFetchWithToken(baseURL + "/uploadUserFace", body) // TODO 顔認証画像アップロードに修正する
          .then(json => {
            return Alert.alert(
              error.message,
              "顔認証用の画像をアップロードしました。",
              [
                {
                  text: "OK"
                }
              ]
            );
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
          <Text>ユーザー画像を登録</Text>
        </Button>
        <Button
          block
          style={styles.button}
          onPress={() => this.onPushUserFace()}
        >
          <Text>顔認証用画面を登録</Text>
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

export default UserScreen;
