import { IconButton, withTheme } from 'react-native-paper';

export const StyledIconButton = withTheme(({ theme, ...props }: any) => <IconButton style={{backgroundColor: theme.colors.card}} {...props} theme={theme} />);