// SignupStyles.tsx

import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
      },
      scrollViewContainer: {
        flexGrow: 1,
      },
      container: {
        paddingHorizontal: 27,
      },
      logoContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
      },
      photoPicker: {
        alignItems: "center",
        marginBottom: 20,
      },
      formContainer: {
        width: "100%",
      },
      photoPickerIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F3F3F3",
      },


      buttonGradient: {
        paddingVertical: Platform.select({
          ios: 15,
          android: 10,
        }),


        paddingHorizontal: Platform.select({
          ios: 30,
          android: 25,
        }),
        borderRadius: Platform.select({
          ios: 50,
          android: 200,
        }),
      },







      buttonText: {
        textAlign:'center',
        color: "#fff",
        fontFamily: "Euclid",
        fontSize: 16,
      },
      titleContainer: {
        alignSelf: "flex-start",
        marginBottom: 20,
      },
      title: {
        textTransform: "uppercase",
        fontSize: 18,
        fontFamily: "Euclid",
        color: "#707070",
      },
      input: {
        backgroundColor: "#F3F3F3",
        fontFamily: "Euclid",
        height: 40,
        borderWidth: 2,
        borderColor: "#F3F3F3",
        borderRadius: 7,
        marginBottom: 10,
        paddingHorizontal: 10,
      },
      inputFocused: {
        backgroundColor: "white",
        borderColor: "#F34282",
      },
      checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
      },
      checkbox: {
        marginRight: 8,
      },
      checkboxText: {
        marginRight: Platform.select({
          ios: 20,
          android: 20,
        }),
        marginBottom:20,
        fontSize: 12,
        color: "#707070",
        fontFamily: "Euclid",
      },
      linkText: {
        textDecorationLine: "underline",
      },
   
});
