import React from 'react';
import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements'

export default class ListView extends React.Component {
	constructor(props) {
		super(props);
	}

	//This is called to render each item.
	renderItem = ({item}) => {
        //If the item is a divider, this should be styled differently.
		if (item.divider === true) {
			return (
				<Text style={[{fontSize: item.size || 13}, styles.divider]}>{item.label}</Text>
            );
        } else if (item.input === true) {
            if (item.inputChange != null) {
                return (
                    <ListItem title={<TextInput placeholder={item.label} style={{fontSize: 16}} returnKeyType='next' onChangeText={item.inputChange}></TextInput>} hideChevron={true} />
                );
            } else {
                return (
                    <ListItem title={<TextInput placeholder={item.label} style={{fontSize: 16}} returnKeyType='next'></TextInput>} hideChevron={true} />
                );
            }
		} else if (item.label != null && item.subtitle != null && item.avatar != null) {
            if (item.onPress != null) {
                if (item.colouredSubtitle != null) {
                    return (
                        <ListItem title={item.label} rightTitle={item.value || null} subtitle={() => {
                            return (
                                <View>
                                    <Text style={{fontSize: 12, color:'#686868'}}>{item.subtitle}</Text>
                                    <Text style={{fontSize: 12, color: item.colouredSubtitleColour, marginTop: 5}}>{item.colouredSubtitle}</Text>
                                </View>
                            );
                        }} leftAvatar={{ source: { uri: item.avatar } }} hideChevron={false} chevron onPress={() => {
                            //Call the onPress delegste in the item, parsing in the navigation props.
                            item.onPress();
                        }} />
                    );
                } else {
                    return (
                        <ListItem title={item.label} rightTitle={item.value || null} subtitle={<Text style={{fontSize: 12, color:'#686868'}}>{item.subtitle}</Text>} leftAvatar={{ source: { uri: item.avatar } }} hideChevron={false} chevron onPress={() => {
                            //Call the onPress delegste in the item, parsing in the navigation props.
                            item.onPress();
                        }} />
                    );
                }
            } else {
                if (item.colouredSubtitle != null) {
                    return (
                        <ListItem title={item.label} rightTitle={item.value || null} subtitle={() => {
                            return (
                                <View>
                                    <Text style={{fontSize: 12, color:'#686868'}}>{item.subtitle}</Text>
                                    <Text style={{fontSize: 12, color:item.colouredSubtitleColour, marginTop: 5}}>{item.colouredSubtitle}</Text>
                                </View>
                            );
                        }} leftAvatar={{ source: { uri: item.avatar } }} hideChevron={true} />
                    );
                } else {
                    return (
                        <ListItem title={item.label} rightTitle={item.value || null} subtitle={<Text style={{fontSize: 12, color:'#686868'}}>{item.subtitle}</Text>} leftAvatar={{ source: { uri: item.avatar } }} hideChevron={true} />
                    );
                }
            }
		} else if (item.label != null && item.subtitle != null) {
            if (item.onPress != null) {
                return (
                    <ListItem title={item.label} rightTitle={item.value || null} subtitle={<Text style={{fontSize: 12, color:'#686868'}}>{item.subtitle}</Text>} hideChevron={false} chevron onPress={() => {
                        //Call the onPress delegste in the item, parsing in the navigation props.
                        item.onPress();
                    }} />
                );
            } else {
                return (
                    <ListItem title={item.label} rightTitle={item.value || null} subtitle={<Text style={{fontSize: 12, color:'#686868'}}>{item.subtitle}</Text>} hideChevron={true} />
                );
            }
		} else if (item.label != null) {
            if (item.onPress != null) {
                if (item.critical === true) {
                    return (
                        <ListItem title={item.label} titleStyle={{ color: '#CC0000' }} rightTitle={item.value || null} hideChevron={true} onPress={() => {
                            //Call the onPress delegste in the item, parsing in the navigation props.
                            item.onPress();
                        }} />
                    );
                } else {
                    return (
                        <ListItem title={item.label} rightTitle={item.rightTitle || null} hideChevron={false} chevron onPress={() => {
                            //Call the onPress delegste in the item, parsing in the navigation props.
                            item.onPress();
                        }} />
                    );
                }
            } else {
                return (
                    <ListItem title={item.label} rightTitle={item.value || null} hideChevron={true} />
                );
            }
		}
	};

	//This is called to render a separator line between each item.
	renderSeparator = () => {
		return (
			<View style={{height: 1, width: "86%", backgroundColor: "#F0EFF7", marginLeft: "14%"}}/>
		);
	};

	keyExtractor = (item, index) => index

	render () {
		return (
			<FlatList style={styles.container} keyExtractor={this.keyExtractor} data={this.props.data} renderItem={this.renderItem} ItemSeparatorComponent={this.renderSeparator} />
		)
	}
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 20,
		backgroundColor: '#F0EFF7'
	},
	divider: {
		color:'#686868',
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 10,
		paddingBottom: 10
	}
});