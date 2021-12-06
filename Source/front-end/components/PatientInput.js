import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Items from './Items.js'
import DateHeader from './DateHeader.js'
import { colours } from '../constants/Colors.js'
import AddButton from './AddButton'

export default class PatientInput extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    if (this.props.data.length != 0) {
      return (
        <View style={{ flex: 1 }}>
          <ScrollView style={styles.container}>
            <DateHeader />
            <Text>Food item: {this.props.data[0].title}</Text>
            <Items items={this.props.data} />
          </ScrollView>
          <View style={styles.addButton}>
            <AddButton />
          </View>
        </View>
      )
    } else {
      return (
        <ScrollView style={styles.container} />
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
