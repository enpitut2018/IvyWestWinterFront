import React, { Component } from "react";
import {
  AsyncStorage,
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import { Actions } from "react-native-router-flux";
import { getFetchWithToken } from "../../models/fetchUtil";
import { baseURL } from "../../libs/const";

// 画面幅サイズを取得
const { width } = Dimensions.get("window");

export default class UploadPhotosScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    };
  }

  componentWillMount() {
    url = baseURL + "uploads";
    try {
      const json = getFetchWithToken(url);
      this.setState({ photos: json });
    } catch (error) {
      console.error(error);
    }
  }

  reloadPhoto() {
    url = baseURL + "uploads";
    try {
      const json = getFetchWithToken(url);
      this.setState({ photos: json });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
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
        <Button
          onPress={() => this.reloadPhoto()}
          title="Reload"
          color="#841584"
        />
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
