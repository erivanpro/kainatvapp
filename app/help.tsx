import React, { useState } from "react";
import { Text, StyleSheet, ScrollView, View, Modal, TouchableOpacity, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ArmComponent from "@/assets/icons/arm";
import GlassComponent from "@/assets/icons/glass";
import SettingComponent from "@/assets/icons/SettingIcon";
import { MotiView, MotiText } from "moti";

export default function Help() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ question: '', answer: '' });

  const showModal = (question: string, answer: string) => {
    setModalContent({ question, answer });
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.aide}>
        <Text style={styles.aidetxt}>Aide</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 1500 }}
          style={styles.containerOne}
        >
          <LinearGradient
            colors={["#FAD408", "#FF77E0"]}
            style={styles.gradient}
          >
            <TouchableOpacity onPress={() => showModal('Comment devenir bénévole ?', 'Pour devenir bénévole, vous pouvez contacter l\'association KAINA à travers leur site internet ou visiter leurs bureaux à Montpellier. Ils accueillent volontiers les personnes désireuses de s\'impliquer dans leurs activités artistiques, culturelles, et éducatives.')}>
              <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'timing', duration: 1500 }}
                style={styles.box}
              >
                <MotiText style={styles.Txt}>Comment devenir{"\n"}bénévole ?</MotiText>
                <ArmComponent />
              </MotiView>
            </TouchableOpacity>
          </LinearGradient>
        </MotiView>

        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 1500 }}
          style={styles.containerOne}
        >
          <LinearGradient
            colors={["#FA0889", "#A200FF"]}
            style={styles.gradient}
          >
            <TouchableOpacity onPress={() => showModal('Guide du media citoyen', 'Le guide du média citoyen est une initiative de KAINA pour rendre visibles les initiatives issues des quartiers populaires et mieux comprendre les dynamiques en œuvre dans ces quartiers. Ce guide permet aux citoyens d\'apprendre et de participer activement à la production audiovisuelle.')}>
              <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'timing', duration: 1500 }}
                style={styles.box}
              >
                <MotiText style={styles.Txt}>Guide du media{"\n"}citoyen</MotiText>
                <GlassComponent />
              </MotiView>
            </TouchableOpacity>
          </LinearGradient>
        </MotiView>

        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 1500 }}
          style={styles.containerOne}
        >
          <LinearGradient
            colors={["#08FA89", "#00CCFF"]}
            style={styles.gradient}
          >
            <TouchableOpacity onPress={() => showModal('Tous nos services citoyen', 'Les services citoyens de KAINA incluent des formations en audiovisuel, journalisme, et communication. Ils accompagnent les jeunes adultes en difficulté d\'insertion professionnelle en leur offrant des opportunités dans le domaine des nouvelles technologies et de la communication.')}>
              <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'timing', duration: 1500 }}
                style={styles.box}
              >
                <MotiText style={styles.Txt}>Tous nos{"\n"}services citoyen</MotiText>
                <SettingComponent />
              </MotiView>
            </TouchableOpacity>
          </LinearGradient>
        </MotiView>
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={hideModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalQuestion}>{modalContent.question}</Text>
            <Text style={styles.modalAnswer}>{modalContent.answer}</Text>
            <Button title="Fermer" onPress={hideModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  aide: {
    marginBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  aidetxt: {
    fontFamily: "Euclid",
    color: "#707070",
    fontSize: 20,
  },
  gradient: {
    borderRadius: 15,
    height: 180,
    width: "100%",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  containerOne: {
    borderRadius: 15,
    height: 180,
    width: "100%",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  Txt: {
    color: "white",
    textAlign: "left",
    fontFamily: "Euclid",
    fontSize: 18,
    marginRight: 10,
  },
  box: {
    flexDirection: "row",
    justifyContent: "center",
    fontFamily: "Euclid",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalQuestion: {
    fontSize: 24,
    fontFamily: "Euclid",
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalAnswer: {
    fontSize: 18,
    fontFamily: "Euclid",
    color: '#666666',
    marginBottom: 20,
  },
});
