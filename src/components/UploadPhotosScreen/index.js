import React, { Component } from "react";
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import { getFetchWithToken } from "../../models/fetchUtil";
import { baseURL } from "../../libs/const";

// 画面幅サイズを取得
const { width } = Dimensions.get("window");

export default class UploadPhotosScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      refreshing: false
    };
  }

  componentWillMount() {
    url = baseURL + "/uploads";
    getFetchWithToken(url)
      .then(json => {
        this.setState({ photos: json });
      })
      .catch(error => {
        console.log(error);
      });
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    url = baseURL + "/uploads";
    getFetchWithToken(url)
      .then(json => {
        this.setState({ photos: json, refreshing: false });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
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
        <View style={styles.photoView}>
          {this.state.photos.map((photo, index) => {
            return (
              <AutoHeightImage
                key={index}
                width={width / 3}
                source={{ uri: photo.Url }}
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
  sampel: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
