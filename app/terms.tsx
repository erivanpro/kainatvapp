import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import LogoComponent from "@/components/icons/logo";
import CloseComponent from "@/components/icons/Close";
import { router } from "expo-router";
import * as Animatable from 'react-native-animatable';


export default class Terms extends Component {
  goToSignUp = () => {
    router.push('signup');
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.logoContainer}>
            <LogoComponent />
          </View>

          <Text style={styles.title}>
            Conditions Générales et Confidentialité
          </Text>
          <Animatable.View animation="fadeIn" delay={50}       style={styles.content}>
            <Text style={styles.sectionTitle}>
              Utilisation des données personnelles collectées
            </Text>
            <Text style={styles.paragraph}>
              {"\n"}
              L'application collecte les informations suivantes auprès de vous :
              votre adresse e-mail, votre mot de passe, votre date de naissance,
              votre localisation et votre permission d'accès à la caméra.
              {"\n\n"}
              Les données à caractère personnel que vous nous communiquez sont
              traitées par notre équipe, responsable du traitement, à des fins
              de gestion interne et pour répondre à vos besoins.
              {"\n\n"}
              En aucun cas, ces données ne seront cédées ou vendues à des tiers.
              Conformément aux dispositions de la loi informatique et libertés
              du 6 janvier 1978, toutes les données informatiques vous
              concernant sont traitées de manière strictement confidentielle.
              Vous disposez d’un droit d’accès, de rectification et d’opposition
              à vos données. Pour cela, il vous suffit de nous en faire la
              demande en ligne ou par courrier en nous indiquant vos nom, prénom
              et adresse.
              {"\n\n"}
              <Text style={styles.boldParagraph}>Cookies</Text>
              {"\n"}
              Des cookies peuvent être utilisés pour améliorer notre service.
              Ils permettent notamment l'authentification et la connexion de
              l'Utilisateur, ainsi que la mémorisation des éléments de
              navigation pendant une session. Vous avez la possibilité de
              modifier les options de navigation pour choisir de n’accepter
              aucun cookie.
              {"\n\n"}
              <Text style={styles.boldParagraph}>
                Contenu embarqué depuis d’autres sites
              </Text>
              {"\n"}
              Notre application peut inclure des contenus intégrés (par exemple
              des vidéos, images, articles…) qui se comportent de la même
              manière que si vous visitiez un autre site.
              {"\n\n"}
              Ces sites web tiers peuvent collecter des données vous concernant,
              utiliser des cookies, embarquer des outils de suivis tiers, et
              suivre vos interactions avec ces contenus embarqués, si vous
              disposez d’un compte connecté sur leur site web.
              {"\n\n"}
              <Text style={styles.boldParagraph}>
                Statistiques et mesures d’audience
              </Text>
              {"\n"}
              Afin d’adapter notre service et son contenu à vos attentes, nous
              mesurons le nombre de visites, le nombre de pages vues, ainsi que
              votre activité sur notre application et votre fréquence de retour.
              Nous utilisons pour cela Google Analytics, un service d’analyse de
              site internet fourni par Google Inc.
              {"\n\n"}
              Les données générées par les cookies concernant votre utilisation
              de notre application (y compris votre adresse IP) sont transmises
              et stockées par Google sur des serveurs situés aux États-Unis.
              {"\n\n"}
              Google utilise cette information pour évaluer votre utilisation de
              notre application, compiler des rapports sur l’activité de notre
              application à notre intention, et fournir d’autres services
              relatifs à l’activité de notre application et à l’utilisation
              d’Internet.
              {"\n\n"}
              Google peut également communiquer ces informations à des tiers en
              cas d’obligation légale ou lorsque ces tiers traitent ces données
              pour le compte de Google, y compris notamment l’éditeur de cette
              application.
              {"\n\n"}
              En utilisant notre application, vous consentez expressément au
              traitement de vos données par notre équipe dans les conditions et
              pour les finalités décrites ci-dessus.
            </Text>
          </Animatable.View>
        </ScrollView>
        <TouchableOpacity style={styles.fab} onPress={this.goToSignUp}>
          <LinearGradient
            colors={['#FC4B92', '#EA0F58']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <CloseComponent />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom:30,
    marginTop: Platform.select({
      ios: 50,
      android: 50,
    }),
  },
  title: {
    fontSize: 22,
    fontFamily: "Okta",
    marginBottom: 20,
    textAlign: "center",
  },
  content: {
    width: "100%",
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Okta",
    color: "#333",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    fontFamily: "Euclid",
    color: "#555",
    marginBottom: 20,
    lineHeight: 20,
    textAlign: "justify",
  },
  boldParagraph: {
    fontSize: 14,
    fontFamily: "Okta",
    color: "#555",
    marginBottom: 20,
    lineHeight: 20,
    textAlign: "justify",
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    width: 50,
    height: 50,
    backgroundColor: "#EA0F58",
    borderRadius: Platform.select({
      ios: 25,
      android: 25,
    }),
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    elevation: 8,
  },
  gradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
