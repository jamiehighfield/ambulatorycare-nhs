import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Items from './Items.js'
import DateHeader from './DateHeader.js'
import { colours } from '../constants/Colors.js'
import AddButton from './AddButton'
import ListView from './ListView'

export default class BetterPatientInput extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    let data = []

    for (var i = 0; i < this.props.data.length; i++) {
      let item = this.props.data[i]

      data.push({
        divider: false,
        label: item.label,
        subtitle: item.description + '\n\nDate & Time: ' + item.dateTime,
        clickable: true,
        onPress: () => {
          item.onPress()
        }
      })
    }

    if (data.length != 0) {
      return (
        <ListView data={data} />
      )
    } else {
      return (
        <View style={styles.container} />
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: colours.bgGrey
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    width: '100%'
  },
  btn: {
    width: 60,
    backgroundColor: colours.boldBlue,
    borderWidth: 1,
    borderColor: colours.white,
    borderRadius: 40,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '80%'
  },
  btnTxt: {
    fontSize: 23,
    fontWeight: 'bold',
    color: colours.white
  },
  addNew: {
    marginBottom: 20,
    marginLeft: 7
  },
  addButton: {
    position: 'absolute',
    bottom: 25,
    right: 25
  }
})
