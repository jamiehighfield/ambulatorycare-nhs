import React, { Component } from 'react'
import { SectionList, Image, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { colours } from '../constants/Colors.js'
import { format } from 'date-fns'
import {} from '../constants/Layout.js'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class DateHeader extends Component {
  constructor (props) {
	    super(props)
	    this.today = new Date()
    this.displayDate = format(
	  		new Date(),
	  		'MM/DD/YYYY'
	  	)
  	}
  componentDidMount () {
  }

  /*
  TouchableOpacity is a button that can be clicked on. It is used for the next and back/previous date
  buttons.
    */
  render () {
    return (
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: colours.bgGrey }}>
        <View style={styles.buttonCol}>
          <TouchableOpacity>
            <Icon name='caret-left' style={styles.backBtn} size={30} color='white' />
          </TouchableOpacity>
        </View>
        <View style={styles.dateCol}>
          <Text style={styles.dateTxt}> {this.displayDate} </Text>
        </View>
        <View style={styles.buttonCol}>
          <TouchableOpacity>
            <Icon name='caret-right' style={styles.nextBtn} size={30} color='white' />
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    width: '100%'
  },
  buttonCol: {
    margin: 10,
    width: '20%'
  },
  btn: {
    width: 40,
    backgroundColor: colours.boldBlue,
    borderWidth: 1,
    borderColor: colours.white,
    borderRadius: 20,
    textAlign: 'center',
    height: 40
  },
  dateCol: {
    width: '50%',
    padding: 10,
    textAlign: 'center'
  },
  dateTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  backBtn: {
    color: colours.boldBlue, // Next button styling
    marginLeft: 30,
    textAlign: 'center'
  },
  nextBtn: {
    color: colours.boldBlue,
    textAlign: 'center', // Back/previous button styling
    marginRight: 30
  }
})
