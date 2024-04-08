import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Images } from "../utils/images";

const { width } = Dimensions.get('window');
const imgString = ['dinner', 'lunch', 'midday'];

// Key is the current element from imgString and index is the index number for that element
const carouselItems = imgString.map((key, index) => ({
    key: String(index), // unique key for each item in the array
    photo: Images[key]  // retrieve the corresponding image using the current key
}));

const ImageCarousel: React.FC = () => {
    const [activeSlide, setActiveSlide] = useState(0);

    const renderItem = ({ item }: any) => {
        return (
            <View style={styles.fullWidthSlide}>
                <Image
                    source={item.photo}
                    style={styles.slideImage}
                />
            </View>
        );
    };

    const sliderWidth = width;
    const itemWidth = width;

    return (
        <View style={styles.container}>
            <Carousel
                data={carouselItems}
                renderItem={renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                loop
                onSnapToItem={(index) => setActiveSlide(index)}
            />
            <Pagination
                dotsLength={carouselItems.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.paginationContainer}
                dotColor="#65CB2E"
                dotStyle={styles.dotStyle}
                inactiveDotColor="#C4C4C4"
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
    },
    fullWidthSlide: {
        width: width,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    slideImage: {
        width: '50%',
        height: '100%',
        resizeMode: 'contain',
        marginTop: 50,
    },
    paginationContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        position: 'absolute',
        top: 230,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
    }
});

export default ImageCarousel;
