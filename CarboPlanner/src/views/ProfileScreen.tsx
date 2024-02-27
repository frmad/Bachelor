import * as React from 'react';
import { Text, View } from 'react-native';
import LoadingIcon from "./LoadingIcon";
import Loading from "./Loading";

export default function ProfileScreen(){
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile!</Text>
            <Loading />
      </View>
    );
}