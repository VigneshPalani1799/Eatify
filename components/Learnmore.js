import React from "react";
import styled from "styled-components";

import { SafeAreaView, ScrollView, Share, StatusBar } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome5";

class Learnmore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
    };
  }

  static navigationOptions = {
    title: "Learnmore",
  };

  render() {
    const {
      title,
      uri,
      extendedIngredients,
      dishTypes,
      readyInMinutes,
      servings,
      vegetarian,
      analyzedInstructions,
    } = this.props.route.params;

    const onShare = async () => {
      try {
        const result = await Share.share({
          message: `Learn how to cook ${title} from eatify ${uri}`,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
          } else {
          }
        } else if (result.action === Share.dismissedAction) {
        }
      } catch (error) {
        alert(error.message);
      }
    };

    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <RecipeBackground
          source={{
            uri: uri,
          }}
        >
          <SafeAreaView>
            <MenuBar>
              <Back>
                <AntDesign
                  name="arrowleft"
                  size={28}
                  color="#FFF"
                  onPress={() => this.props.navigation.goBack()}
                />
              </Back>
              <Icon
                name="share-alt"
                size={28}
                color="#FFF"
                onPress={() => onShare()}
              />
            </MenuBar>
            <MainRecipe>
              <Text title heavy>
                {title}
              </Text>
              <Divider />
              <Text heavy bold>
                Time to cook {readyInMinutes} minutes
              </Text>
              <Text heavy bold>
                Can serve {servings} people |{" "}
                {vegetarian ? "Vegetarian" : "Non Vegetarian"}
              </Text>
            </MainRecipe>
          </SafeAreaView>
        </RecipeBackground>
        <RecipesContainerPink>
          <Text heavy large>
            About The Recipe
          </Text>
          <Text small>Ingredients and Procedures</Text>
          <Text style={{ paddingTop: 15 }}>
            <AntDesign
              name="heart"
              color={this.state.liked ? "red" : "white"}
              onPress={() => this.setState({ liked: !this.state.liked })}
              size={28}
            />
            {"   "}
            <AntDesign
              name="book"
              color="white"
              size={28}
              style={{ paddingLeft: 5 }}
            />
          </Text>
        </RecipesContainerPink>
        <RecipesContainer>
          <Text dark heavy title>
            Ingredients
          </Text>
          <Recipes>
            {extendedIngredients.map((ingredients, index) => {
              return (
                <Recipe key={index}>
                  <RecipeImage
                    source={{
                      uri: `https://spoonacular.com/cdn/ingredients_100x100/${ingredients.image}`,
                    }}
                  />
                  <RecipeInfo>
                    <Text dark bold>
                      {ingredients.name.charAt(0).toUpperCase() +
                        ingredients.name.slice(1)}
                    </Text>
                    <Text style={{ color: "grey" }}>
                      {ingredients.original}
                    </Text>
                  </RecipeInfo>
                </Recipe>
              );
            })}
          </Recipes>
          <Text dark heavy title>
            Procedures
          </Text>
          <Recipes>
            {analyzedInstructions.map((steps, index) => {
              return (
                <React.Fragment key={index}>
                  <RecipeInstruction horizontal={true}>
                    {steps.equipment.map((imageEquipment, equipmentId) => {
                      return (
                        <RecipeImage
                          source={{
                            uri: `https://spoonacular.com/cdn/ingredients_100x100/${imageEquipment.image}`,
                          }}
                          key={equipmentId}
                          style={{ marginLeft: 5 }}
                        />
                      );
                    })}
                    {steps.ingredients.map((imageRecipe, recipeId) => {
                      return (
                        <RecipeImage
                          source={{
                            uri: `https://spoonacular.com/cdn/ingredients_100x100/${imageRecipe.image}`,
                          }}
                          key={recipeId}
                          style={{
                            marginLeft: 5,
                          }}
                        />
                      );
                    })}
                  </RecipeInstruction>
                  <Recipe>
                    <Text dark heavy>
                      Step No: {steps.number}
                    </Text>
                  </Recipe>
                  <Recipe>
                    <Text dark>{steps.step}</Text>
                  </Recipe>
                </React.Fragment>
              );
            })}
          </Recipes>
        </RecipesContainer>
      </Container>
    );
  }
}

export default Learnmore;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const RecipeBackground = styled.ImageBackground`
  width: 100%;
`;

const MainRecipe = styled.View`
  padding: 0 32px;
  margin: 200px 0 32px 0;
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

//
const MenuBar = styled.View`
  top: 30px;
  justify-content: center;
  width: 95%;
  right: -3%;
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

const Divider = styled.View`
  border-bottom-color: #fff;
  border-bottom-width: 2px;
  width: 80%;
  margin: 8px 0;
`;

const RecipesContainer = styled.ScrollView`
  padding: 32px;
  background-color: #fff;
`;

const Recipes = styled.ScrollView`
  margin-bottom: 20px;
`;

const Recipe = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const RecipeInstruction = styled.ScrollView`
  flex-direction: row;
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

const RecipesContainerPink = styled.ScrollView`
  margin-top: -24px;
  margin-bottom: 2px;
  padding-top:20px
  padding-bottom: 100px;
  padding-left:30px
  background-color: #dc0061;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
`;
