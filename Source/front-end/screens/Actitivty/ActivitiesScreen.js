import React from "react";
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { colours } from './../../constants/Colors';
import ActivityApi from './../../api/Activities';
export default class ActivitiesScreen extends React.Component {
    static navigationOptions = {
        title: 'Activities',

    };

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
      
    componentDidMount =  async() => {
        let responseObj = await ActivityApi.getAllActivities();
        this.setState({
            data: JSON.stringify(responseObj)
        });
    }
    
    render () {

        if(this.state.data.length != 0){
            let data = JSON.parse(this.state.data);
                return (
                    <View style={styles.container}>
                      <ScrollView>
                            <View style={styles.row}>
                                <FlatList
                                    data={data}
                                    keyExtractor={item => item.id}
                                    renderItem={({item}) => {
                                        return (
                                            <View style={styles.item}>
                                                <Text style={styles.content}> {item.name}</Text>
                                                <Text style={styles.content}> | {item.lengthOfTime} minutes</Text>
                                            </View>
                                        );
                                    }}
                                />
                            </View>
                      </ScrollView>
                      <View>
                            <TouchableOpacity style={styles.btn} onPress={() => {
                                this.props.navigation.navigate('ActivityAdd');
                            }}>
                                <Text style={styles.btnTxt}> + </Text>
                            </TouchableOpacity>
                        </View>
                </View>
                );
            }
        else {
            return (
                    <View>
                    </View>
            )
        }
    } 
    }

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 22,
        backgroundColor: colours.bgGrey,
    },
    item:{
        padding: 20,
        borderWidth: 1,
        borderColor: colours.lightGreen,
        borderRadius: 6,
        backgroundColor: colours.lightGreen,
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 10,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        color: colours.white,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        backgroundColor: colours.darkGreen,
        borderWidth: 1,
        borderColor: colours.darkGreen,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
        height: 50,
        width: 50,
        marginLeft: '80%',
        marginBottom: '7.5%'
    },
    btnTxt:{
        fontSize: 20,
		fontWeight: 'bold',
		color: colours.white,
		textAlign: 'center',
		marginBottom: '50%',
    }
 });

