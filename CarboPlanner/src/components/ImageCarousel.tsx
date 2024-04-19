import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import Carousel from 'react-native-banner-carousel';

const { width } = Dimensions.get('window');

interface ImageCarouselProps {
    images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
    const [ activeSlide ] = useState(0);
    const lastSlide = images.length === 0 ? activeSlide : activeSlide-1 ;
    const nextSlide = images.length === 0 ? activeSlide : activeSlide+1 ;

    const renderPage = (image, index) => {
        const first = index === 0 ? images.length-1 : index-1;
        const last = index === images.length-1 ? 0 : index+1;

        return (
            <View key={index} style={styles.fullWidthSlide}>
                <Image style={styles.rightSlideImage} source={{ uri: `data:image/jpeg;base64,${images[first]}` }} />
                <Image style={styles.parentImage} source={{ uri: `data:image/jpeg;base64,${image}` }} />
                <Image style={styles.leftSlideImage} source={{ uri: `data:image/jpeg;base64,${images[last]}` }} />
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
        flexDirection: "row",
    },
    leftSlideImage: {
        width: '30%',
        marginLeft: -20,
        overflow: "visible",
        height: '50%',
        resizeMode: "cover",
        marginTop: 50,
        borderRadius: 15
    },
    rightSlideImage: {
        width: '30%',
        marginRight: -20,
        overflow: "visible",
        height: '50%',
        resizeMode: "cover",
        marginTop: 50,
        borderRadius: 15 
    },
    parentImage: {
        width: '42.5%',
        height: '60%',
        resizeMode: "cover",
        marginTop: 50,
        borderRadius: 15,
        zIndex: 30
    },
});

export default ImageCarousel;
