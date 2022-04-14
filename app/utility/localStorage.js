import { AsyncStorage } from "@react-native-async-storage/async-storage";

const store = async (key, value) => {
  await AsyncStorage.setItem(key, value);
};

const get = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    return null;
  }
};

export default {
  store,
  get,
};
