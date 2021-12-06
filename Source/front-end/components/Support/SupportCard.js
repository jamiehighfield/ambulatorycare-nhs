import React from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'

/* This defines the layout of the cards that appear in the support page, provides a clean user
interface with precise curved rectangles */
export default class SupportCard extends React.Component {
  render () {
    return (
    /* Within the view of the page, there is another view that contains the question cards on the support page */
      <View style={styles.supportBackground}>
        <View style={styles.cardColor}>
          <View>
            <Text style={styles.supportQuestion}>
              {this.props.question}
            </Text>
            <Text style={styles.supportAnswer}>
              {this.props.answer}
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
    backgroundColor: '#0099cc',
    borderColor: '#0099cc',
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
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  supportQuestion: {
    fontSize: 17,
    letterSpacing: -0.1,
    lineHeight: 19,
    color: '#333366'
  },
  supportAnswer: {
    fontSize: 15,
    letterSpacing: -0.1,
    lineHeight: 19,
    color: '#fff',
    marginTop: 5
  }
})
