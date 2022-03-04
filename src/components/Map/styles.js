import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  paper: {
    padding: "2px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100px",
    textAlign: "center",
    opacity: "0.8",
    "&:hover": {
      opacity: "1",
    },
  },
  mapContainer: {
    height: "85vh",
    width: "100%",
    //marginTop: "40px",
  },
  markerContainer: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    "&:hover": { zIndex: 2 },
  },
  pointer: {
    cursor: "pointer",
  },
}));
