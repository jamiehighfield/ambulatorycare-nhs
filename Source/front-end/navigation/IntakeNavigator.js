import MainMenuScreen from '../screens/MainMenuScreen'
import { createStackNavigator } from 'react-navigation'
import ActivityScreen from '../screens/Actitivty/ActivitiesScreen.js'
import AddActivityScreen from '../screens/Actitivty/AddActivity.js'
import FoodScreen from '../screens/intakes/food/FoodScreen'
import AddFoodScreen from '../screens/intakes/food/AddFoodScreen'
import TemperatureDiaryScreen from '../screens/TemperatureDiaryScreen'
import FluidsScreen from '../screens/intakes/fluids/FluidsScreen'
import AddFluidItemScreen from '../screens/intakes/fluids/AddFluidItemScreen'

export default createStackNavigator({
  MainMenu: MainMenuScreen,
  // Activities
  ActivityMain: ActivityScreen,
  ActivityAdd: AddActivityScreen,
  // Food
  FoodMain: FoodScreen,
  FoodDiaryAdd: AddFoodScreen,
  // Temperature
  TemperatureDiaryMain: TemperatureDiaryScreen,
  // Fluids
  FluidsMain: FluidsScreen,
  FluidAdd: AddFluidItemScreen
})
