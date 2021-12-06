import React from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'

/* This defines the layout of the cards that appear in the support page, provides a clean user
interface with curved rectangles */
export default class AddressCard extends React.Component {
  render () {
    return (
    /* Within the view of the page, there is another view that contains the address cards on the contact page */
      <View>
        <Text style={styles.addressTitle}> If you would prefer to visit in-person...</Text>
        <View style={styles.cardColor}>
          <View>
            <Text style={styles.addressHeader}>B4 Haematology or Llewelyn Young Person's Unit, within the Young Person's Cancer Service:</Text>
            <Text style={styles.addressContent}>
              {this.props.address}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

/* Styling to of the support cards to ensure that they match the agreed colour scheme */
const styles = StyleSheet.create({
  cardColor: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderRadius: 6,
    flexDirection: `row`,
    justifyContent: `space-between`,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 23,
    paddingLeft: 23,
    paddingRight: 10,
    paddingTop: 23,
    marginTop: 5
  },
  addressHeader: {
    fontSize: 17,
    letterSpacing: -0.1,
    lineHeight: 19,
    marginTop: 5
  },
  addressContent: {
    fontSize: 17,
    letterSpacing: -0.1,
    lineHeight: 19,
    marginTop: 5,
    color: '#333366'
  },
  addressTitle: {
    fontSize: 17,
    letterSpacing: -0.3,
    color: '#333366',
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 15
  }
})
