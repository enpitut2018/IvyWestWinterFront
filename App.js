import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import DownloadPhotosScreen from "./src/components/DownloadPhotosScreen";
import CameraScreen from "./src/components/CameraScreen";
import UploadPhotosScreen from "./src/components/UploadPhotosScreen";
import SigninScreen from "./src/components/SigninScreen";
import { Actions, Router, Scene, Tabs, Stack } from "react-native-router-flux";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    };
  }

  componentDidMount() {
    if (this.state.isLogin === false) {
      Actions.signin();
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
              renderRightButton={() => (
                <Icon
                  style={{ marginRight: 10 }}
                  size={23}
                  name="camera"
                  color="#999"
                  onPress={() => Actions.camera()}
                />
              )}
            />
            <Scene
              key="uploads"
              title="アップロード"
              component={UploadPhotosScreen}
              tabBarLabel="アップロード"
              icon={() => <Icon size={20} name="upload" color="#999" />}
              renderRightButton={() => (
                <Icon
                  style={{ marginRight: 10 }}
                  size={23}
                  name="camera"
                  color="#999"
                  onPress={() => Actions.camera()}
                />
              )}
            />
          </Tabs>
          <Scene key="signin" component={SigninScreen} />
          <Scene key="camera" component={CameraScreen} />
        </Scene>
      </Router>
    );
  }
}

export default App;
