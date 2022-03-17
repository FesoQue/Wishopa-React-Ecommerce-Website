import FEATURED_IMG1 from './images/featured-imgs/baseballTee.jpg';
import FEATURED_IMG2 from './images/featured-imgs/mountainviewTee.jpg';
import FEATURED_IMG3 from './images/featured-imgs/sonomaJacket.jpg';
import FEATURED_IMG4 from './images/featured-imgs/triblend.jpg';
import FEATURED_IMG5 from './images/featured-imgs/yellowTee.jpg';
import FEATURED_IMG6 from './images/featured-imgs/yerba.jpg';

export const featuredData = {
  featuredProducts: [
    {
      category: "men's clothing",
      description:
        "Hit a home run in the style stakes with this classic baseball tee. Designed with traditional contrast sleeves and an 'est 98' graphic honoring the year Google was founded.",
      id: 21,
      image: FEATURED_IMG1,
      price: 67.95,
      rating: 3.9,
      features: [
        'Unisex fit.',
        '52% cotton, 48% polyester.',
        'Available in white with black sleeves and the white Google logo printed at left bicep.',
      ],
      title: 'Est. 98 Baseball Tee',
    },
    {
      category: "men's clothing",
      description:
        'The Bay Area city named for its beautiful views of the Santa Cruz Mountains is also home to the Googleplex located at 1600 Amphitheater Parkway. Celebrate the place Google calls home in this American Apparel tee.',
      id: 22,
      image: FEATURED_IMG2,
      price: 75.15,
      rating: 3.2,
      features: [
        '100% combed cotton.',
        'Made in Los Angeles.',
        'Available in white with the Mountain View coordinates screenprinted at front.',
      ],
      title: 'Mountain View T-Shirt',
    },
    {
      category: "women's clothing",
      description:
        'A modern styled sport jacket that combines a classic silhouette with moisture-wicking fabrics. Technical features include a reversed coil zipper with reflective stripe, interior media exit port, and built-in media pocket.',
      id: 23,
      image: FEATURED_IMG3,
      price: 95.76,
      rating: 4.2,
      features: [
        '94% polyester, 6% spandex.',
        'Available in black with the white.',
      ],
      title: 'Ladies Sonoma Hybrid Knit Jacket',
    },
    {
      category: "men's clothing",
      description:
        'Dress it up, or dress it down. We promise you"ll fall in love with the versatility of this triblend polo.',
      id: 24,
      image: FEATURED_IMG4,
      price: 43.05,
      rating: 4.2,
      features: [
        '50/25/25 polyester/cotton/rayon blend. ',
        'Three-button placket with structured self-fabric collar and left chest pocket.',
        'Available in black',
      ],
      title: 'Tri-Blend Leisure Shirt',
    },
    {
      category: "women's clothing",
      description: 'This on-trend quarter zip doubles as workout gear.',
      id: 25,
      image: FEATURED_IMG6,
      price: 51.95,
      rating: 2.9,
      features: [
        '81% polyester, 19% spandex jersey knit.',
        'Textured knit fabric features a moisture-wicking finish.',
        'Exposed contrast reverse coil zipper with contrast inner collar.',
        'Lightweight design with added stretch.',
      ],
      title: 'Ladies Yerba Knit Quarter Zip',
    },
    {
      category: "women's clothing",
      description:
        'They say home is where the heart is. This vibrant tee features the Bay Area address of Google"s head office. ',
      id: 26,
      image: FEATURED_IMG5,
      price: 87.22,
      rating: 3.9,
      features: [
        '100% combed cotton.',
        'Made in the USA. ',
        'Available in gold with a striking design at front',
      ],
      title: 'MTV Ladies Yellow T-Shirt ',
    },
  ],
};
