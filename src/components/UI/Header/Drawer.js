import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft/";
import TimelineIcon from "@material-ui/icons/Timeline";
import AddNodeIcon from "@material-ui/icons/Add";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import UndirectedEdgeIcon from "@material-ui/icons/RemoveOutlined";
import DirectedEdgeIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import BookIcon from "@material-ui/icons/Book";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Menu from "../Menu/Menu";
import AlgorithmOptions from "../Menu/AlgorithmOptions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";

const drawerWidth = 450;
const useStyles = makeStyles((theme) => ({
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  visualizeButtonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(6, 1, 6),
  },
  visualizeButton: {
    alignItems: "center",
    padding: theme.spacing(2, 1, 2),
  },
}));
const CustomDrawer = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [algorithmMenuAnchor, setAlgorithmMenuAnchor] = useState(null);
  const algorithmMenuOpen = Boolean(algorithmMenuAnchor);
  const [addUndEdgeFromMenuAnchor, setAddUndEdgeFromMenuAnchor] =
    useState(null);
  const [undEdgeFrom, setUndEdgeFrom] = useState("From");
  const [undEdgeTo, setUndEdgeTo] = useState("To");
  const addUndEdgeFromMenuOpen = Boolean(addUndEdgeFromMenuAnchor);
  const [addUndEdgeToMenuAnchor, setAddUndEdgeToMenuAnchor] = useState(null);
  const addUndEdgeToMenuOpen = Boolean(addUndEdgeToMenuAnchor);
  const [nodeIndices, setNodeIndices] = useState([]);
  const [deleteNode, setDeleteNode] = useState("Index");
  const [deleteNodeMenuAnchor, setDeleteNodeMenuAnchor] = useState(null);
  const deleteNodeMenuOpen = Boolean(deleteNodeMenuAnchor);

  //const nodeIndices = []
  useEffect(() => {
    const newNodeIndices = [];
    for (let i = 0; i < props.canvasRef.current.state.noOfVertices; i++) {
      newNodeIndices.push(i);
    }
    console.log("useEff");
    setNodeIndices(newNodeIndices);
  }, [
    props.canvasRef.current
      ? props.canvasRef.current.state.noOfVertices
      : props.canvasRef.current,
  ]);
  // [...Array(props.canvasRef.current.state.noOfVertices).keys()]
  // useEffect(() => {
  //     nodeIndices = [...Array(props.canvasRef.current.state.noOfVertices).keys()]
  // }, [props.canvasRef.current.state.noOfVertices])
  //console.log(props.canvasRef, nodeIndices);
  const closeMenu = () => {
    setAlgorithmMenuAnchor(null);
    setAddUndEdgeFromMenuAnchor(null);
    setAddUndEdgeToMenuAnchor(null);
    setDeleteNodeMenuAnchor(null);
  };
  const openAlgorithmMenu = (e) => {
    setAlgorithmMenuAnchor(e.currentTarget);
  };

  const openUndEdgeFromMenu = (e) => {
    setAddUndEdgeFromMenuAnchor(e.currentTarget);
  };

  const openUndEdgeToMenu = (e) => {
    setAddUndEdgeToMenuAnchor(e.currentTarget);
  };

  const selectAlgorithm = (algorithm) => {
    props.selectAlgorithm(algorithm);
    closeMenu();
  };

  const selectUndEdgeFrom = (from) => {
    setUndEdgeFrom(from);
    closeMenu();
  };
  const selectUndEdgeTo = (to) => {
    setUndEdgeTo(to);
    closeMenu();
  };

  const addUndirectedEdge = (from, to) => {
    props.canvasRef.current.addEdge(from, to);
    setUndEdgeFrom("From");
    setUndEdgeTo("To");
  };

  const openDeleteNodeMenu = (e) => {
    setDeleteNodeMenuAnchor(e.currentTarget);
  };

  const selectDeleteNode = (node) => {
    setDeleteNode(node);
    closeMenu();
  };

  const clearCanvas = () => {
    props.canvasRef.current.clearCanvas();
    setUndEdgeFrom("From");
    setUndEdgeTo("To");
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={props.open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <Typography variant="h5" align="center" color="primary">
          CONTROL PANEL
        </Typography>
        <IconButton onClick={props.handleDrawerClose}>
          {/* {theme.direction === "ltr" ? ( */}
          <ChevronLeftIcon />
          {/* ) : ( */}
          {/* <ChevronRightIcon /> */}
          {/* )} */}
        </IconButton>
      </div>
      <Divider />
      <div className={classes.drawerHeader}>
        <List>
          <ListItem>
            <ListItemIcon>
              <TimelineIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Select Algorithm" />
            <Menu
              selectOption={selectAlgorithm}
              selectedOption={props.selectedAlgorithm}
              open={algorithmMenuOpen}
              anchor={algorithmMenuAnchor}
              close={closeMenu}
              options={props.AlgorithmOptions}
              click={(e) => openAlgorithmMenu(e)}
            ></Menu>
          </ListItem>

          <Divider />
          <ListItem>
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText
              primary="Some Description About Algorithm"
              secondary="asfasfmc.ngkresjg jrgbkjrvgkjcrngjkergbkjergbjkdf vdn vjdsbgjkergbjdsv dsjgbkjsb vjnd djfg jh vdjnjdhg jdfv jdhrgvb d jdrhg jvh"
            ></ListItemText>
          </ListItem>

          <Divider />
          <ListItem>
            <ListItemIcon>
              <AddNodeIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Add a New Node"></ListItemText>
            <IconButton onClick={() => props.canvasRef.current.addVertex()}>
              <AddNodeIcon />
            </IconButton>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <UndirectedEdgeIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Delete Node"></ListItemText>
            <Menu
              selectedOption={deleteNode}
              options={nodeIndices}
              selectOption={selectDeleteNode}
              open={deleteNodeMenuOpen}
              anchor={deleteNodeMenuAnchor}
              close={closeMenu}
              click={(e) => openDeleteNodeMenu(e)}
            ></Menu>
            <IconButton
              onClick={() => {
                props.canvasRef.current.deleteVertex(parseInt(deleteNode));
                setDeleteNode("Index");
              }}
              disabled={deleteNode === "Index"}
            >
              <AddNodeIcon />
            </IconButton>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <UndirectedEdgeIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Add Undirected Edge"></ListItemText>
            <Menu
              selectedOption={undEdgeFrom}
              options={nodeIndices}
              selectOption={selectUndEdgeFrom}
              open={addUndEdgeFromMenuOpen}
              anchor={addUndEdgeFromMenuAnchor}
              close={closeMenu}
              click={(e) => openUndEdgeFromMenu(e)}
            ></Menu>
            &nbsp;
            <ListItemText primary="To"></ListItemText>&nbsp;&nbsp;
            <Menu
              selectedOption={undEdgeTo}
              options={nodeIndices}
              selectOption={selectUndEdgeTo}
              open={addUndEdgeToMenuOpen}
              anchor={addUndEdgeToMenuAnchor}
              close={closeMenu}
              click={(e) => openUndEdgeToMenu(e)}
            ></Menu>
            <IconButton
              onClick={() =>
                addUndirectedEdge(parseInt(undEdgeFrom), parseInt(undEdgeTo))
              }
              disabled={
                undEdgeFrom === undEdgeTo ||
                undEdgeFrom === "From" ||
                undEdgeTo === "To"
              }
            >
              <AddNodeIcon />
            </IconButton>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <DirectedEdgeIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Add Directed Edge From"></ListItemText>
            <Menu
              selectedOption="1"
              options={["1", "2", "3"]}
              open={false}
              anchor={null}
              close={closeMenu}
            ></Menu>
            &nbsp;
            <ListItemText primary="To"></ListItemText>&nbsp;&nbsp;
            <Menu
              selectedOption="1"
              options={["1", "2", "3"]}
              open={false}
              anchor={null}
              close={closeMenu}
            ></Menu>
            <IconButton disabled>
              <AddNodeIcon />
            </IconButton>
          </ListItem>
          <Divider />
        </List>
      </div>
      {/* <div className={classes.visualizeButtonContainer}> */}
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="center"
        className={classes.visualizeButtonContainer}
      >
        <Button variant="contained" color="secondary" size="large">
          VISUALIZE
        </Button>
        &nbsp;
        <Grid
          container
          direction="row"
          justify="space-around"
          //alignItems="center"
          //className={classes.visualizeButtonContainer}
        >
          <Button variant="contained" color="primary" disabled size="large">
            RESET
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => clearCanvas()}
          >
            CLEAR
          </Button>
        </Grid>
      </Grid>
      {/* </div> */}
      {/* <div className={classes.visualizeButton}> */}
      {/* </div> */}

      {/* <Grid container spacing="1">
                <Grid justify="center">
                    Select Algorithm - <Menu open={algorithmMenuOpen} options={AlgorithmOptions}></Menu>
                </Grid>

            </Grid> */}
    </Drawer>
  );
};

export default CustomDrawer;
