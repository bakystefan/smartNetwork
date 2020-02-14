import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import { LATO_BOLD } from '../../assets/fonts';

type TopUserProps = {
    topUser: any
}

const TopUserContainer = ({ topUser }: TopUserProps) => {
    const { name, pic_ref } = topUser || {};
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#EEE', borderTopWidth: 1, borderTopColor: '#EEE', paddingVertical: 23, }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginLeft: 20 }}>
            {
              pic_ref && pic_ref !== "" ? (
               <Image  source={{ uri: pic_ref}} style={{ width: 42, height: 42, borderRadius: 21, borderColor: '#FF3563', borderWidth: 1.5 }} />
              ) : (
                <Image  source={require('../../assets/images/defaultTopUser.png')} style={{ width: 42, height: 42, borderRadius: 21, borderColor: '#FF3563', borderWidth: 1.5 }} />
              )
            }
            
          </View>
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontFamily: LATO_BOLD, fontSize: 14, color: '#444444' }}>{name}</Text>
            <Text style={{ fontFamily: LATO_BOLD, color: '#929292', fontSize: 9 }}>TOP USER</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginRight: 20 }}>
          <View style={{ marginLeft: 20 }}>
            <Image  source={require('../../assets/images/defaultTopUser.png')} style={{ width: 42, height: 42, borderRadius: 21, borderColor: '#FF3563', borderWidth: 1.5 }} />
          </View>
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontFamily: LATO_BOLD, fontSize: 14, color: '#444444' }}>NEW</Text>
            <Text style={{ fontFamily: LATO_BOLD, color: '#929292', fontSize: 9 }}>Review device</Text>
          </View>
        </View>
      </View>
    )
}

export default TopUserContainer;