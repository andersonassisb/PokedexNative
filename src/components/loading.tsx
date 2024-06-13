import React from 'react';
import {useTheme} from '../global/styles/context';
import {StyleSheet, ActivityIndicator, View} from 'react-native';

export const Loading: React.FC = () => {
  const {colors} = useTheme();
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={colors.brand.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    padding: 24,
  },
});
