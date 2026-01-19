import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

function AddPlace({ navigation }) {
  function createPlaceHandler(place) {
    insertPlace(place).then(() => {
      navigation.navigate("AllPlaces");
    });
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
