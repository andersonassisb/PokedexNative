import {StyleSheet, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {useGetPokemonByNameQuery} from '../hooks';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  DetailsScreenRouteProp,
  DetailsScreenNavigationProp,
} from '../navigation/types';

interface Props {
  testID?: string;
}

const DetailsScreen: React.FC<Props> = ({testID = 'DetailsScreen'}) => {
  const navigation = useNavigation<DetailsScreenNavigationProp>();
  const route = useRoute<DetailsScreenRouteProp>();

  const {title = 'Detalhes', name = ''} = useMemo(
    () => route.params ?? {},
    [route.params],
  );

  useGetPokemonByNameQuery(name);

  useEffect(() => {
    navigation.setOptions({title});
  }, [navigation, title]);

  return <View testID={testID} style={styles.container} />;
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
