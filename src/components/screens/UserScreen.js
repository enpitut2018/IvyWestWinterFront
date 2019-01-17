import React, { Component } from "react";
import { AsyncStorage, Image, StyleSheet, View } from "react-native";
import { Button, Text } from "native-base";
import { Actions } from "react-native-router-flux";
import ImagePicker from "react-native-image-picker";
import InitialIcon from "../../assets/initial_icon.png";
import { getFetchWithToken, postFetchWithToken } from "../../models/fetchUtil";
import { baseURL } from "../../libs/const";

// react-native-image-picker用オプション変数
const options = {
  cameraType: "front", // フロントカメラで起動 TODO フロント固定
  mediaType: "photo",
  quality: 0.5,
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
      existAvatarSource: false,
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
            existAvatarSource: true,
            avatarSource: source
          });
        } else {
          this.setState({
            userId: json.userid
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  onPushUserAvatar() {
    if (this.state.existAvatarSource) {
      // すでに顔画像が登録されている場合はカメラを起動
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
              this.setState({
                existAvatarSource: true,
                avatarSource: source
              });
            })
            .catch(error => {
              console.error(error);
            });
        }
      });
    } else {
      // 顔画像登録後はギャラリーからの選択も可能
      ImagePicker.launchCamera(options, response => {
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
  }

  onPushSignout() {
    AsyncStorage.removeItem("@IvyWest:token").then(() => {
      Actions.reset("auth");
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.userInfoArea}>
          <Image source={this.state.avatarSource} style={styles.userAvatar} />
          <Text style={styles.userId}>{this.state.userId}</Text>
        </View>
        <Button
          block
          style={styles.photoButton}
          onPress={() => this.onPushUserAvatar()}
        >
          <Text>
            {this.state.existAvatarSource
              ? "アバター画像を変更する"
              : "顔認識用画像(アバター画像)を登録する"}
          </Text>
        </Button>
        <Button
          block
          warning
          style={styles.signoutButton}
          onPress={() => this.onPushSignout()}
        >
          <Text>サインアウト</Text>
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
  userInfoArea: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  photoButton: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 25
  },
  signoutButton: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 60
  },
  userId: { fontSize: 30, fontWeight: "bold", marginBottom: 10 },
  userAvatar: {
    width: 180,
    height: 180,
    backgroundColor: "white",
    borderRadius: 90,
    marginBottom: 20
  }
});

export default UserScreen;
