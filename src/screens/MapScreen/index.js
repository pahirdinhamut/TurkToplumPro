import { View, Text } from "react-native";
import React from "react";
import MapView, { Marker, Circle } from "react-native-maps";
import { Button, Input, Title } from "../../components";
import { height, horizontalScale, width } from "../../utils/Spacing";
import ComboBox from "../../components/ComboBox/ComboBox";
import { LocationRequest, LocationSuggesions } from "../../utils/Network";
import { useTheme } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContex";
import { Translation } from "../../utils/Strings";

export default function MapScreen({ navigation, route }) {
  const { colors } = useTheme();
  const [radius, setRadius] = React.useState("");
  const [city, setCity] = React.useState({ lat: 0, lon: 0, name: "", boundingBox: [] });
  const [keyWord, setKeyWord] = React.useState("");
  const [suggestions, setSuggestions] = React.useState(null);
  const [zoom, setZoom] = React.useState({ latDelta: 0.5, lonDelta: 0.5 });
  const { location } = useAuth();
  const [defaultLocation, setDefaultLocation] = React.useState(true);

  React.useEffect(() => {
    let typingTimer = setTimeout(async () => {
      if (keyWord) {
        let res = await LocationSuggesions("q", keyWord, location);
        console.log(res);
        setSuggestions(res);
      }
    }, 900); // Change the delay (in milliseconds) as needed
    return () => {
      clearTimeout(typingTimer);
    };
  }, [keyWord]);

  React.useEffect(() => {
    console.log("bbox: ", city);
    if (city.boundingBox && city.boundingBox.length > 0) {
      const latitudeDelta = Number(city.boundingBox[1]) - Number(city.boundingBox[0]);
      const longitudeDelta = Number(city.boundingBox[3]) - Number(city.boundingBox[2]);
      console.log(latitudeDelta, longitudeDelta);
      setZoom({ latDelta: latitudeDelta, lonDelta: longitudeDelta });
      setDefaultLocation(false);
    }
  }, [city.boundingBox]);

  const getCoord = async () => {
    const result = await LocationRequest("", location);
    if (result) {
      setCity({ ...city, lat: result.lat, lon: result.lon });
      setDefaultLocation(true);
    }
  };

  React.useEffect(() => {
    if ((route.params && route.params.lat, route.params.lon)) {
      console.log(route.params);
      setCity({
        ...city,
        name: route.params.name ? route.params.name : "",
        lat: route.params.lat ? Number(route.params.lat) : 0,
        lon: route.params.lon ? Number(route.params.lon) : 0
      });
      setRadius(route.params.radius ? route.params.radius : "");
      setDefaultLocation(false);
    } else {
      getCoord();
    }
  }, [route]);

  return (
    <View style={{ flex: 1 }}>
      <ComboBox
        label={Translation("City name")}
        value={city.name}
        onChoose={(item) => {
          //console.log(item.boundingBox, "selected item is");
          setCity({ name: item.value, lat: Number(item.lat), lon: Number(item.lon), boundingBox: item.boundingBox });
          setSuggestions(null);
          setDefaultLocation(false);
        }}
        onChangeText={(text) => {
          setKeyWord(text);
          setCity({ ...city, name: text });
        }}
        suggests={suggestions}
      />

      <View style={{ marginHorizontal: horizontalScale(10) }}>
        <Title title={Translation("Radius")} />
        <Input
          autoCorrect={false}
          value={radius}
          keyboardType={"number-pad"}
          onChangeText={setRadius}
          returnKeyType={"done"}
          placeholder="Örnek: 5, 10, 20 Km"
        />
      </View>
      <MapView
        style={{ flex: 1, margin: 10 }}
        onPress={() => {
          //handelLinking("map");
        }}
        //ref={mapRef}
        region={{
          latitude: city.lat,
          longitude: city.lon,
          latitudeDelta: zoom.latDelta,
          longitudeDelta: zoom.lonDelta
        }}
      >
        {defaultLocation ? null : (
          <Marker
            draggable
            coordinate={{ latitude: city.lat, longitude: city.lon }}
            onDragEnd={(e) => {
              setCity({ ...city, lat: e.nativeEvent.coordinate.latitude, lon: e.nativeEvent.coordinate.longitude });
            }}
          />
        )}
        <Circle
          strokeColor={"blue"}
          center={{
            latitude: city.lat,
            longitude: city.lon,
            latitudeDelta: zoom.latDelta,
            longitudeDelta: zoom.lonDelta
          }}
          radius={Number(radius) * 1000}
        />
      </MapView>
      <View style={{ flex: 0.1, justifyContent: "flex-end", marginHorizontal: 10 }}>
        <Button
          textColor={"white"}
          title={Translation("Apply")}
          onPress={() => {
            if (city.name != "") {
              navigation.navigate("filter", { ...city, radius: radius, category: route.params.category });
            } else {
              navigation.navigate("filter", { name: "", lat: "", lon: "", radius: 0, category: route.params.category });
            }
          }}
        />
      </View>
    </View>
  );
}
