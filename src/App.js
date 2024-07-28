import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import * as types from "./redux/actionTypes";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function App() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  const [spacing, setSpacing] = useState(2);
  const [expanded, setExpanded] = React.useState(false);
  const [cardValue, setCardValue] = useState("");

  const handleExpandClick = (index) => {
    setExpanded(!expanded);
    setCardValue(index);
  };

  const { recipes } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const updateSearch = () => {
    const trimmedSearch = search.trim();
    if (trimmedSearch) {
      setQuery(trimmedSearch);
      setSearch("");
      dispatch({ type: types.FETCH_RECIPE_START, query: trimmedSearch });
    }
  };

  useEffect(() => {
    if (query) {
      dispatch({ type: types.FETCH_RECIPE_START, query });
    }
  }, [query, dispatch]);

  useEffect(() => {
    console.log("Recipes:", recipes);
  }, [recipes]);

  return (
    <div>
      <Grid container justifyContent="center" alignItems="center" direction="column" sx={{ mb: 4 }}>
        <Grid item>
          <Typography variant="h3" sx={{ fontFamily: "Roboto, sans-serif", color: "#3f51b5", fontWeight: 'bold' }}>
            Food Blog
          </Typography>
        </Grid>
        <Grid item sx={{ mt: 2 }}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
              border: "1px solid #3f51b5",
              borderRadius: 2,
            }}
          >
            <InputBase
              sx={{ ml: 2, flex: 1, fontFamily: "Roboto, sans-serif" }}
              placeholder="Search Recipes Here"
              inputProps={{ "aria-label": "search recipes" }}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconButton
              type="button"
              sx={{ p: "10px", color: "#3f51b5" }}
              aria-label="search"
              onClick={updateSearch}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2} sx={{ paddingLeft: '180px' }}>
            {recipes &&
              recipes.hits &&
              recipes.hits.map((item, index) => (
                <Grid key={index} item xs={12} sm={6} md={4}>
                  <Card sx={{ maxWidth: 345, mb: 2, boxShadow: 3 }}>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          R
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={item.recipe.label}
                      subheader={
                        <span>
                          <DirectionsRunIcon />
                          {item.recipe.calories.toFixed(2)} calories
                        </span>
                      }
                    />
                    <CardMedia
                      component="img"
                      height="194"
                      image={item.recipe.image}
                      title={item.recipe.label}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {item.recipe.dietLabels.join(", ")}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                      <ExpandMore
                        expand={expanded}
                        onClick={() => handleExpandClick(index)}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                    <Collapse
                      in={index === cardValue && expanded}
                      timeout="auto"
                      unmountOnExit
                    >
                      <CardContent>
                        <Typography paragraph variant="h5">
                          Ingredients:
                        </Typography>
                        {item.recipe.ingredients.map((ingredient, idx) => (
                          <Typography key={idx} paragraph>
                            {ingredient.text}
                          </Typography>
                        ))}
                      </CardContent>
                    </Collapse>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
