import styles from './styles';

export type IThemeContextData = {
  colors: Record<keyof typeof styles.colors, any>;
}