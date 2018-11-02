import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import DownloadPhotosScreen from "./src/components/DownloadPhotosScreen";
import CameraScreen from "./src/components/CameraScreen";
import UploadPhotosScreen from "./src/components/UploadPhotosScreen";
import UserScreen from "./src/components/UserScreen";
import AuthScreen from "./src/components/AuthScreen";
import { Actions, Router, Scene, Tabs, Stack } from "react-native-router-flux";
import { asyncStorageKeyPrefix } from "./src/libs/const";

const cameraIcon = () => (
  <Icon
    style={{ marginRight: 10 }}
    size={23}
    name="camera"
    color="#999"
    onPress={() => Actions.camera()}
  />
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    };
  }

  componentDidMount() {
    AsyncStorage.getItem(asyncStorageKeyPrefix + "token").then(token => {
      if (token !== null) {
        this.setState({ isLogin: true });
      }
    });
    if (this.state.isLogin === false) {
      Actions.auth();
    }
  }

  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar={true}>
          <Tabs key="tab" swipeEnabled={true} animationEnabled={true}>
            <Scene
              key="downloads"
              title="ダウンロード"
              initial={true}
              component={DownloadPhotosScreen}
              tabBarLabel="ダウンロード"
              icon={() => <Icon size={20} name="download" color="#999" />}
              renderRightButton={cameraIcon}
            />
            <Scene
              key="uploads"
              title="アップロード"
              component={UploadPhotosScreen}
              tabBarLabel="アップロード"
              icon={() => <Icon size={20} name="upload" color="#999" />}
              renderRightButton={cameraIcon}
            />
            <Scene
              key="user"
              title="ユーザー情報"
              component={UserScreen}
              tabBarLabel="ユーザー"
              icon={() => <Icon size={20} name="user" color="#999" />}
              renderRightButton={cameraIcon}
            />
          </Tabs>
          <Scene key="auth" component={AuthScreen} />
          <Scene key="camera" component={CameraScreen} />
        </Scene>
      </Router>
    );
  }
}

export default App;
