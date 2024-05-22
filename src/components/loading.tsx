import React from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";

export const Loading: React.FC = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    padding: 24,
  },
});
