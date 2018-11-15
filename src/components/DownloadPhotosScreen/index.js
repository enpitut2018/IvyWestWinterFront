import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Dimensions
} from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import { getFetchWithToken } from "../../models/fetchUtil";
import { baseURL } from "../../libs/const";

const { width } = Dimensions.get("window");

export default class DownloadPhotosScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    };
  }

  reloadPhoto() {
    url = baseURL + "/downloads";
    getFetchWithToken(url).then(json => {
      this.setState({
        photos: json
      });
    }).catch(error => {
      console.log(error);
    });
  }

  componentWillMount() {
    this.reloadPhoto();
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
  sample: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
