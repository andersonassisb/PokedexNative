import styles from './styles';

type IsObject<T> = T extends object ? (T extends any[] ? false : true) : false;

type ColorType<T> = {
  [K in keyof T]: IsObject<T[K]> extends true ? Record<string, string> : string;
};

export type IThemeContextData = {
  colors: ColorType<typeof styles.colors>;
};