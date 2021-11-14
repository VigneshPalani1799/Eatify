import React from "react";
import styled from "styled-components";
import axios from "axios";

import {
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Entypo } from "@expo/vector-icons";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randomFood: [],
      foodRecipe: [],
      randomDataUrl:
        "https://api.spoonacular.com/recipes/random?apiKey=5253f9239d5043af9e6202493989e2a1",
      foodRecipeUrl:
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=5253f9239d5043af9e6202493989e2a1&cuisine=indian&addRecipeInformation=true",
    };
  }

  componentDidMount() {
    axios
      .get(this.state.randomDataUrl)
      .then((res) => {
        this.setState({ randomFood: res.data.recipes[0] });
      })
      .catch((err) => console.log(err));

    axios
      .get(this.state.foodRecipeUrl)
      .then((res) => this.setState({ foodRecipe: res.data.results }))
      .catch((err) => console.log(err));
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <StatusBar barStyle="light-content" hidden={true} />
        <RecipeBackground
          source={{
            uri: this.state.randomFood.image,
          }}
        >
          <SafeAreaView>
            <MenuBar>
              <Back>
                <Entypo
                  name="menu"
                  color="#fff"
                  size={36}
                  onPress={() => this.props.navigation.openDrawer()}
                />
              </Back>
              <TextInput
                style={{
                  color: "#FFF",
                  borderBottomColor: "#ffffff",
                  borderBottomWidth: 1,
                }}
                placeholder="Search Recipes"
                placeholderTextColor="#fff"
              />
              <Icon name="search" color="#fff" size={36} />
            </MenuBar>
            <MainRecipe>
              <Text title heavy>
                {this.state.randomFood.title}
              </Text>
              <Divider />
              <Text heavy bold>
                Time to cook {this.state.randomFood.readyInMinutes} Minutes
              </Text>
              <Text heavy bold>
                Can serve {this.state.randomFood.servings} people |{" "}
                {this.state.randomFood.vegetarian
                  ? "Vegetarian"
                  : "Non vegetarian"}{" "}
              </Text>
            </MainRecipe>
            <Button
              onPress={() =>
                navigate("Learnmore", {
                  uri: this.state.randomFood.image,
                  title: this.state.randomFood.title,
                  servings: this.state.randomFood.servings,
                  vegetarian: this.state.randomFood.vegetarian,
                  readyInMinutes: this.state.randomFood.readyInMinutes,
                  extendedIngredients:
                    this.state.randomFood.extendedIngredients,
                  dishTypes: this.state.randomFood.dishTypes,
                  analyzedInstructions:
                    this.state.randomFood.analyzedInstructions[0].steps,
                })
              }
            >
              <Text bold small>
                Learn More
              </Text>
            </Button>
          </SafeAreaView>
        </RecipeBackground>

        <RecipesContainerPink>
          <Text heavy large>
            Recipes for you
          </Text>
          <Text small>
            {this.state.foodRecipe.length} Recipes available for you
          </Text>
        </RecipesContainerPink>
        <RecipesContainer>
          <Recipes>
            {this.state.foodRecipe.map((recipe, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigate("Learnmore", {
                      uri: recipe.image,
                      title: recipe.title,
                      servings: recipe.servings,
                      vegetarian: recipe.vegetarian,
                      readyInMinutes: recipe.readyInMinutes,
                    })
                  }
                >
                  <Recipe key={index}>
                    <RecipeImage source={{ uri: recipe.image }} />
                    <RecipeInfo>
                      <Text dark bold>
                        {recipe.title}
                      </Text>
                    </RecipeInfo>
                    <Icon
                      name="circle"
                      color={recipe.vegetarian ? "green" : "red"}
                    />
                  </Recipe>
                </TouchableOpacity>
              );
            })}
          </Recipes>
        </RecipesContainer>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Text = styled.Text`
  color: ${(props) => (props.dark ? "#000" : "#FFF")};

  ${({ title, large, small }) => {
    switch (true) {
      case title:
        return `font-size: 32px`;
      case large:
        return `font-size: 20px`;
      case small:
        return `font-size: 13px`;
    }
  }}

  ${({ heavy, bold }) => {
    switch (true) {
      case heavy:
        return `font-weight: 700`;
      case bold:
        return `font-weight: 600`;
    }
  }}
`;

const RecipeBackground = styled.ImageBackground`
  width: 100%;
`;

const MainRecipe = styled.View`
  padding: 0 32px;
  margin: 200px 0 32px 0;
`;

const Divider = styled.View`
  border-bottom-color: #fff;
  border-bottom-width: 2px;
  width: 150px;
  margin: 8px 0;
`;

const Button = styled.TouchableOpacity`
  margin: 0 0 48px 32px;
  background-color: rgba(220, 0, 97, 0.8);
  align-self: flex-start;
  padding: 6px 18px;
  border-radius: 100px;
`;

const MenuBar = styled.View`
  top: 30px;
  justify-content: center;
  width: 90%;
  right: -4%;
  background-color: rgba(220, 0, 97, 0.8);
  flex-direction: row;
  justify-content: space-between;
  padding: 8px;
  border-radius: 30px;
`;

const Back = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RecipesContainer = styled.ScrollView`
  top: 0;
  margin-bottom: 5px;
  padding: 32px;
  background-color: #fff;
`;

const RecipesContainerPink = styled.ScrollView`
  margin-top: -24px;
  margin-bottom: 2px;
  padding-top:20px
  padding-bottom: 60px;
  padding-left:30px
  background-color: #dc0061;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
`;

const Recipes = styled.ScrollView`
  margin-top: 16px;
  margin-bottom: 5px;
`;

const Recipe = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const RecipeImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 8px;
`;

const RecipeInfo = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export default Home;
