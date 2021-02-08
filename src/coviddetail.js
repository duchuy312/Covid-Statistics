import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Image,
} from 'react-native';
import styles from './home.style';
import {useNavigation, useRoute} from '@react-navigation/native';
import {scale} from 'react-native-size-matters';

const Detail = () => {
  const route = useRoute('');

  return (
    <ImageBackground
      source={require('../src/map.png')}
      style={styles.background}>
      <View style={styles.detailtop}>
        <Image
          source={{uri: route.params.flagtranfer}}
          style={styles.bigflag}
        />
        <Text style={{fontSize: scale(35), fontWeight: 'bold'}}>
          {route.params.name}
        </Text>
        <Text style={styles.topdetail}>
          {route.params.case.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Text>
        <Text style={styles.databottext}>Cases</Text>
        <Text style={styles.databottext}>Today + {route.params.todaycase}</Text>
      </View>
      <View style={styles.detailmid}>
        <View style={styles.bigdetaildata}>
          <View style={styles.detaildata}>
            <Text style={styles.datatext}>
              {route.params.recoverstat
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
            <Text style={styles.databottext}>
              Today + {route.params.todayrecover}
            </Text>
          </View>
          <View style={styles.tinydetaildata}>
            <Text style={styles.datatitletext}>Recovered</Text>
          </View>
        </View>
        <View style={styles.bigdetaildata}>
          <View style={styles.detaildata1}>
            <Text style={styles.datatext}>
              {route.params.deathstat
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
            <Text style={styles.databottext}>
              Today + {route.params.todaydeath}
            </Text>
          </View>
          <View style={styles.tinydetaildata1}>
            <Text style={styles.datatitletext}>Deaths</Text>
          </View>
        </View>
      </View>
      <View style={styles.detailmid}>
        <View style={styles.bigdetaildata}>
          <View style={styles.detaildata3}>
            <Text style={styles.datatext}>
              {route.params.activestat
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </View>
          <View style={styles.tinydetaildata3}>
            <Text style={styles.datatitletext}>Active</Text>
          </View>
        </View>
        <View style={styles.bigdetaildata}>
          <View style={styles.detaildata2}>
            <Text style={styles.datatext}>
              {route.params.criticalstat
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </View>
          <View style={styles.tinydetaildata2}>
            <Text style={styles.datatitletext}>Critical</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
export default Detail;
