import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { APP_INFO } from "../../constants/appInfo";

const LogoHeader = ({ size = 170, sizeWidth = 330 }) => {
  return (
    <View style={styles.container}>
      <Image
        source={APP_INFO.logo}
        style={{ width: sizeWidth, height: size }}
      />

      <Text>{APP_INFO.nombre}</Text>
      <Text>{APP_INFO.descripcion}</Text>
      <Text>{APP_INFO.empresa}</Text>
      <Text>{APP_INFO.version}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});

export default LogoHeader;
