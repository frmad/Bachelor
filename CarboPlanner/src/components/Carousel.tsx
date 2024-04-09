import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, Image, FlatList, Text, View } from 'react-native';
import { Images } from '../utils/images';

const { width } = Dimensions.get('screen');
const IMG_WIDTH = width * 1;
const IMG_HEIGHT = IMG_WIDTH * 1;
const imgString = ['dinner', 'lunch'];

//key is the current element from imgString and index is the index number for that element
const resources = imgString.map((key, index) => ({
    key: String(index), // unique key for each item in the array
    photo: Images[key]  // retrieve the corresponding image using the current key
}));

/*
const Carousel = ({images}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.Text}>Animated Parallax Effect</Text>
                <FlatList
                    data={resources}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ width, justifyContent: "center", alignItems: "center" }}>
                                <Image
                                    source={item.photo}
                                    style={{ width: IMG_WIDTH, height: IMG_HEIGHT, resizeMode: "cover" }}
                                />
                            </View>
                        )
                    }}
                />
            </View>
        </SafeAreaView>
    );
};*/
const Carousel = ({ images }) => { // Accept images as prop
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.Text}>Carousel</Text>
                <FlatList
                    data={images}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    keyExtractor={(item, index) => String(index)} // Use index as key
                    renderItem={({ item }) => {
                        return (
                            <View style={{ width, justifyContent: "center", alignItems: "center" }}>
                                <Image
                                    source={{ uri: item }} // Use the image URI from the array
                                    style={{ width: IMG_WIDTH, height: IMG_HEIGHT, resizeMode: "cover" }}
                                />
                            </View>
                        )
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Text: {
        color: "#000",
        fontSize: 20,
        paddingTop: 20,
        fontWeight: "900",
        textAlign: "center",
    }
});

export default Carousel;
