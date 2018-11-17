import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Dimensions
} from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import { getFetchWithToken } from "../../models/fetchUtil";
import { baseURL } from "../../libs/const";

// 画面幅サイズを取得
const { width } = Dimensions.get("window");

export default class DownloadPhotosScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      refreshing: false
    };
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

  componentWillMount() {
    this.reloadPhoto();
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.reloadPhoto();
  };

  render() {
    return (
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
              <AutoHeightImage
                key={index}
                width={width / 3}
                source={{ uri: photo.PhotoUrl }}
              />
            );
          })}
        </View>
      </ScrollView>
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
