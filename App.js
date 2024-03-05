import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, ToastAndroid, ScrollView, RefreshControl } from 'react-native';
import {Audio} from 'expo-av';

export default function App() {
  
  const [refreshing,setRefreshing] = useState(false);
  const [sound, setSound] = useState();
  let counter =0;

  useEffect(()=> {
    async function loadSound(){
      const {sound} = await Audio.Sound.createAsync(
        require ('./assets/sounds/pikachu_thunderbolt.mp4')
      );
      setSound(sound);
    }
    loadSound();
  },[]);

  const playSound= async() =>{
    if(sound){
      counter +=1;
      ToastAndroid.show(`Pikachu used Thunderbolt! ${counter}`, ToastAndroid.SHORT);
      await sound.replayAsync(); //used to keep on repeating the sound on a click of a button
    }
  };

  const pokemonNames = [
    "Venusaur",
    "Blastoise",
    "Alakazam",
    "Machamp",
    "Gyarados",
    "Tyranitar",
    "Metagross",
    "Salamence",
    "Lucario",
    "Infernape",
    "Empoleon",
    "Samurott",
    "Greninja",
    "Alakazam",
    "Absol",
    "Garchomp",
    "Lucario",
    "Zekrom",
    "Reshiram",
    "Kyurem",
    "Xerneas",
    "Yveltal",
    "Zygarde",
    "Solgaleo",
    "Lunala",
    "Necrozma",
    "Dialga",
    "Palkia",
    "Giratina",
    "Arceus",
  ];
  
  const [item, setItem] = useState([
    { key: '1', name: 'Pikachu' },
    { key: '2', name: 'Charizard' },
    { key: '3', name: 'Lucario' },
    { key: '4', name: 'Eevee' },
    { key: '5', name: 'Gengar' },
    { key: '6', name: 'Snorlax' },
    { key: '7', name: 'Greninja' },
    { key: '8', name: 'Umbreon' },
    { key: '9', name: 'Sylveon' },
    { key: '10', name: 'Mewtwo' },
    { key: '11', name: 'Dragonite' },
    { key: '12', name: 'Blaziken' },
    { key: '13', name: 'Gardevoir' },
    { key: '14', name: 'Rayquaza' },
    { key: '15', name: 'Arcanine' },

  ]);

  const getRandomColorHex = () => {
    // Generate random values for red, green, and blue components
    const r = Math.floor(Math.random() * 256); // Random value between 0 and 255
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
  
    // Convert each component to hexadecimal and pad with zeros if necessary
    const redHex = r.toString(16).padStart(2, '0'); // Convert to hexadecimal and pad with zeros if necessary
    const greenHex = g.toString(16).padStart(2, '0');
    const blueHex = b.toString(16).padStart(2, '0');
  
    // Concatenate the components to form the color hex value
    const colorHex = `#${redHex}${greenHex}${blueHex}`;
  
    return colorHex;
  }

  const getRandomColor = () => {
    return getRandomColorHex();
  }

  const addItems = () =>{
    const randomName = pokemonNames[Math.floor(Math.random() * pokemonNames.length)]; // Select a random Pokémon name from the array
    const newItem = { key: (item.length + 1).toString(), name: randomName };
    setItem([...item, newItem]);
  }

  const onRefresh =() =>{
    setRefreshing(true)
    setTimeout(()=>{
      addItems()
      counter=0;
      setRefreshing(false)
    },1000)

  }


  return (
    <View style={styles.container}>
      <Image source={require('./assets/favicon.png')} />
      <Text style={{ color: 'black' }}>
        This is a line of text.
        {'\n'}
        This is another line of text.
        {'\n'}
      </Text>

      <Button title='Pikachu' onPress={playSound} color='#FFDB58' />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

        {item.map((item) => (
          <Text key={item.key} style={[styles.text, {color:getRandomColor()}]}>
            {item.name}
          </Text>
        ))}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    marginTop: 10,
    maxHeight:300,
    width: '80%' ,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
  },
});
