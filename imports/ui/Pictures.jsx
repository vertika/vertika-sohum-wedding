import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import ImageGallery from 'react-image-gallery';

var images = [
  // {
  //   original: 'http://lorempixel.com/1000/600/nature/1/',
  //   thumbnail: 'http://lorempixel.com/250/150/nature/1/',
  //   originalClass: 'featured-slide',
  //   thumbnailClass: 'featured-thumb',
  //   originalAlt: 'original-alt',
  //   thumbnailAlt: 'thumbnail-alt',
  //   description: 'Optional description...'
  // },
  {
    original: '/310.JPG',
    thumbnail: '/310.JPG'
  },
  {
    original: '/306.JPG',
    thumbnail: '/306.JPG'
  },
  {
    original: '/324.JPG',
    thumbnail: '/324.JPG'
  },
  {
    original: '/Finals-6.jpg',
    thumbnail: '/thumbnail/Finals-6.jpg'
  },
  {
    original: '/Finals-7.jpg',
    thumbnail: '/thumbnail/Finals-7.jpg'
  },
  {
    original: '/Finals-16.jpg',
    thumbnail: '/thumbnail/Finals-16.jpg'
  },
  {
    original: '/Finals-31.jpg',
    thumbnail: '/thumbnail/Finals-31.jpg'
  },
  {
    original: '/Finals-40.jpg',
    thumbnail: '/thumbnail/Finals-40.jpg'
  },
  {
    original: '/Finals-54.jpg',
    thumbnail: '/thumbnail/Finals-54.jpg'
  },
  {
    original: '/Finals-56.jpg',
    thumbnail: '/thumbnail/Finals-56.jpg'
  },
  {
    original: '/Finals-62.jpg',
    thumbnail: '/thumbnail/Finals-62.jpg'
  },
  {
    original: '/Finals-63.jpg',
    thumbnail: '/thumbnail/Finals-63.jpg'
  }
];

export default class Pictures extends Component {
  handleSlide(index) {
    //console.log('Slid to ' + index);
  }

  render() {
    return (
    	<div id="picturesBlock">
    		<h2>Gallery</h2>
       <ImageGallery
            items={images}
            autoPlay={true}
            slideInterval={4000}
            onSlide={this.handleSlide}/>
     	</div>
    );
  }
}

