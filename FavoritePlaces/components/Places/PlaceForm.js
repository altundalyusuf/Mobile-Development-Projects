import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors.js";
import ImagePicker from "./ImagePicker.js";
import LocationPicker from "./LocationPicker.js";
import Button from "../UI/Button.js";
import { useRoute } from "@react-navigation/native";
import { Place } from "../../models/place.js";

function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  const route = useRoute();

  useEffect(() => {
    if (route.params?.returnedTitle) {
      setEnteredTitle(route.params.returnedTitle);
    }
    if (route.params?.returnedImage) {
      setSelectedImage(route.params.returnedImage);
    }
  }, [route.params]);

  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  function savePlaceHandler() {
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    onCreatePlace(placeData);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker
        onTakeImage={takeImageHandler}
        defaultImage={selectedImage}
      />
      <LocationPicker
        onPickLocation={pickLocationHandler}
        enteredTitle={enteredTitle}
        enteredImage={selectedImage}
      />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
