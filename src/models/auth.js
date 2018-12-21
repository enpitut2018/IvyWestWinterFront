import { AsyncStorage } from "react-native";
import { asyncStorageKeyPrefix, baseURL } from "../libs/const";

export function signin(userId, pass) {
  const body = {
    userid: userId,
    password: pass
  };
  url = baseURL + "/signin";
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.status === 400) {
          throw new Error("ログインに失敗しました。");
        }
        return response.json();
      })
      .then(json => {
        // ログイン完了処理
        AsyncStorage.setItem(asyncStorageKeyPrefix + "token", json.token);
        resolve(json);
      })
      .catch(error => reject(error));
  });
}

export function signup(userId, pass) {
  const body = {
    userid: userId,
    password: pass
  };
  url = baseURL + "/signup";
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.status === 400) {
          throw new Error("サインアップに失敗しました。");
        }
        return response.json();
      })
      .then(json => {
        // サインアップ完了処理
        // TODO Tokenが返ってくるようになったらTokenを保存する
        AsyncStorage.setItem(asyncStorageKeyPrefix + "token", json.token);
        resolve(json);
      })
      .catch(error => reject(error));
  });
}
