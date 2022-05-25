import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import styles from './home.style';
import axios from 'axios';
import {SearchIcon} from '../svg/svg';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ActionSheetIOS} from 'react-native';
import {ActivityIndicator} from 'react-native';

const Home = () => {
  const [data, setData] = useState([]);
  const [Countryid, setCountryid] = useState('');

  const [total, setTotal] = useState('');
  const [todaycasestat, setTodaycasestat] = useState('');

  const [totalDeath, setTotalDeath] = useState('');
  const [todaydeathstat, setTodaydeathstat] = useState('');

  const [totalRecover, setTotalRecover] = useState('');
  const [todayrecoverstat, setTodayrecoverstat] = useState('');

  const [nameVN, setNameVN] = useState('');
  const [caseVN, setCaseVN] = useState('');
  const [deathVN, setDeathVN] = useState('');
  const [recoverVN, setRecoverVN] = useState('');
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const navigation = useNavigation();
  const [getting, setGetting] = useState(false);
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState([]);
  // const [searchQuery, setSearchQuery] = useState('');
  // const onChangeSearch = (query) => setSearchQuery(query);
  const getData = () => {
    axios
      .get('https://disease.sh/v3/covid-19/countries')
      .then((response) => {
        setGetting(true);
        setData(response.data);
        setFilteredDataSource(response.data);
        console.log(response);
        let totalCases = 0;
        let Death = 0;
        let Recover = 0;
        let totaltodaycase = 0;
        let totaltodaydeath = 0;
        let totaltodayrecover = 0;
        let arr = [];
        for (let i = 0; i < response.data.length; i++) {
          totalCases = totalCases + response.data[i].cases;
          Death = Death + response.data[i].deaths;
          Recover = Recover + response.data[i].recovered;
          totaltodaycase = totaltodaycase + response.data[i].todayCases;
          totaltodaydeath = totaltodaydeath + response.data[i].todayDeaths;
          totaltodayrecover =
            totaltodayrecover + response.data[i].todayRecovered;
          arr[i] = i;
          if (response.data[i].country === 'Vietnam') {
            setNameVN(response.data[i].country);
            setCaseVN(response.data[i].cases);
            setDeathVN(response.data[i].deaths);
            setRecoverVN(response.data[i].recovered);
          }
        }
        setTodaydeathstat(totaltodaydeath);
        setTodayrecoverstat(totaltodayrecover);
        setTodaycasestat(totaltodaycase);
        setTotal(totalCases);
        setTotalDeath(Death);
        setTotalRecover(Recover);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(() => {
        console.log('finaly');
        setGetting(false);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = data.filter(function (item) {
        const itemData = item.country
          ? item.country.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(data);
      setSearch(text);
    }
  };
  const renderItem = ({item, index}) => {
    const backgroundColor = item.id === Countryid ? '#2C2F2E' : '#f2f2f2';
    return (
      <TouchableOpacity
        style={[styles.item, {backgroundColor}]}
        onPress={() =>
          navigation.navigate('Detail', {
            name: item.country,
            case: item.cases,
            flagtranfer: item.countryInfo.flag,
            deathstat: item.deaths,
            recoverstat: item.recovered,
            todaycase: item.todayCases,
            todaydeath: item.todayDeaths,
            todayrecover: item.todayRecovered,
            activestat: item.active,
            criticalstat: item.critical,
          })
        }>
        <Image source={{uri: item.countryInfo.flag}} style={styles.flag} />
        <Text style={styles.countryname}>{item.country}</Text>
        <Text style={styles.casestext}>
          {item.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderFooter = () => {
    return getting ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };
  return (
    <SafeAreaView>
      <View style={styles.topcontainer}>
        <Text style={styles.toptext}>
          {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Text>
        <Text>Today +{todaycasestat}</Text>
      </View>
      <View style={styles.topsmaller}>
        <View style={styles.text1}>
          <Text style={styles.toptext1}>
            {totalDeath.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
          <Text>Today +{todaydeathstat}</Text>
          <Text style={styles.bottext1}>Deaths</Text>
        </View>
        <View style={styles.text1}>
          <Text style={styles.toptext1}>
            {totalRecover.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
          <Text>Today +{todayrecoverstat}</Text>
          <Text style={styles.bottext1}>Recoveries</Text>
        </View>
      </View>
      <View style={styles.searchcontainer}>
        <View style={styles.searchbar}>
          <SearchIcon style={styles.icon} />
          <TextInput
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={(text) => searchFilterFunction('')}
            value={search}
            placeholder="Search"
            style={styles.searchtext}
          />
        </View>
      </View>
      <View style={styles.datacontainer}>
        <View>
          <TouchableOpacity style={styles.viewVN}>
            <Image
              source={{uri: 'https://disease.sh/assets/img/flags/vn.png'}}
              style={styles.flag}
            />
            <Text style={styles.countryname}>{nameVN}</Text>
            <Text style={styles.datacaseVN}>
              {caseVN.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          ListFooterComponent={renderFooter}
          refreshing={getting}
          onRefresh={() => getData()}
          data={filteredDataSource.sort((a, b) => b.cases - a.cases)}
          renderItem={renderItem}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          extraData={Countryid}
        />
      </View>
    </SafeAreaView>
  );
};
export default Home;
