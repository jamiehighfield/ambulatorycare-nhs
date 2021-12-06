import React from 'react'
import { View, ListView, StyleSheet, Text } from 'react-native'
import { colours } from '../../constants/Colors'

export default class SymptomsList extends React.Component {
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
 * @param input symptoms of sickness
 * @return unordered array of symptoms
 */
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      /* Array of data detailing the symptoms */
      dataSource: ds.cloneWithRows(['• Temperature close to or above 38° (degrees)', '• Shivers or hot flushes', '• Nausea that isn’t helped by anti-sickness medication', '• Diarrhoea or vomiting on more than one occasion', '• Pain around your central line site', '• Shortness of breath or problems with your breathing', '• Difficulty passing urine', '• Any situation when you are generally feeling ‘unwell’ or ‘not right’'])
    }
  }
  render () {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(data) => <View style={styles.symptomsContent}><Text style={styles.text}>{data}</Text></View>}
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
  symptomsContent: {
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
