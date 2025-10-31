import { StyleSheet } from 'react-native';
import colors from './colors';
import fonts from './fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
  },
  title: {
    color: colors.textPrimary,
    fontSize: fonts.size.title,
    fontFamily: fonts.bold,
    marginBottom: 40,
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
    paddingVertical: "2%",
    paddingHorizontal: 20,
    marginTop: 30,
    borderRadius: 90,
    elevation: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: colors.textPrimary,
    fontFamily: fonts.bold,
    fontSize: fonts.size.medium,
    textAlign: 'center',
  },
  link: {
    color: colors.textSecundary,
    fontSize: fonts.size.small,
    fontFamily: fonts.bold,
  },
  logo:{
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 30,
    fontSize: fonts.size.small,
    marginBottom: 5,
    color: colors.textSecundary,
  },
  input: {
    width: "80%",
    paddingVertical: 11,
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderColor: `${colors.primary}70`,
    borderWidth: 3,
    fontSize: fonts.size.small,
    fontFamily: fonts.regular,
    color: colors.textSecundary,
    elevation: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    textAlignVertical: "center",
  },
});
