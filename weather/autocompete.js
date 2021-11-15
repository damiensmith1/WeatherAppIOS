import React, {PureComponent} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class autocompleteList extends PureComponent {
    render() {
        return (
            <TouchableOpacity style={styles.root}>
                <Text>{this.props.description}</Text>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        height: 50,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        justifyContent: 'center',
        marginRight: '5%',
        marginLeft: '5%',
        paddingLeft: '5%',
        paddingRight: '5%',
        zIndex: 1000
    }
})

export default autocompleteList;

/*

<GoogleAutoComplete apiKey={GOOGLE_KEY}>
						{({
							handleTextChange, 
							locationResults, 
							clearSearch,
							isSearching
							}) => (
							<React.Fragment>
								{console.log(locationResults)}
								<View>
									<TextInput
									style={styles.textInput}
									placeholder="Search new location"
									onChangeText={handleTextChange}
									/>
									<Button title="Clear" onPress={clearSearch} style={styles.button}/>
								</View>
							{isSearching && <ActivityIndicator size="large" color="blue"/>}
							<ScrollView>
								{locationResults.map(loc => (
									<AutocompleteList
									{...loc}
									key={loc.id}
									/>
								))}
							</ScrollView>
							</React.Fragment>
						)}
					</GoogleAutoComplete>

*/