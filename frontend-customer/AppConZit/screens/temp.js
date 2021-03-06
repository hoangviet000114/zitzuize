/**
* This is the Main file
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Image, Dimensions, TouchableWithoutFeedback, AsyncStorage } from 'react-native';
import { View, Container, Content, Button, Left, Right, Icon, Picker, Item, Grid, Col, Toast, Text as NBText } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Carousel, { Pagination } from 'react-native-snap-carousel';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import { default as ProductComponent } from '../component/Product';

export default class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {},
      activeSlide: 0,
      quantity: 1,
      selectedColor: '',
      selectedSize: ''
    };
  }

  componentWillMount() {
    //get the product with id of this.props.product.id from your server
    this.setState({ product: dummyProduct });
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#fdfdfd' }}>
        <Navbar left={left} right={right} title={this.props.product.title} />
        <Content>




          <Carousel
            data={this.state.product.images}
            renderItem={this._renderItem}
            ref={(carousel) => { this._carousel = carousel; }}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width}
            onSnapToItem={(index) => this.setState({ activeSlide: index })}
            enableSnap={true}
          />
          <Pagination
            dotsLength={this.state.product.images.length}
            activeDotIndex={this.state.activeSlide}
            containerStyle={{ backgroundColor: 'transparent', paddingTop: 0, paddingBottom: 0, marginTop: -15 }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.92)'
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
          <View style={{ backgroundColor: '#fdfdfd', paddingTop: 10, paddingBottom: 10, paddingLeft: 12, paddingRight: 12, alignItems: 'center' }}>
            <Grid>
              <Col size={3}>
                <Text style={{ fontSize: 18 }}>{this.state.product.title}</Text>
              </Col>
              <Col>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.state.product.price}</Text>
              </Col>
            </Grid>
            <Grid style={{ marginTop: 15 }}>
              <Col>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text>Color:</Text>
                </View>
              </Col>
              <Col size={3}>
                <Picker
                  mode="dropdown"
                  placeholder="Select a color"
                  note={true}
                  selectedValue={this.state.selectedColor}
                  onValueChange={(color) => this.setState({ selectedColor: color })}
                >
                  {this.renderColors()}
                </Picker>
              </Col>
            </Grid>
            <Grid>
              <Col>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text>Size:</Text>
                </View>
              </Col>
              <Col size={3}>
                <Picker
                  mode="dropdown"
                  placeholder="Select a size"
                  note={true}
                  selectedValue={this.state.selectedSize}
                  onValueChange={(size) => this.setState({ selectedSize: size })}
                >
                  {this.renderSize()}
                </Picker>
              </Col>
            </Grid>
            <Grid>
              <Col>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text>Quantity:</Text>
                </View>
              </Col>
              <Col size={3}>
                {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Button block icon transparent onPress={() => this.setState({ quantity: this.state.quantity > 1 ? this.state.quantity - 1 : 1 })} >
                    <Icon name='ios-remove' style={{ color: Colors.navbarBackgroundColor }} />
                  </Button>
                  <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center', paddingLeft: 30, paddingRight: 30 }}>
                    <Text style={{ fontSize: 18 }}>{this.state.quantity}</Text>
                  </View>
                  <Button block icon transparent onPress={() => this.setState({ quantity: this.state.quantity + 1 })}>
                    <Icon style={{ color: Colors.navbarBackgroundColor }} name='ios-add' />
                  </Button>
                </View>
                
                {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
              </Col>
            </Grid>
            {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Grid style={{ marginTop: 15 }}>
              <Col size={3}>
                <Button block onPress={this.addToCart.bind(this)} style={{ backgroundColor: Colors.navbarBackgroundColor }}>
                  <Text style={{ color: "#fdfdfd", marginLeft: 5 }}>Add to cart</Text>
                </Button>
              </Col>
            </Grid>
            {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <View style={{ marginTop: 15, padding: 10, borderWidth: 1, borderRadius: 3, borderColor: 'rgba(149, 165, 166, 0.3)' }}>
              <Text style={{ marginBottom: 5 }}>Description</Text>
              <View style={{ width: 50, height: 1, backgroundColor: 'rgba(44, 62, 80, 0.5)', marginLeft: 7, marginBottom: 10 }} />
              <NBText note>
                {this.state.product.description}
              </NBText>
            </View>
          </View>
          <View style={{ marginTop: 15, paddingLeft: 12, paddingRight: 12 }}>
            <Text style={{ marginBottom: 5 }}>Similar items</Text>
            <View style={{ width: 50, height: 1, backgroundColor: 'rgba(44, 62, 80, 0.5)', marginLeft: 7, marginBottom: 10 }} />
            {this.renderSimilairs()}
          </View>
        </Content>
      </Container>
    );
  }

  renderSimilairs() {
    let items = [];
    let stateItems = this.state.product.similarItems;
    for (var i = 0; i < stateItems.length; i += 2) {
      if (stateItems[i + 1]) {
        items.push(
          <Grid key={i}>
            <ProductComponent key={stateItems[i].id} product={stateItems[i]} />
            <ProductComponent key={stateItems[i + 1].id} product={stateItems[i + 1]} isRight />
          </Grid>
        );
      }
      else {
        items.push(
          <Grid key={i}>
            <ProductComponent key={stateItems[i].id} product={stateItems[i]} />
            <Col key={i + 1} />
          </Grid>
        );
      }
    }
    return items;
  }

  addToCart() {
    var product = this.state.product;
    product['quantity'] = this.state.quantity;
    AsyncStorage.getItem("CART", (err, res) => {
      if (!res) AsyncStorage.setItem("CART", JSON.stringify([product]));
      else {
        var items = JSON.parse(res);
        items.push(product);
        AsyncStorage.setItem("CART", JSON.stringify(items));
      }
    });
  }
}

const dummyProduct = {
  id: 2,
  title: 'V NECK T-SHIRT',
  description: "Pellentesque orci lectus, bibendum iaculis aliquet id, ullamcorper nec ipsum. In laoreet ligula vitae tristique viverra. Suspendisse augue nunc, laoreet in arcu ut, vulputate malesuada justo. Donec porttitor elit justo, sed lobortis nulla interdum et. Sed lobortis sapien ut augue condimentum, eget ullamcorper nibh lobortis. Cras ut bibendum libero. Quisque in nisl nisl. Mauris vestibulum leo nec pellentesque sollicitudin. Pellentesque lacus eros, venenatis in iaculis nec, luctus at eros. Phasellus id gravida magna. Maecenas fringilla auctor diam consectetur placerat. Suspendisse non convallis ligula. Aenean sagittis eu erat quis efficitur. Maecenas volutpat erat ac varius bibendum. Ut tincidunt, sem id tristique commodo, nunc diam suscipit lectus, vel",
  image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,w_358,x_150/v1500465309/pexels-photo-206470_nwtgor.jpg',
  images: [
    'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,w_358,x_150/v1500465309/pexels-photo-206470_nwtgor.jpg',
    'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,x_226,y_54/v1500465309/pexels-photo-521197_hg8kak.jpg',
    'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250,x_248/v1500465308/fashion-men-s-individuality-black-and-white-157675_wnctss.jpg',
    'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250/v1500465308/pexels-photo-179909_ddlsmt.jpg'
  ],
  price: '120$',
  colors: ['Red', 'Blue', 'Black'],
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  category: 'MAN',
  similarItems: [
    { id: 10, title: 'V NECK T-SHIRT', price: '29$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250,x_248/v1500465308/fashion-men-s-individuality-black-and-white-157675_wnctss.jpg' },
    { id: 11, title: 'V NECK T-SHIRT', price: '29$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250/v1500465308/pexels-photo-179909_ddlsmt.jpg' },
    { id: 12, title: 'V NECK T-SHIRT', price: '29$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250/v1500465308/pexels-photo-179909_ddlsmt.jpg' }
  ]
};