import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');

interface ImageCarouselProps {
    images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
    const [activeSlide, setActiveSlide] = useState(0);

    const renderItem = ({ item }: any) => {
        return (
            <View style={styles.fullWidthSlide}>
                <Image
                    /*
                    The URI 'data:image/jpeg;base64,' indicates that the image data is encoded in base64 format.
                    When the image component renders with this URI, it decodes the base64-encoded image data, which allows the image to be displayed.
                    */
                    source={{ uri: `data:image/jpeg;base64,${item}` }}
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
                data={images}
                renderItem={renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                loop
                onSnapToItem={(index) => setActiveSlide(index)}
            />
            <Pagination
                dotsLength={images.length}
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
