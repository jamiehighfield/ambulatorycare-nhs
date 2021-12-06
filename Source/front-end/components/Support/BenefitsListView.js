import React from 'react'
import { View, ListView, StyleSheet, Text } from 'react-native'
import { colours } from '../../constants/Colors'
export default class BenefitsListView extends React.Component {
  constructor (props) {
    super(props)

    /**
 * Returns a ListView component containing data in an array
 * The code was adapted from a Medium post by Spencer Cali 28-05-2016
 * accessed 06-03-2019
 * https://medium.com/differential/react-native-basics-how-to-use-the-listview-component-a0ec44cf1fe8
 * Added css properties to allow more detailed styling of the list and the text, also inputted more data
 * into the array
 *
 * @param input several benefits of ambulatory care
 * @return unordered array of the benefits
 */
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      /* Array of benefits for the user when doing the amb. care scheme */
      dataSource: ds.cloneWithRows(['1. You will receive a bit more normality – staying at home will allow you to receive your treatment in a more relaxing setting', '2. You are in control – you will receive privacy and independence without being restricted to the ward routines', '3. If necessary, there will always be a place made for you should you need to make an urgent visit', '4. 24/7 access to support – You will continue to have full access to medical and nursing care despite not staying on a hospital war', '5. Same treatment, more freedom – You will receive the same treatment as an in-patient except it would be scheduled between 8am – 6pm, giving space for you to carry on with daily life away from the hospital'])
    }
  }
  render () {
    return (
      /* ListView used to display data in dedicated section of page */
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(data) => <View style={styles.benefitsContent}><Text style={styles.text}>{data}</Text></View>}
      />
    )
  }
}

/* Styling to ensure that colours of the lists are in line with the agreed colour scheme */
const styles = StyleSheet.create({
  container: {
    flex: 1
    // marginTop: 20
  },
  benefitsContent: {
    backgroundColor: colours.darkPurple,
    borderColor: colours.darkPurple,
    borderRadius: 6,
    flexDirection: `row`,
    justifyContent: `space-between`,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 23,
    paddingLeft: 23,
    paddingRight: 10,
    paddingTop: 23,
    marginTop: 1,
    shadowColor: colours.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  text: {
    color: colours.white
  }
})
