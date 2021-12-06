import React from 'react'
import { View, ListView, StyleSheet, Text } from 'react-native'

export default class GeneralSymptomListView extends React.Component {
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
 * @param input array of general symptoms
 * @return unordered array of the symptoms
 */
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      /* Array of general symptoms */
      dataSource: ds.cloneWithRows(['Feeling sick?', 'Experiencing pain?'])
    }
  }
  render () {
    return (
      /* ListView used to display data in dedicated section of page */
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(data) => <View style={styles.symptomCard}><Text style={styles.symptomText}>{data}</Text></View>}
      />
    )
  }
}

/* Styling to ensure that colours of the lists are in line with the agreed colour scheme */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  symptomCard: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderRadius: 6,
    flexDirection: `row`,
    justifyContent: `space-between`,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 23,
    paddingTop: 23,
    justifyContent: 'center'
  },
  symptomText: {
    fontSize: 19
  }
})
