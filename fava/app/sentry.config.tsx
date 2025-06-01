import * as Sentry from "@sentry/react-native";
import * as Application from 'expo-application';
import { Platform } from 'react-native';

console.log("Sentry Release Info:", {
  applicationId: Application.applicationId,
  nativeVersion: Application.nativeApplicationVersion,
  buildVersion: Application.nativeBuildVersion,
});

console.log("Platform: ", Platform.OS)
const isWeb = (Platform.OS == 'web');
console.log("isWeb: ", isWeb)

const release = isWeb
  ? 'myapp-web@dev+0'
  : `${Application.applicationId}@${Application.nativeApplicationVersion}+${Application.nativeBuildVersion}`;

const dist = isWeb ? 'web-dev' : Application.nativeBuildVersion || undefined;

console.log({ release: release, dist: dist })

Sentry.init({
  dsn: "https://5822f5f078fbccce35a81e52af603e6b@o4509367082024960.ingest.us.sentry.io/4509367086022661",
  sendDefaultPii: true,
  enabled: __DEV__,
  debug: true,
  release: release,
  dist: dist
});