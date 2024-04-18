import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import Carousel from 'react-native-banner-carousel';
import Carousel1, { Pagination } from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');

interface ImageCarouselProps {
    images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
    const [activeSlide, setActiveSlide] = useState(0);
    const lastSlide = images.length === 0 ? activeSlide : activeSlide-1 ;
    const nextSlide = images.length === 0 ? activeSlide : activeSlide+1 ;

    const renderItem = ({ item }: any) => {
        return (
            <View style={styles.fullWidthSlide}>
                <Image
                    /*
                    The URI 'data:image/jpeg;base64,' indicates that the image data is encoded in base64 format.
                    When the image component renders with this URI, it decodes the base64-encoded image data, which allows the image to be displayed.
                    */
                    source={{ uri: `data:image/jpeg;base64,${images[nextSlide]}` }}
                    style={styles.slideImage}
                />
                <Image
                    /*
                    The URI 'data:image/jpeg;base64,' indicates that the image data is encoded in base64 format.
                    When the image component renders with this URI, it decodes the base64-encoded image data, which allows the image to be displayed.
                    */
                    source={{ uri: `data:image/jpeg;base64,${item}` }}
                    style={styles.slideImage}
                />
                <Image
                    /*
                    The URI 'data:image/jpeg;base64,' indicates that the image data is encoded in base64 format.
                    When the image component renders with this URI, it decodes the base64-encoded image data, which allows the image to be displayed.
                    */
                    source={{ uri: `data:image/jpeg;base64,${images[lastSlide]}` }}
                    style={styles.slideImage}
                />
            </View>
        );
    };

    const renderPage = (image, index) => {
        const first = index === 0 ? images.length-1 : index-1;
        const last = index === images.length-1 ? 0 : index+1;

        return (
            <View key={index} style={styles.fullWidthSlide}>
                <Image style={styles.slideImage} source={{ uri: `data:image/jpeg;base64,${images[first]}` }} />
                <Image style={{ width: 100, height: 100 }} source={{ uri: `data:image/jpeg;base64,${image}` }} />
                <Image style={{ width: 100, height: 100 }} source={{ uri: `data:image/jpeg;base64,${images[last]}` }} />
            </View>
        );
    }

    const sliderWidth = width;
    const itemWidth = width;

    return (
        <SafeAreaView style={styles.container}>
            <Carousel>
                {images.map((image, index) => renderPage(image, index))}
            </Carousel>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    fullWidthSlide: {
        width: width,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        flex: 1,
        flexDirection: "row"
    },
    slideImage: {
        width: '45%',
        height: '45%',
        resizeMode: 'contain',
        marginTop: 50,
        borderRadius: 50
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
