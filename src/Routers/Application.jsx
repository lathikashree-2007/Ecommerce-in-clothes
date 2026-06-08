import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Existing Page Framework Layout Components
import Homepage from '../Pages/Homepage';
import Category from '../Pages/Category';
import ProductDetail from '../Pages/ProductDetail';
import Login from '../Pages/Login';
import Orders from '../Pages/Orders';
import Profile from '../Pages/Profile';
import AdminDashboard from '../Pages/AdminDashboard';
import Cart from '../Pages/Cart';
// NEW DEPLOYMENT PAGES & SHARED LAYOUT COMPONENTS
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Signup from '../Pages/Signup';
import ForgotPassword from '../Pages/ForgotPassword';
import ResetPassword from '../Pages/ResetPassword';
import AboutUs from '../Pages/AboutUs';
import ContactUs from '../Pages/ContactUs';
import FAQ from '../Pages/FAQ';
import PrivacyPolicy from '../Pages/PrivacyPolicy';
import TermsConditions from '../Pages/TermsConditions';

// Comprehensive 40-Item Catalog Dataset
const INITIAL_PRODUCTS = [
  // ==================== UPDATED MEN'S WEAR SELECTION (10 PRODUCTS) ====================
  { 
    id: 101, 
    name: "Vintage Tint Slim Fit Denim Jacket", 
    category: "men", 
    price: 2499, 
    oldPrice: 4999, 
    discount: 50, 
    rating: 4.5, 
    reviews: 128, 
    size: ["S", "M", "L", "XL"], 
    color: ["Indigo", "Ink Black"], 
    brand: "Roadster", 
    img: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&auto=format&fit=crop&q=80", 
    tag: "Best Seller", 
    salesCount: 145, 
    desc: "Premium rugged denim jacket with authentic vintage wash styling, dual buttoned chest pockets, and heavy-duty reinforced steel rivets. Perfect for classic urban layering." 
  },
  { 
    id: 102, 
    name: "Urban Athletics Varsity Bomber Jacket", 
    category: "men", 
    price: 1899, 
    oldPrice: 2999, 
    discount: 36, 
    rating: 4.2, 
    reviews: 94, 
    size: ["M", "L", "XL"], 
    color: ["Crimson Red", "Jet Black"], 
    brand: "HRX", 
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80", 
    tag: "New Arrival", 
    salesCount: 98, 
    desc: "Streetwear athletic varsity bomber featuring crisp contrasted rib-knit striped collar, structural cuffs, and customized snap-button enclosures for comfort and active use." 
  },
  { 
    id: 103, 
    name: "Premium Linen Mandarin Collar Shirt", 
    category: "men", 
    price: 1499, 
    oldPrice: 2499, 
    discount: 40, 
    rating: 4.6, 
    reviews: 215, 
    size: ["M", "L", "XL"], 
    color: ["Pure White", "Soft Beige"], 
    brand: "WROGN", 
    img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80", 
    tag: "Trending", 
    salesCount: 310, 
    desc: "Exquisitely tailored breathable organic linen shirt. Features a clean structured mandarin band collar, sleek single-cuff design, and refined curvature lines." 
  },
  { 
    id: 104, 
    name: "Classic Charcoal Suede Biker Jacket", 
    category: "men", 
    price: 4999, 
    oldPrice: 9999, 
    discount: 50, 
    rating: 4.8, 
    reviews: 72, 
    size: ["S", "M", "L"], 
    color: ["Charcoal Grey"], 
    brand: "Tommy Hilfiger", 
    img: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=600&auto=format&fit=crop&q=80", 
    tag: "Premium", 
    salesCount: 42, 
    desc: "Heavyweight premium genuine suede leather biker statement jacket built with industrial asymmetric silver zipper closures, notched lapels, and custom lined insulation layers." 
  },
  { 
    id: 105, 
    name: "Slim Fit Structured Casual Blazer", 
    category: "men", 
    price: 3899, 
    oldPrice: 6499, 
    discount: 40, 
    rating: 4.4, 
    reviews: 53, 
    size: ["M", "L", "XL"], 
    color: ["Navy Blue", "Olive Drab"], 
    brand: "Zara", 
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80", 
    tag: "Smart Casual", 
    salesCount: 61, 
    desc: "Lightly padded dual-button knit blazer tailored with notch lapels, functional patch pockets, and a clean double-vent design layout at the back base." 
  },
  { 
    id: 106, 
    name: "Classic Minimalist Oversized Hoodie", 
    category: "men", 
    price: 1699, 
    oldPrice: 2999, 
    discount: 43, 
    rating: 4.7, 
    reviews: 184, 
    size: ["S", "M", "L", "XL"], 
    color: ["Sand Dune Beige", "Sage Green"], 
    brand: "H&M", 
    img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80", 
    tag: "Trending", 
    salesCount: 220, 
    desc: "Heavyweight loopback cotton French Terry hoodie styled with dropped shoulder patterns, a spacious double-layered hood configuration, and clean ribbed hem bands." 
  },
  { 
    id: 107, 
    name: "Relaxed Fit Utility Cargo Trousers", 
    category: "men", 
    price: 1999, 
    oldPrice: 3499, 
    discount: 42, 
    rating: 4.3, 
    reviews: 112, 
    size: ["30", "32", "34", "36"], 
    color: ["Military Khaki", "Stealth Black"], 
    brand: "Roadster", 
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80", 
    tag: "Streetwear", 
    salesCount: 175, 
    desc: "Hard-wearing woven cotton twill cargo pants structured with pleated side utility flap pockets, articulated knee joints, and customizable drawstrings at the ankle cuffs." 
  },
  { 
    id: 108, 
    name: "Performance Dry-Fit Training Joggers", 
    category: "men", 
    price: 1599, 
    oldPrice: 2499, 
    discount: 36, 
    rating: 4.6, 
    reviews: 95, 
    size: ["S", "M", "L", "XL"], 
    color: ["Carbon Grey"], 
    brand: "Nike", 
    img: "https://images.unsplash.com/photo-1483721310020-03333e577078?w=600&auto=format&fit=crop&q=80", 
    tag: "Athleisure", 
    salesCount: 410, 
    desc: "Lightweight sweat-wicking multi-stretch weave pants built with laser-perforated breathability zones, concealed zipper side pockets, and custom branded elastic waist bands." 
  },
  { 
    id: 109, 
    name: "Mandarin Silk Blend Festive Kurta", 
    category: "men", 
    price: 2199, 
    oldPrice: 4399, 
    discount: 50, 
    rating: 4.8, 
    reviews: 140, 
    size: ["M", "L", "XL", "XXL"], 
    color: ["Royal Crimson", "Off-White Mustard"], 
    brand: "Manyavar", 
    img: "https://images.unsplash.com/photo-1583391265517-35bbdad01209?w=600&auto=format&fit=crop&q=80", 
    tag: "Festive Collection", 
    salesCount: 195, 
    desc: "Refined straight-fit luxury silk blend ethnic kurta structured with side slits, detailed piping running down the collar, and functional internal side storage slots." 
  },
  { 
    id: 110, 
    name: "Classic Breton Striped Crew Sweatshirt", 
    category: "men", 
    price: 1299, 
    oldPrice: 1999, 
    discount: 35, 
    rating: 4.5, 
    reviews: 68, 
    size: ["S", "M", "L"], 
    color: ["Navy White Stripe"], 
    brand: "Levis", 
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80", 
    tag: "Casual Essentials", 
    salesCount: 89, 
    desc: "Traditional mid-weight knit pullover cut from ultra-soft combed cotton loops. Accented with durable flatlocked stitched seams along the crew collar and side structures." 
  },

  // ==================== WOMEN'S WEAR SELECTION (10 PRODUCTS) ====================
  { 
    id: 201, 
    name: "Botanical Silk Tiered Summer Dress", 
    category: "women", 
    price: 1599, 
    oldPrice: 3199, 
    discount: 50, 
    rating: 4.7, 
    reviews: 312, 
    size: ["S", "M", "L"], 
    color: ["Blush Pink", "Canary Yellow"], 
    brand: "Anouk", 
    img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80", 
    tag: "Flash Deal", 
    salesCount: 220, 
    desc: "Ethereal loose-fit silk dress treated with rich radiant botanical pattern prints. Outfitted with an elegant tiered flowy silhouette, flared sleeves, and delicate drawstring detailing." 
  },
  { 
    id: 202, 
    name: "Off-Shoulder Satin Gala Gown", 
    category: "women", 
    price: 4200, 
    oldPrice: 8400, 
    discount: 50, 
    rating: 4.9, 
    reviews: 86, 
    size: ["M", "L"], 
    color: ["Midnight Black", "Deep Maroon"], 
    brand: "Biba", 
    img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop&q=80", 
    tag: "Premium", 
    salesCount: 64, 
    desc: "Stunning draped satin evening gown displaying an elegant off-shoulder twist cut neckline, hidden structural boning for form support, and a high-slit trailing hemline finish." 
  },
  { 
    id: 203, 
    name: "Oversized Knit Minimalist Cardigan", 
    category: "women", 
    price: 2199, 
    oldPrice: 3999, 
    discount: 45, 
    rating: 4.4, 
    reviews: 143, 
    size: ["S", "M", "L"], 
    color: ["Oatmeal Creme", "Sage Green"], 
    brand: "Mango", 
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80", 
    tag: "Trending", 
    salesCount: 180, 
    desc: "Cozy chunky-knit designer cardigan meticulously woven with soft wool-blend yarns, dropped structural shoulder seams, spacious patch pockets, and premium wood horn buttons." 
  },
  { 
    id: 204, 
    name: "Classic Double-Breasted Trench Coat", 
    category: "women", 
    price: 5499, 
    oldPrice: 10999, 
    discount: 50, 
    rating: 4.9, 
    reviews: 58, 
    size: ["S", "M", "L", "XL"], 
    color: ["Khaki Camel Beige"], 
    brand: "Zara", 
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80", 
    tag: "Best Seller", 
    salesCount: 95, 
    desc: "Water-resistant tightly woven tailored cotton gabardine trench coat. Features signature shoulder epaulets, double-breasted horn closures, and adjustable waist cinching belt straps." 
  },
  {
    id: 205,
    name: "High-Waisted Structured Tailored Trousers",
    category: "women",
    price: 1899,
    oldPrice: 2999,
    discount: 36,
    rating: 4.5,
    reviews: 92,
    size: ["26", "28", "30", "32"],
    color: ["Alabaster White", "Dark Charcoal"],
    brand: "H&M",
    img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80",
    tag: "Office Wear",
    salesCount: 140,
    desc: "Sharp smart-casual elegant trousers showcasing sharp front creases, hidden zip-fly fastening extensions, roomy side slip pockets, and structural belt-loop definitions."
  },
  {
    id: 206,
    name: "Chiffon Pleated Statement Midi Skirt",
    category: "women",
    price: 1499,
    oldPrice: 2499,
    discount: 40,
    rating: 4.3,
    reviews: 74,
    size: ["S", "M", "L"],
    color: ["Emerald Green", "Dusty Lavender"],
    brand: "Vero Moda",
    img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
    tag: "Trending",
    salesCount: 105,
    desc: "High-grade airy chiffon skirt engineered with precise knife pleats that retain dynamic form over cycles. Complete with a soft flexible elasticated internal waistband structure."
  },
  {
    id: 207,
    name: "Premium Ribbed Mock Neck Crop Sweater",
    category: "women",
    price: 1299,
    oldPrice: 1999,
    discount: 35,
    rating: 4.6,
    reviews: 118,
    size: ["XS", "S", "M", "L"],
    color: ["Rust Terracotta", "Cream Ivory"],
    brand: "Only",
    img: "https://images.unsplash.com/photo-1574164904299-3a102b110380?w=600&auto=format&fit=crop&q=80",
    tag: "Winter Essentials",
    salesCount: 210,
    desc: "Snug ultra-comfy stretch knit fabrication pattern displaying vertical linear ribbed textures, clean mock neckline accents, and a contemporary boxy raw cut crop silhouette."
  },
  {
    id: 208,
    name: "Luxe Comfort French Terry Joggers",
    category: "women",
    price: 999,
    oldPrice: 1999,
    discount: 50,
    rating: 4.8,
    reviews: 410,
    size: ["S", "M", "L", "XL"],
    color: ["Melange Grey", "Midnight Navy"],
    brand: "Nike",
    img: "https://images.unsplash.com/photo-1551854838-212c50b4c184?w=600&auto=format&fit=crop&q=80",
    tag: "Athleisure",
    salesCount: 530,
    desc: "Plush organic combed French Terry lounge trousers featuring flexible drawstring parameters, reinforced ribbed ankle cuff wraps, and heavy flatlock seam structures."
  },
  {
    id: 209,
    name: "Embroidered Festive Georgette Kurta Set",
    category: "women",
    price: 2999,
    oldPrice: 5999,
    discount: 50,
    rating: 4.9,
    reviews: 165,
    size: ["S", "M", "L", "XL", "XXL"],
    color: ["Deep Wine", "Mustard Yellow"],
    brand: "W",
    img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
    tag: "Ethnic Special",
    salesCount: 290,
    desc: "Exquisite traditional tunic look utilizing luxurious faux georgette fabric. Intricately bound with heavy zari thread embroidery along the yoke, styled alongside solid trousers."
  },
  {
    id: 210,
    name: "Relaxed Fit Chambray Utility Shirt",
    category: "women",
    price: 1199,
    oldPrice: 1999,
    discount: 40,
    rating: 4.2,
    reviews: 52,
    size: ["S", "M", "L"],
    color: ["Light Bleach Wash"],
    brand: "Levis",
    img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80",
    tag: "Casuals",
    salesCount: 88,
    desc: "Lightweight, highly durable woven cotton chambray button-down look with dropped shoulder seams, chest utility flap pockets, and versatile roll-up button sleeve tab functions."
  },

  // ==================== UPDATED KIDS' WEAR SELECTION (10 PRODUCTS) ====================
  { 
    id: 301, 
    name: "Organic Cotton Superhero Fleece Hoodie", 
    category: "kids", 
    price: 899, 
    oldPrice: 1499, 
    discount: 40, 
    rating: 4.4, 
    reviews: 55, 
    size: ["4-5Y", "6-7Y", "8-9Y"], 
    color: ["Cobalt Blue", "Heather Grey"], 
    brand: "Max Kids", 
    img: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80", 
    tag: "Trending", 
    salesCount: 110, 
    desc: "Ultra-plush combed organic cotton interior fleece hoodie stamped with crisp eco-friendly toxic-free superhero shield graphics. Soft on sensitive skin textures." 
  },
  { 
    id: 302, 
    name: "Mini-Chambray Floral Dungaree Set", 
    category: "kids", 
    price: 1299, 
    oldPrice: 1999, 
    discount: 35, 
    rating: 4.6, 
    reviews: 42, 
    size: ["2-3Y", "4-5Y"], 
    color: ["Light Denim Wash"], 
    brand: "Mothercare", 
    img: "https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?w=600&auto=format&fit=crop&q=80", 
    tag: "New Arrival", 
    salesCount: 74, 
    desc: "Two-piece active set comprising a breathable floral print jersey crew tee and fully adjustable classic cross-back cotton denim chambray overalls with easy click snaps." 
  },
  {
    id: 303,
    name: "Breathable Mesh Active Training Shoes",
    category: "kids",
    price: 1799,
    oldPrice: 2999,
    discount: 40,
    rating: 4.8,
    reviews: 89,
    size: ["11K", "12K", "13K", "1Y"],
    color: ["Neon Lime", "Electric Pink"],
    brand: "Nike",
    img: "https://images.unsplash.com/photo-1514989940723-e8e5163ccbe8?w=600&auto=format&fit=crop&q=80",
    tag: "Best Seller",
    salesCount: 190,
    desc: "High-rebound cloud foam running sneakers featuring structural breathable engineered mesh uppers, secure loop-and-hook straps, and non-marking rubber outsoles."
  },
  {
    id: 304,
    name: "Waterproof Hooded Windbreaker Jacket",
    category: "kids",
    price: 1499,
    oldPrice: 2499,
    discount: 40,
    rating: 4.5,
    reviews: 31,
    size: ["5-6Y", "7-8Y", "9-10Y"],
    color: ["Sunshine Yellow", "Sky Blue"],
    brand: "H&M",
    img: "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=600&auto=format&fit=crop&q=80",
    tag: "Monsoon Gear",
    salesCount: 65,
    desc: "Lightweight, fully seam-sealed ripstop nylon shell raincoat. Features structural elastic wrist parameters, reflective safety strips, and a soft breathable mesh lining mesh texture."
  },
  {
    id: 305,
    name: "Whimsical Tulle Tiered Birthday Dress",
    category: "kids",
    price: 1999,
    oldPrice: 3999,
    discount: 50,
    rating: 4.9,
    reviews: 112,
    size: ["3-4Y", "5-6Y", "7-8Y"],
    color: ["Unicorn Lavender", "Peach Cream"],
    brand: "Chicco",
    img: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&auto=format&fit=crop&q=80",
    tag: "Party Wear",
    salesCount: 140,
    desc: "Dreamy multi-layered tulle party gown outfitted with soft premium cotton inner linings, a hidden itch-free back zipper panel, and an elegant satin waist sash loop."
  },
  {
    id: 306,
    name: "Classic Plaid Cotton Flannel Button-Up",
    category: "kids",
    price: 799,
    oldPrice: 1299,
    discount: 38,
    rating: 4.3,
    reviews: 48,
    size: ["4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    color: ["Lumberjack Red", "Forest Green"],
    brand: "Gap Kids",
    img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80",
    tag: "Casual Essentials",
    salesCount: 95,
    desc: "Ultra-soft double-brushed premium cotton flannel shirt. Features a structured button-down point collar, buttoned sleeve cuffs for easy rolling, and twin chest pockets."
  },
  {
    id: 307,
    name: "Super-Stretch Everyday Denim Jeggings",
    category: "kids",
    price: 849,
    oldPrice: 1499,
    discount: 43,
    rating: 4.6,
    reviews: 156,
    size: ["5-6Y", "7-8Y", "9-10Y"],
    color: ["Classic Indigo Medium", "Acid Charcoal"],
    brand: "Zara",
    img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80",
    tag: "Play Ready",
    salesCount: 280,
    desc: "Highly resilient knit denim leggings crafted with high spandex blends for complete movement freedom. Outfitted with an easy slip-on elastic comfort waistband loop."
  },
  {
    id: 308,
    name: "Comfy Ribbed Pajama Co-Ord Set",
    category: "kids",
    price: 699,
    oldPrice: 1199,
    discount: 41,
    rating: 4.7,
    reviews: 230,
    size: ["2-3Y", "4-5Y", "6-7Y"],
    color: ["Mint Green", "Oatmeal Heather"],
    brand: "Max Kids",
    img: "https://images.unsplash.com/photo-1540479859555-17af45c78a62?w=600&auto=format&fit=crop&q=80",
    tag: "Sleepwear",
    salesCount: 340,
    desc: "Snug-fitting minimalist Loungewear set tailored out of ultra-breathable modal-cotton ribbed patterns. Soft flat-locked interior sewing prevents irritation loops."
  },
  {
    id: 309,
    name: "Festive Cotton Silk Kurta Dhoti Set",
    category: "kids",
    price: 1599,
    oldPrice: 2999,
    discount: 46,
    rating: 4.8,
    reviews: 67,
    size: ["4-5Y", "6-7Y", "8-9Y"],
    color: ["Marigold Orange", "Royal Blue"],
    brand: "Manyavar",
    img: "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=600&auto=format&fit=crop&q=80",
    tag: "Ethnic Special",
    salesCount: 105,
    desc: "Lightweight traditional cotton silk weave kurta accented with elegant gold zari trim lines, paired with a pre-stitched, pull-on elasticated comfort dhoti pant."
  },
  {
    id: 310,
    name: "Pack of 3 Everyday Bio-Wash Tees",
    category: "kids",
    price: 599,
    oldPrice: 999,
    discount: 40,
    rating: 4.4,
    reviews: 412,
    size: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    color: ["Multi-Color Assorted"],
    brand: "United Colors of Benetton",
    img: "https://images.unsplash.com/photo-1471286174240-e6458e7be3b4?w=600&auto=format&fit=crop&q=80",
    tag: "Value Pack",
    salesCount: 620,
    desc: "Bundle of three relaxed crewneck t-shirts treated with a smooth premium bio-wash scale finish. Retains rich pigment and structure across heavy automated wash cycles."
  },

  // ==================== UPDATED ACCESSORIES SELECTION (10 PRODUCTS) ====================
  { 
    id: 401, 
    name: "Chronograph Stainless Quartz Watch", 
    category: "accessories", 
    price: 3499, 
    oldPrice: 6999, 
    discount: 50, 
    rating: 4.6, 
    reviews: 210, 
    size: ["Free Size"], 
    color: ["Classic Tan Brown", "Onyx Black"], 
    brand: "Titan", 
    img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop&q=80", 
    tag: "Best Seller", 
    salesCount: 185, 
    desc: "High-precision Japanese quartz movement sub-dial chronograph timepiece housed inside premium solid grade stainless steel. Accented with an authentic hand-stitched Italian leather watchband strap loop." 
  },
  { 
    id: 402, 
    name: "Polarized Handcrafted Wayfarer Sunglasses", 
    category: "accessories", 
    price: 1799, 
    oldPrice: 2999, 
    discount: 40, 
    rating: 4.7, 
    reviews: 340, 
    size: ["Standard M"], 
    color: ["Glossy Tortoiseshell", "Matte Black"], 
    brand: "Ray-Ban", 
    img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80", 
    tag: "Must Have", 
    salesCount: 420, 
    desc: "Impact-resistant UV400 polarized visual shielding tech embedded within high-grade flexible hand-polished acetate wayfarer frames. Delivers incredible clarity and contrast." 
  },
  {
    id: 403,
    name: "Full-Grain Leather Minimalist Bifold Wallet",
    category: "accessories",
    price: 1299,
    oldPrice: 2499,
    discount: 48,
    rating: 4.5,
    reviews: 192,
    size: ["Free Size"],
    color: ["Saddle Tan", "Burgundy Slate"],
    brand: "Wildhorn",
    img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80",
    tag: "Everyday Carry",
    salesCount: 310,
    desc: "Slim profile wallet meticulously cut from genuine vegetable-tanned full-grain leather. Outfitted with 6 precision card slots, a cash bay, and integrated RFID-blocking security layers."
  },
  {
    id: 404,
    name: "Water-Resistant Commuter Tech Backpack",
    category: "accessories",
    price: 2499,
    oldPrice: 4999,
    discount: 50,
    rating: 4.8,
    reviews: 512,
    size: ["24L"],
    color: ["Matte Charcoal", "Stealth Navy"],
    brand: "Skybags",
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    tag: "Top Rated",
    salesCount: 640,
    desc: "Ergonomic modern travel pack structured from heavy-duty ballistic 1680D nylon. Features a dedicated plush-lined 16-inch laptop chamber, hidden luggage straps, and an external charging pass-through."
  },
  {
    id: 405,
    name: "Genuine Textured Casual Leather Belt",
    category: "accessories",
    price: 899,
    oldPrice: 1799,
    discount: 50,
    rating: 4.3,
    reviews: 88,
    size: ["32", "34", "36", "38"],
    color: ["Rich Mahogany", "Classic Black"],
    brand: "Tommy Hilfiger",
    img: "https://images.unsplash.com/photo-1624222247344-550fb8ef986d?w=600&auto=format&fit=crop&q=80",
    tag: "Essential",
    salesCount: 155,
    desc: "Highly versatile strap engineered with premium oil-pull-up genuine leather textures. Paired with a brushed metallic gunmetal buckle fixture and curved loop borders."
  },
  {
    id: 406,
    name: "Aviation Style Mirror Gradient Sunglasses",
    category: "accessories",
    price: 1999,
    oldPrice: 3499,
    discount: 42,
    rating: 4.6,
    reviews: 145,
    size: ["Standard L"],
    color: ["Polished Gold", "Silver Mirror"],
    brand: "Ray-Ban",
    img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=80",
    tag: "Trending",
    salesCount: 210,
    desc: "Ultra-lightweight stainless steel wireframe pilots featuring shatterproof polycarbonate gradient lenses. Engineered with adjustable soft silicone nose pads for zero-pressure all-day wear."
  },
  {
    id: 407,
    name: "Sterling Silver Interlocking Chain Bracelet",
    category: "accessories",
    price: 1499,
    oldPrice: 2999,
    discount: 50,
    rating: 4.7,
    reviews: 76,
    size: ["Adjustable"],
    color: ["Metallic Silver"],
    brand: "Giva",
    img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&auto=format&fit=crop&q=80",
    tag: "Premium Accent",
    salesCount: 94,
    desc: "Elegant statement link jewelry made out of high-grade 925 sterling silver treated with premium anti-tarnish rhodium plating. Features an easy-to-use custom lobster claw clasp clasp hook."
  },
  {
    id: 408,
    name: "Woven Breathable Smartwatch Sport Band",
    category: "accessories",
    price: 499,
    oldPrice: 999,
    discount: 50,
    rating: 4.4,
    reviews: 230,
    size: ["42/44/45mm"],
    color: ["Olive Army Cargo", "Midnight Orange Loop"],
    brand: "Fastrack",
    img: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&auto=format&fit=crop&q=80",
    tag: "Gym Essential",
    salesCount: 480,
    desc: "Soft, dual-layer tightly woven nylon loop bands featuring high-density micro-threaded structures that let sweat and ambient air bypass efficiently during high-intensity training setups."
  },
  {
    id: 409,
    name: "Structured Saffiano Crossbody Vanity Bag",
    category: "accessories",
    price: 2999,
    oldPrice: 5999,
    discount: 50,
    rating: 4.9,
    reviews: 165,
    size: ["Free Size"],
    color: ["Blush Rose Pink", "Ivory Cream"],
    brand: "Mango",
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80",
    tag: "Luxury Collection",
    salesCount: 115,
    desc: "Elegant semi-structured shoulder look utilizing water-resistant Saffiano faux leather. Features gold-toned hardware, a secure zip top closure, and a customizable chain link strap shoulder length."
  },
  {
    id: 410,
    name: "Classic Heritage Wool Fedora Hat",
    category: "accessories",
    price: 1199,
    oldPrice: 1999,
    discount: 40,
    rating: 4.2,
    reviews: 38,
    size: ["M", "L"],
    color: ["Deep Olive Green", "Camel Brown"],
    brand: "Zara",
    img: "https://images.unsplash.com/photo-1533055640609-24b498dfd74c?w=600&auto=format&fit=crop&q=80",
    tag: "Retro Aesthetic",
    salesCount: 52,
    desc: "Timeless wide-brim headwear built from premium 100% Australian wool felt patterns. Wrapped with a clean tonal grosgrain ribbon band and matching stitched structural inner sweatbands."
  } 
];

// Append remaining filler items to cleanly lock down the required 40-item layout structure
for (let i = 16; i <= 40; i++) {
  // FIXED: Added accessories to the automated loop generator array
  const categories = ["men", "women", "kids", "accessories"];
  const selectedCat = categories[i % 4]; // Changed to % 4
  
  INITIAL_PRODUCTS.push({
    id: 100 + i,
    name: `Automated Catalog Product Model Type ${i}`,
    category: selectedCat, // This will now cleanly assign "accessories" to items as well!
    price: 999 + (i * 50),
    oldPrice: (999 + (i * 50)) * 2,
    discount: 50,
    rating: parseFloat((4.0 + (i % 10) * 0.1).toFixed(1)),
    reviews: 20 + i,
    size: selectedCat === "accessories" ? ["Free Size"] : ["S", "M", "L"],
    color: ["Solid Black", "Classic Variant"],
    brand: "FashionHub Core",
    img: selectedCat === "men" 
      ? "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80"
      : selectedCat === "women"
      ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"
      : selectedCat === "kids"
      ? "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80"
      : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80", // Fallback accessory image
    tag: "Core Inventory Stack",
    salesCount: 10 + i,
    desc: "A stable foundational product object injected structurally into local application state layers."
  });
}

if (typeof window !== 'undefined') {
  localStorage.setItem('db_products', JSON.stringify(INITIAL_PRODUCTS));
}

export default function Application() {
  useEffect(() => {
    try {
      const currentProducts = JSON.parse(localStorage.getItem('db_products')) || [];
      const womenCount = currentProducts.filter(p => p && p.category === 'women').length;
      if (womenCount < 10) {
        localStorage.removeItem('db_products');
        window.location.reload(); 
      }
    } catch (e) {
      localStorage.removeItem('db_products');
    }
  }, []);
  
  // Defensive state initialization using fallback logic to prevent 'undefined' crashes
  const [productsList, setProductsList] = useState(() => {
    try {
      const savedProducts = localStorage.getItem('db_products');
      return savedProducts ? JSON.parse(savedProducts) : INITIAL_PRODUCTS;
    } catch (e) {
      return INITIAL_PRODUCTS;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [isAdminMode, setIsAdminMode] = useState(() => localStorage.getItem('isAdmin') === 'true');
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('userProfile');
      return saved ? JSON.parse(saved) : { name: "Alex Harrison", email: "alex.harrison@mail.com", phone: "9876543210", address: "402, Sapphire Block, Bangalore - 560102" };
    } catch(e) {
      return { name: "Alex Harrison", email: "alex.harrison@mail.com", phone: "9876543210", address: "402, Sapphire Block, Bangalore - 560102" };
    }
  });

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [ordersList, setOrdersList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('userOrders')) || [];
    } catch(e) {
      return [];
    }
  });
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeNotification, setActiveNotification] = useState('🔥 FLASH SALE: Use coupon code FIRST50 for 50% discount!');

  useEffect(() => { 
    if(productsList) localStorage.setItem('db_products', JSON.stringify(productsList)); 
  }, [productsList]);
  
  useEffect(() => { 
    if(ordersList) localStorage.setItem('userOrders', JSON.stringify(ordersList)); 
  }, [ordersList]);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#121212' : '#fdfdfd';
    document.body.style.color = darkMode ? '#ffffff' : '#111111';
  }, [darkMode]);

  const handleAddProduct = (newProd) => setProductsList([...productsList, { ...newProd, id: Date.now() }]);
  const handleUpdateProduct = (updatedProd) => setProductsList(productsList.map(p => p.id === updatedProd.id ? updatedProd : p));
  const handleDeleteProduct = (id) => setProductsList(productsList.filter(p => p.id !== id));
  const handleUpdateOrderStatus = (orderId, nextStatus) => setOrdersList(ordersList.map(o => o.orderId === orderId ? { ...o, status: nextStatus } : o));

  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    localStorage.setItem('isLoggedIn', 'true');
    if (userData) {
      setUserProfile(userData);
      localStorage.setItem('userProfile', JSON.stringify(userData));
      if (userData.email === "admin@fashionhub.com") {
        setIsAdminMode(true);
        localStorage.setItem('isAdmin', 'true');
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdminMode(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    setCart([]);
    setWishlist([]);
    setActiveNotification("👋 Logged out successfully.");
  };

  const addToCart = (product, selectedSize = "M") => {
    setCart(prev => [...prev, { ...product, quantity: 1, size: selectedSize }]);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim().length > 1) {
      setSuggestions(productsList.filter(p => p && p.name && p.name.toLowerCase().includes(val.toLowerCase())));
    } else {
      setSuggestions([]);
    }
  };

  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        <Navbar cartCount={cart.length} isAuthenticated={isAuthenticated} onLogout={handleLogout} />

        <div style={{ flex: '1' }}>
          <Routes>
  {/* Homepage Route */}
  <Route path="/" element={<Homepage productsList={productsList || []} products={productsList || []} cart={cart || []} addToCart={addToCart} wishlist={wishlist || []} setWishlist={setWishlist} darkMode={darkMode} setDarkMode={setDarkMode} searchQuery={searchQuery} handleSearchChange={handleSearchChange} suggestions={suggestions || []} activeNotification={activeNotification} isAuthenticated={isAuthenticated} onLogout={handleLogout} />} />
  
  {/* FIXED: Category Route - handles both 'productsList' and 'products' variables defensively */}
  <Route path="/category/:type" element={<Category productsList={productsList || []} products={productsList || []} addToCart={addToCart} wishlist={wishlist || []} setWishlist={setWishlist} />} />
  
  {/* FIXED: Product Detail Route - handles both variations safely */}
  <Route path="/product/:id" element={<ProductDetail productsList={productsList || []} products={productsList || []} addToCart={addToCart} wishlist={wishlist || []} setWishlist={setWishlist} />} />
  
  {/* Other standard pages */}
  <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} isAuthenticated={isAuthenticated} />} />
  <Route 
  path="/profile" 
  element={
    <Profile 
      userProfile={userProfile} 
      setUserProfile={setUserProfile} 
      onLogout={handleLogout} 
      isAuthenticated={isAuthenticated} 
      ordersList={ordersList || []} 
      orders={ordersList || []} 
      cartList={cart || []}
      cart={cart || []} 
    />
  } 
/>
  <Route path="/orders" element={<Orders ordersList={ordersList || []} onCancelOrder={(id) => setOrdersList(prev => prev.filter(o => o.orderId !== id))} />} />
  
  <Route path="/admin" element={isAdminMode ? <AdminDashboard productsList={productsList || []} onAdd={handleAddProduct} onUpdate={handleUpdateProduct} onDelete={handleDeleteProduct} ordersList={ordersList || []} onUpdateStatus={handleUpdateOrderStatus} /> : <Navigate to="/login" replace />} />

  <Route path="/signup" element={<Signup />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/reset-password" element={<ResetPassword />} />
  <Route path="/about" element={<AboutUs />} />
  <Route path="/contact" element={<ContactUs />} />
  <Route path="/faq" element={<FAQ />} />
  <Route path="/privacy" element={<PrivacyPolicy />} />
  <Route path="/terms" element={<TermsConditions />} />
  <Route 
  path="/cart" 
  element={
    <Cart 
      cart={cart} 
      setCart={setCart} 
      onPlaceOrder={(newOrder) => setOrdersList([newOrder, ...ordersList])} 
    />
  } 
/>
</Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}