import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://5822f5f078fbccce35a81e52af603e6b@o4509367082024960.ingest.us.sentry.io/4509367086022661",
  sendDefaultPii: true,
  enabled: __DEV__,
  debug: true,
});