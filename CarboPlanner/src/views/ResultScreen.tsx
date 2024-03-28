import { SafeAreaView, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";

export default function Loading({route}) {

    const { base64 ,data } = route.params;

    const navigation = useNavigation();

    navigation.goBack = () => navigation.navigate('Home');

    const foodDb = [
        {
            name: "White Rice",
            calories: 100,
            fat: 100,
            protein: 100,
            carb: 100,
        },
        
    ]


    const image: any = "data:image/png;base64," + base64;

    /**
     * Params for Yolov5
     * ----------------- 
     * name
     * Confindence
     * Ymin, Ymax
     * Xmin, XMax
     */


    return(
            <SafeAreaView>

                <Image source={image} style={styles.image} />
                
                <Card>
                    {data.map((items, index) => {
                        return (
                            <View style={{flex: 1, flexDirection: "row", justifyContent:"space-between"}}>
                                
                                <p>{items.name}</p>


                                <p>100g</p>
                                
                                <p>{Math.round(100 * items.confidence)}%</p>

                                
                            </View>
                            );
                            })}
                </Card>

                <TouchableOpacity onPress={() => {navigation.navigate('Home');}} style={styles.camera_button} />
            </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    camera_button: {
        backgroundColor: "#FFFFFF",
        padding: 25,
        width: 25,
        justifyContent: "center",
        borderRadius: 50,
    },
    image: {
        width: "auto",
        height: 250,
        borderRadius: 25,
        paddingVertical: '2%',
        paddingHorizontal: '2%',
        marginVertical: '2%',
        marginHorizontal: '2%',
    },
  });
  