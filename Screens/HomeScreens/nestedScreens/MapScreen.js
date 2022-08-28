import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  const {
    params: {
      coordinates: { latitude, longitude },
      title,
    },
  } = route;

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
          title={title}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;
