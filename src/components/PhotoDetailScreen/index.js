import React, { Component } from "react";
import { Dimensions, ScrollView } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";

const { width } = Dimensions.get("window");

class PhotoDetailScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { photo } = this.props;

    return (
      <ScrollView>
        <AutoHeightImage width={width} source={{ uri: photo.Url }} />
      </ScrollView>
    );
  }
}

export default PhotoDetailScreen;
