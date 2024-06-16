import React, {memo} from 'react';
import {capitalize} from 'lodash';
import {MinimalLink} from '../services/types';
import {useTheme} from '../global/styles/context';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  species: MinimalLink;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const EggGroups: React.FC<Props> = memo(({species}) => {
  const [eggGroups, setEggGroups] = React.useState<MinimalLink[]>([]);

  const {colors} = useTheme();

  React.useEffect(() => {
    fetch(species.url)
      .then(response => response.json())
      .then(data => {
        setEggGroups(data.egg_groups);
      });
  }, [species.url]);

  return (
    <View style={styles.container}>
      {eggGroups.map((eggGroup, index) => (
        <View
          key={index}
          style={{
            marginRight: 8,
            borderWidth: 1,
            borderRadius: 8,
            borderColor: colors.brand.primary,
          }}>
          <Text
            key={index}
            style={{
              padding: 8,
              fontSize: 18,
              fontWeight: '700',
              color: colors.brand.primary,
            }}>
            {capitalize(eggGroup.name)}
          </Text>
        </View>
      ))}
    </View>
  );
});

export default EggGroups;
