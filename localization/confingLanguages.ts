import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

// Set the key-value pairs for the different languages you want to support.
const i18n = new I18n({
  en: {
    emergency: {
      title: "Emergency",
      contacts: "Emergency contacts",
      contactsText: "You can add up to 5 emergency contacts",
      send: "SEND SOS",
      sendText:
        "If you click on SEND SOS you will immediately send a message if you have selected contacts",
      message: "I ask for help at the following location: ",
      position: "Your location",
    },
    contacts: {
      title: "Contacts",
      serch: "Search contacts",
    },
    tutorialMap: {
      start: "This app allows you to send an SOS to your SOS contacts",
      map: "This map shows your current location",
      addContacts: "Click this button to add and remove SOS contacts",
      contacts: "Here you will be able to see your selected SOS contacts",
      sos: "Clicking here will open the messaging app with the selected contacts and a message with your location",
    },
    tutorialContacts: {
      start: "Here you can see your entire address book",
      contacts: "Select a contact (maximum 5)",
      addContacts: "Click this button to add the selected SOS contacts",
    },
  },
  it: {
    emergency: {
      title: "Emergenza",
      contacts: "Contatti di emergenza",
      contactsText: "Puoi aggiungere fino a 5 contatti di emergenza",
      send: "INVIA SOS",
      sendText:
        "Se clicchi su INVIA SOS invierai immediatamente un messaggio hai contatti selezionati",
      message: "Chiedo aiuto alla seguente posizione: ",
      position: "La tua posizione",
    },
    contacts: {
      title: "Contatti",
      serch: "Cerca contatti",
    },
    tutorialMap: {
      start: "Questa app ti permette ti inviare un SOS ai tuoi contatti SOS",
      map: "Questa mappa mostra la tua posizione attuale",
      addContacts:
        "Clicca questo bottone per aggiungere e rimuovere contatti SOS",
      contacts: "Qui potrai vedere i tuoi contatti SOS selezionati",
      sos: "Cliccando qui si aprirà l'app di messaggistica con i contatti selezionati e un messaggio con la tua locazione",
    },
    tutorialContacts: {
      start: "Qui puoi vedere tutta la tua rubrica",
      contacts: "Seleziona un contatto (massimo 5)",
      addContacts:
        "Clicca questo bottone per aggiungere i contatti SOS selezionati",
    },
  },
});

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
i18n.enableFallback = true;

export default i18n;
