import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';

const About = () => {
  const handleEmailPress = async () => {
    try {
      const url = 'https://kaina.tv/contactez-nous/';
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log('Erreur', 'Impossible d\'ouvrir le site Web.');
      }
    } catch (error) {
      console.log('Erreur', 'Une erreur est survenue.');
    }

  };


  
  const handleWebsitePress = async () => {
    try {
      const url = 'https://kaina.tv/contactez-nous/';
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log('Erreur', 'Impossible d\'ouvrir le site Web.');
      }
    } catch (error) {
      console.log('Erreur', 'Une erreur est survenue.');
    }
  };
















  
  return (
    <Animatable.View animation="fadeInLeft" duration={1500} style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>A PROPOS</Text>

        <Text style={styles.paragraph}>
          KAINA association loi 1901, créée en 2000, a pour objet de promouvoir et de favoriser toutes activités artistiques, culturelles, éducatives et sociales en utilisant comme support l’outil audiovisuel. Elle organise également des actions de formation se rapportant à ses activités.
        </Text>

        <Text style={styles.paragraph}>
          Installée à Montpellier, dans le quartier de la Mosson, une Zone Urbaine Sensible, l’association KAINA développe ses actions principalement dans ce quartier mais aussi sur l’ensemble du territoire national. Les projets de KAINA sont principalement destinés aux habitants des quartiers populaires de Montpellier, mais ils s’adressent également à toute personne souhaitant apprendre à utiliser les outils numériques. Le projet de KAINA est unique sur le plan régional et national.
        </Text>

        <Text style={styles.paragraph}>
          Tous les projets audiovisuels de KAINA sont conçus pour favoriser la culture, lutter contre les discriminations et créer du lien social.
        </Text>

        <Text style={styles.paragraph}>
          Les activités de KAINA.tv sont organisées autour de quatre domaines complémentaires : Votre Média Citoyen, qui rend visible les initiatives des quartiers populaires pour mieux comprendre leurs dynamiques et leur lien avec la société française ; Votre Labo Vidéo, qui développe l’apprentissage de la vidéo citoyenne par des formations d’éducation à l’image ; La Presta Solidaire, qui accompagne et forme des jeunes adultes en difficulté d’insertion en leur proposant des activités professionnelles liées aux nouvelles technologies de l’information et de la communication ; et Le Tremplin vers l’Avenir, qui redynamise le parcours personnel et professionnel de jeunes éloignés de l’emploi et de la formation par des formations pré-professionnalisantes dans les domaines de l’audiovisuel, du journalisme et de la communication.
        </Text>

        <Text style={styles.paragraph}>
          L’équipe de KAINA.tv est constituée de cinq salariés passionnés, professionnels et polyvalents, engagés autour des valeurs de partage, de diversité, d’éducation et de valorisation. Ils travaillent ensemble à la réflexion et à la mise en place des méthodes et des outils pour différents projets. Les membres de l’équipe sont : Akli Alliouat, directeur et fondateur ; Célia Augereau, chargée de projet ; Abderrahim Bassaoud, technicien audiovisuel ; et Jean-Fabrice Tioucagna, journaliste reporter d’images.
        </Text>

        <Text style={styles.paragraph}>
          Depuis sa création en 2000 par Akli Alliouat, KAINA a réalisé de nombreux projets et événements marquants. En 2004, elle a produit le documentaire « Mémoire Identités Paillade ». En 2005, un documentaire sur Eric et Ramzy a été présenté au festival international du cinéma méditerranéen - Cinemed. En 2007, la Web TV KAINA TV a été lancée. En 2009, l’émission « Viens chez Moi j’habite à la Paillade » a été créée. En 2011, l’association s’est installée sur le Grand Mail et a lancé le « Studio Kaina ». En 2013, elle a produit le web documentaire « On dit qu’à la Paillade ». En 2013 également, KAINA a organisé un événement pour le 30ème anniversaire de la Marche pour l’Égalité et contre le Racisme.
        </Text>

        <Text style={styles.paragraph}>
          Entre 2014 et 2020, KAINA a continué de développer ses projets avec la réalisation de plusieurs documentaires, émissions et événements, comme le documentaire « Visages » au Togo en 2017, « Chez Marcel » à Briançon en 2018, et « Voisin d’ici et là-bas » à Tinghir (Maroc) en 2018. En 2018, l’association a inauguré ses nouveaux locaux au 600 Avenue de Louisville. En 2019, elle a réalisé plusieurs portraits vidéo de jeunes volontaires en Grèce et des live Facebook à Roubaix. En 2020, KAINA a célébré ses 20 ans d’existence avec l’événement « 20 après on est encore là ! ».
        </Text>

        <View style={styles.emailContainer}>
          <Text style={styles.emailText}>Email: infos@kaina.tv</Text>
        </View>
      </ScrollView>

      <Animatable.View animation="fadeIn" duration={1500} style={styles.fixedButtonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEmailPress}>
          <Text style={styles.buttonText}>Envoyer un mail</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleWebsitePress}>
          <Text style={styles.buttonText}>Visitez notre site internet</Text>
        </TouchableOpacity>
      </Animatable.View>
    </Animatable.View>
  );
};






















const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Euclid',
  },
  paragraph: {
    fontSize: 16,
    fontFamily: 'Euclid',
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'justify',
  },
  emailContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  emailText: {
    fontSize: 16,
    fontFamily: 'Euclid',
  },
  fixedButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  button: {
    backgroundColor: '#ED4C77',
    padding: 10,
    marginVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Euclid',
    fontSize: 16,
  },
});

export default About;
