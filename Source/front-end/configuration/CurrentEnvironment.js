export default class CurrentEnvironment {
  static GetCurrentEnvironment () {
    return require('../env/default.json').DevelopmentCurrentEnvironment
  }
}
