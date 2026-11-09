import { SafeAreaView, StyleSheet, View, Image } from "react-native";
import LoginForm from "../../components/auth/LoginForm";
import { APP_INFO } from "../../constants/appInfo";
const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={APP_INFO.logo} style={{ width: 330, height: 160 }} />

        <LoginForm />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 250,
    backgroundColor: "#f8f5f5",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});

export default LoginScreen;
