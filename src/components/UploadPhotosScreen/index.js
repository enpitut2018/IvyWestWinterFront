import React, { Component } from "react";
import {
  AsyncStorage,
  Dimensions,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import { baseURL } from "../../common/const";

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
    AsyncStorage.getItem("@IvyWest:token").then(token => {
      fetch(baseURL + "/uploads", {
        method: "GET",
        mode: "no-cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: token
        }
      })
        .then(response => response.json())
        .then(json => {
          this.setState({ photos: json });
        })
        .catch(error => console.log(error));
    });
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
                source={{ uri: "data:image/jpeg;base64," + photo.Source }}
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
