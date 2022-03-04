import React, { useEffect } from "react";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData, getWeatherData } from "./api";

//material UI imports
import { CssBaseline, Grid } from "@material-ui/core";

function App() {
  const [places, setPlaces] = React.useState([]); //save places from API request
  const [filteredPlaces, setFilteredPlaces] = React.useState([]);
  const [coordinates, setCoordinates] = React.useState({}); //the location being searched for
  const [bounds, setBounds] = React.useState({}); //four corners of the map
  const [childClicked, setChildClicked] = React.useState(null);
  const [type, setType] = React.useState("restaurants");
  const [rating, setRating] = React.useState("");
  const [weatherData, setWeatherData] = React.useState([]); //save places from API request

  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filtered = places.filter((place) => place.rating >= rating);
    setFilteredPlaces(filtered);
  }, [rating]);
  //fetch from API, store in setPlaces
  React.useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);

      getWeatherData(coordinates.lat, coordinates.lng).then((data) =>
        setWeatherData(data)
      );

      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        //console.log(data);
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setIsLoading(false);
      });
    }
  }, [type, bounds]);
  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={3}
        style={{ width: "100%" }}
      >
        {/* take full width on mobile, only 1/3 on anything bigger */}
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
