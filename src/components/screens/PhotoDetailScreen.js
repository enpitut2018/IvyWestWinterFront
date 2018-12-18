import React, { Component } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { createImageProgress } from "react-native-image-progress";
import * as Progress from "react-native-progress";
import AutoHeightImage from "react-native-auto-height-image";

const { width, height } = Dimensions.get("window");

const ImageWithProgress = createImageProgress(AutoHeightImage);

class PhotoDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageWidth: width,
      imageHeight: height / 3
    };
  }

  componentWillMount() {
    Image.getSize(this.props.photo.url, (imageWidth, imageHeight) => {
      this.setState({
        imageWidth: imageWidth,
        imageHeight: imageHeight
      });
    });
  }

  render() {
    const { photo } = this.props;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.userInfo}>
          <Image
            style={styles.userAvatar}
            source={{
              uri:
                "https:/s3-ap-northeast-1.amazonaws.com/ivy-west-winter/user-face-photos/bfn7ucj3spn4isqqr1bg.jpg"
            }}
            // TODO サンプル画像差し替え
          />
          <Text style={styles.userId}>{photo.userid}</Text>
        </View>
        <ImageWithProgress
          style={{
            width: this.state.imageWidth * (width / this.state.imageWidth),
            height: this.state.imageHeight * (width / this.state.imageWidth)
          }}
          width={width}
          source={{ uri: photo.url }}
          indicator={Progress.Pie}
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

export default PhotoDetailScreen;
