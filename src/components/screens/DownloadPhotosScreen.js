import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Dimensions,
  Text,
  TouchableOpacity
} from "react-native";
import TouchablePhoto from "../parts/TouchablePhoto";
import { getFetchWithToken } from "../../models/fetchUtil";
import { baseURL } from "../../libs/const";
import { AsyncStorage } from "react-native";
import UserFilterBar from "../parts/UserFilterBar";
import InitialIcon from "../../assets/initial_icon.png";

// 画面幅サイズを取得
const { width } = Dimensions.get("window");

export default class DownloadPhotosScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      refreshing: false,
      filterUsers: [],
      avatarSource: InitialIcon,
      userid: null
    };
  }

  componentWillMount() {
    this.reloadPhoto();
  }

  componentDidMount() {
    this.loadUserAvatar();
    this.timer = setInterval(this.loadFilterUsers, 500); //フィルタされたユーザーリストと同期用
  }

  componentWillUnMount() {
    clearInterval(this.timer);
  }

  //フィルタバーとフィルタ画面に自身のアバターとIDを渡すために読み込む
  //UserFilterBarをcomponentにしてそっちで実装したほうが良い？
  loadUserAvatar = () => {
    url = baseURL + "/user";
    getFetchWithToken(url)
      .then(json => {
        if (json !== null) {
          const source = { uri: json.avatarurl };
          const id = json.userid;
          this.setState({
            avatarSource: source,
            userid: id
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  //フィルタ対象のユーザーを読み込む
  loadFilterUsers = async () => {
    try {
      targetFilterUsers = await AsyncStorage.getItem("filterUsers");
      if (targetFilterUsers !== null) {
        targetFilterUsers = JSON.parse(targetFilterUsers);
        // フィルタリストが更新されていたら画像をリロード
        if (
          !(
            JSON.stringify(this.state.filterUsers) ===
            JSON.stringify(targetFilterUsers)
          )
        ) {
          this.setState({ filterUsers: targetFilterUsers });
          this.reloadPhoto();
        }
      }
    } catch (error) {
      console.error();
    }
  };

  reloadPhoto() {
    let url = baseURL + "/downloadPhotoInfos";
    //フィルタ対象があればURLを変更
    if (this.state.filterUsers.length !== 0) {
      console.log(this.state.filterUsers);
      url += "?userid=";
      this.state.filterUsers.map(user => {
        url += user.userid + ",";
      });
      url = url.slice(0, -1); //末尾の,を削除
    }
    console.log(url);
    getFetchWithToken(url)
      .then(json => {
        if (json !== null) {
          this.setState({
            photos: json.reverse(),
            refreshing: false
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  // リフレッシュ非表示のため_onRefreshと似ているが定義した
  autoReload = () => {
    this.reloadPhoto();
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.reloadPhoto();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <UserFilterBar
          userid={this.state.userid}
          avatar={this.state.avatarSource}
          users={this.state.filterUsers}
        />
        <ScrollView
          style={styles.container}
          // 引っ張って更新
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <View style={styles.photoView}>
            {this.state.photos.map((photo, index) => {
              return (
                <TouchablePhoto
                  key={photo.id}
                  photo={photo}
                  width={width / 3}
                  height={width / 3}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  photoView: {
    flex: 3,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  sample: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
