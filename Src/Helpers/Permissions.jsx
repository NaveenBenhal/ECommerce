import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Alert, Linking, Platform } from 'react-native';

export const requestCameraPermission = async () => {
  try {
    let permission;

    if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.CAMERA;
    } else if (Platform.OS === 'android') {
      permission = PERMISSIONS.ANDROID.CAMERA;
    }

    if (permission) {
      const result = await request(permission);
      if (result === RESULTS.GRANTED) {
        console.log('You can use the camera');
        return true

      } else {
        console.log('Camera permission denied');
        Alert.alert('Permissions', "Alow Camera permissions", [
          { text: 'Okay', onPress: () => Linking.openSettings() },
        ])
        return false
      }
    } else {
      console.log('Permission not available for this platform');
      Alert.alert('Permissions', "Camera Permission not available for this platform",)
      return false
    }
  } catch (err) {
    console.log('Camera Permission Error', err);
    throw err
  }
};


export const requestGalleryPermission = async () => {
  try {
    let permission;

    if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
    } else if (Platform.OS === 'android') {
      permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES; // For Android 13+
    }

    if (permission) {
      const result = await request(permission);

      if (result === RESULTS.GRANTED) {
        console.log('Gallery access granted');
        return true
      } else {
        Alert.alert('Permissions', "Allow Gallery permissions", [
          { text: 'Okay', onPress: () => Linking.openSettings() },
        ])
        return false

      }
    } else {
      Alert.alert('Permissions', "Gallery Permission not available for this platform",)
      console.log('Gallery Permission not available for this platform');
      return false
    }
  } catch (err) {
    console.log('Gallery Permission Error', err);
    throw err

  }
};