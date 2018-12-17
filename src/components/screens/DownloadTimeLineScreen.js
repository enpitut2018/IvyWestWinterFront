import React, { Component } from "react";
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { getFetchWithToken } from "../../models/fetchUtil";
import { baseURL } from "../../libs/const";

// 画面サイズを取得
const { width } = Dimensions.get("window");

class DownloadTimeLineScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      refreshing: false
    };
  }

  componentWillMount() {
    this.reloadPhoto();
  }

  componentDidMount() {
    this.timer = setInterval(this.autoReload, 1000);
  }

  componentWillUnMount() {
    clearInterval(this.timer);
  }

  reloadPhoto() {
    url = baseURL + "/downloads";
    getFetchWithToken(url)
      .then(json => {
        this.setState({
          photos: json.reverse(),
          refreshing: false
        });
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
    const { photos } = this.state;
    console.log(photos);

    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <View style={styles.userInfo}>
          <Image
            style={styles.userAvatar}
            source={{
              uri:
                "https:/s3-ap-northeast-1.amazonaws.com/ivy-west-winter/user-face-photos/bfn7ucj3spn4isqqr1bg.jpg"
            }}
            // TODO サンプル画像差し替え
          />
          {/* <Text style={styles.userId}>{photos[0].userid}</Text> */}
        </View>
        <Image style={{ width: width }} source={{ uri: photos[0].url }} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F5FCFF"
  },
  userInfo: {
    flex: 1,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white"
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    marginLeft: 10
  },
  userId: {
    fontSize: 15
  }
});

export default DownloadTimeLineScreen;
