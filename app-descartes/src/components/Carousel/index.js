import React from 'react';
import { View, Image, ScrollView, Dimensions, Text, StyleSheet } from 'react-native';
import Flag from "../../assets/flag.png";
const {width} = Dimensions.get("window");
const height = width * 0.35;
const images = [
    'http://cdls.org.br/wp-content/uploads/cdlce_base/2018/11/Banner-Site-CDL-Ensino-800x300.png',
    'http://vikingsbr.com/wp-content/uploads/2017/06/BANNER-SITE-SOBREMESAS.png',
    'http://artbrasildigital.com/view/img/banner_01.jpg',
    'https://lojafabula.vteximg.com.br/arquivos/ids/442529/BANNER_categorias_MBL_ATE50.jpg?v=637487483728430000'
]

export default class Carousel extends React.Component {
    state = {
        active: 0
    }

    change = ({nativeEvent}) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if(slide !== this.state.active){
            this.setState({active: slide});
        }
    }
    render() {
        return (
            <View style={style.container}>
              <View style={style.flag}>
                <Image source={Flag} />
              </View>
                <ScrollView
                  pagingEnabled
                  horizontal
                  onScroll={this.change}
                  showsHorizontalScrollIndicator={false}
                  style={style.scroll}>
                  {
                      images.map((image, index) => (
                        <View style={style.containerImg}>
                          <Image
                              key={index}
                              source={{ uri: image }}
                              style={style.image}
                          />
                          </View>
                      ))
                  }
                </ScrollView>
                <View style={style.pagination}>
                    {
                        images.map((i,k) => (
                          <Text key={k} style={k==this.state.active ? style.pagingActiveText: style.pagingText}>⬤</Text>
                        ))
                    }
                </View>
            </View>
          );
    }
  };

  const style = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 30,
        height,
        backgroundColor: '#f1f1f1',
    },
    flag :{
      position: 'absolute',
      zIndex: 10,
      marginLeft: "5%",
      marginTop: "3%",
    },
    scroll: {
        width,
        height
    },
    containerImg:{
      width,
      paddingLeft: 20,
      paddingRight: 20,
    },
    image: {
        width: '100%',
        height,
        resizeMode: 'cover',
        borderRadius: 10

    },
    pagination: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 0,
      alignSelf: 'center'
    },
    pagingText: {
      color: '#888',
      margin: 3
    },
    pagingActiveText: {
      color: '#fff',
      margin: 3
    }
})

