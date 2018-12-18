import React, { Component } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import PhotoDetail from "../organisms/PhotoDetail";

const { width, height } = Dimensions.get("window");

class PhotoDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoWidth: width,
      photoHeight: height / 3
    };
  }

  componentWillMount() {
    // TODO 画像表示速度に影響があるかを調査する
    Image.getSize(this.props.photo.url, (photoWidth, photoHeight) => {
      this.setState({
        photoWidth: photoWidth,
        photoHeight: photoHeight
      });
    });
  }

  render() {
    const { photo } = this.props;

    return (
      <ScrollView style={styles.container}>
        <PhotoDetail
          photo={photo}
          photoWidth={this.state.photoWidth}
          photoHeight={this.state.photoHeight}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F5FCFF"
  }
});

export default PhotoDetailScreen;
