import { StyleSheet } from 'react-native';
import colors from './colors';
import fonts from './fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.textPrimary,
    fontSize: fonts.size.title,
    fontFamily: fonts.bold,
  },
  subtitle: {
    color: colors.textSecundary,
    fontSize: fonts.size.medium,
    fontFamily: fonts.bold,
  },
   text: {
    color: colors.textSecundary,
    fontSize: fonts.size.small,
    fontFamily: fonts.regular,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontFamily: fonts.bold,
    fontSize: fonts.size.medium,
    textAlign: 'center',
  },
  link: {
    color: colors.textSecundary,
    fontSize: fonts.size.small,
    fontFamily: fonts.bold,
  },
});
