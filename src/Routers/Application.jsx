
  import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

// Page Framework Layout Components
import Homepage from '../Pages/Homepage';
import Category from '../Pages/Category';
import ProductDetail from '../Pages/ProductDetail';
import Login from '../Pages/Login';
import Orders from '../Pages/Orders';
import Profile from '../Pages/Profile';
import AdminDashboard from '../Pages/AdminDashboard';

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
if (typeof window !== 'undefined') {
  localStorage.setItem('db_products', JSON.stringify(INITIAL_PRODUCTS));
}

function Application() {
  useEffect(() => {
    const currentProducts = JSON.parse(localStorage.getItem('db_products')) || [];
    // If the browser is stuck on the old data structure with only 2 women's items, wipe it out!
    const womenCount = currentProducts.filter(p => p.category === 'women').length;
    if (womenCount < 10) {
      localStorage.removeItem('db_products');
      window.location.reload(); // Force a clean reload to catch INITIAL_PRODUCTS
    }
  }, []);
  

  // --- APPLICATION DATABASE STATES ---
const [productsList, setProductsList] = useState(() => {
    const savedProducts = localStorage.getItem('db_products');
    if (savedProducts) {
      return JSON.parse(savedProducts);
    } else {
      // If storage was cleared, automatically save and load INITIAL_PRODUCTS
      localStorage.setItem('db_products', JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [isAdminMode, setIsAdminMode] = useState(() => localStorage.getItem('isAdmin') === 'true');
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : { name: "Alex Harrison", email: "alex.harrison@mail.com", phone: "9876543210", address: "402, Sapphire Block, Bangalore - 560102" };
  });

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // Real-time Order Engine Architecture Array
  const [ordersList, setOrdersList] = useState(() => JSON.parse(localStorage.getItem('userOrders')) || [
    { orderId: 482910, date: "2026-05-28", items: [{ name: "Classic Slim Fit Denim Jacket", price: 2499, quantity: 1, size: "M", img: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=100" }], grandTotal: 2499, status: "Shipped", shippingAddress: "Apt 4B, Silicon Towers, Bangalore", contactPhone: "9876543210" },
    { orderId: 883012, date: "2026-06-02", items: [{ name: "Kids Cotton Superhero Hoodie", price: 899, quantity: 2, size: "S", img: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=100" }], grandTotal: 1798, status: "Processing", shippingAddress: "Apt 4B, Silicon Towers, Bangalore", contactPhone: "9876543210" }
  ]);

  // --- UI SWITCHES & SMART PROMOTIONS STATES ---
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [browsingHistory, setBrowsingHistory] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [activeNotification, setActiveNotification] = useState('🔥 FLASH SALE: Use coupon code FIRST50 for an instant 50% checkout discount!');

  // Checkout Form Captures
  const [address, setAddress] = useState(userProfile.address);
  const [phone, setPhone] = useState(userProfile.phone);
  const [paymentType, setPaymentType] = useState('Cash on Delivery (COD)');

  // Synchronization with Persistent Memory (LocalStorage)
  useEffect(() => {
    localStorage.setItem('db_products', JSON.stringify(productsList));
  }, [productsList]);

  useEffect(() => {
    localStorage.setItem('userOrders', JSON.stringify(ordersList));
  }, [ordersList]);

  // Dark Mode Dynamic CSS Variable Mutator Injector
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#121212' : '#fdfdfd';
    document.body.style.color = darkMode ? '#ffffff' : '#111111';
  }, [darkMode]);

  // --- CORE ADMINISTRATIVE PANEL BACKEND HANDLERS ---
  const handleAddProduct = (newProd) => {
    const formatted = { ...newProd, id: Date.now(), rating: 5.0, reviews: 0, salesCount: 0 };
    setProductsList([...productsList, formatted]);
  };

  const handleUpdateProduct = (updatedProd) => {
    setProductsList(productsList.map(p => p.id === updatedProd.id ? updatedProd : p));
  };

  const handleDeleteProduct = (id) => {
    setProductsList(productsList.filter(p => p.id !== id));
  };

  const handleUpdateOrderStatus = (orderId, nextStatus) => {
    setOrdersList(ordersList.map(o => o.orderId === orderId ? { ...o, status: nextStatus } : o));
    setActiveNotification(`📦 Order #${orderId} has been updated to "${nextStatus}".`);
  };

  // --- CUSTOMER PORTAL ACTION HANDLERS ---
  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    localStorage.setItem('isLoggedIn', 'true');
    if (userData) {
      const complexProfile = { ...userProfile, ...userData };
      setUserProfile(complexProfile);
      localStorage.setItem('userProfile', JSON.stringify(complexProfile));
      
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
    setActiveNotification("👋 Logged out successfully. See you soon!");
  };

  const handleCancelOrder = (orderId) => {
    setOrdersList(prev => prev.filter(order => order.orderId !== orderId));
    setActiveNotification(`🚫 Order #${orderId} has been successfully canceled.`);
  };

  const moveWishlistToCart = (product) => {
    addToCart(product, product.size?.[0] || "M");
    setWishlist(prev => prev.filter(item => item.id !== product.id));
    setIsCartOpen(true);
    setActiveNotification(`🚀 Transferred "${product.name}" straight from your Wishlist into the Bag!`);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim().length > 1) {
      const filteredMatches = productsList.filter(p =>
        p.name.toLowerCase().includes(val.toLowerCase()) || p.category.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filteredMatches);
    } else {
      setSuggestions([]);
    }
  };

  const trackProductViewingHistory = (productId) => {
    setBrowsingHistory(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 4);
    });
  };

  const addToCart = (product, selectedSize = "M") => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id && item.size === selectedSize);
      if (existingItem) {
        return prevCart.map(item => (item.id === product.id && item.size === selectedSize) ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevCart, { ...product, quantity: 1, size: selectedSize }];
    });
    setActiveNotification(`🛒 Added to Bag: ${product.name} is waiting.`);
  };

  const updateCartQuantity = (productId, size, change) => {
    setCart(prev => prev.map(item => (item.id === productId && item.size === size) ? { ...item, quantity: item.quantity + change } : item).filter(item => item.quantity > 0));
  };

  const removeFromCart = (productId, size) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.size === size)));
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find(item => item.id !== product.id);
      if (exists) {
        setActiveNotification(`Removed style from bookmarks.`);
        return prev.filter(item => item.id !== product.id);
      } else {
        setActiveNotification(`❤️ Added style to your Wishlist portfolio.`);
        return [...prev, product];
      }
    });
  };

  // --- FINANCIAL CALCULATOR ENGINE ---
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 1500 || subtotal === 0 ? 0 : 99;
  const grandTotal = subtotal - appliedDiscount + deliveryFee;

  const applyPromoCoupon = () => {
    const code = coupon.toUpperCase();
    if (code === 'FIRST50') {
      setAppliedDiscount(Math.floor(subtotal * 0.5));
      alert("Success: 50% Welcome Voucher applied!");
    } else if (code === 'FASHION20') {
      setAppliedDiscount(Math.floor(subtotal * 0.2));
      alert("Success: 20% Seasonal Discount applied!");
    } else {
      alert("Coupon invalid. Try FIRST50 or FASHION20");
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Empty Cart Bag!");

    const newOrderObj = {
      orderId: Math.floor(100000 + Math.random() * 900000),
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      grandTotal,
      status: "Processing",
      shippingAddress: address || "402, Sapphire Block, Bangalore",
      contactPhone: phone || "9876543210"
    };

    setOrdersList([newOrderObj, ...ordersList]);
    setOrderPlaced(true);
    setCart([]);
    setAppliedDiscount(0);
    setActiveNotification(`📦 Order #${newOrderObj.orderId} Placed! Tracking is now live.`);
  };

  return (
    <Router>
      <div style={{ transition: 'background-color 0.3s ease, color 0.3s ease', minHeight: '100vh' }}>
        
        {/* GLOBAL HOVER INTERACTION AND SHIMMER INJECTOR STYLE SHEET */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
          
          body {
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            letter-spacing: -0.2px;
          }

          .product-card {
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.05) !important;
            border-radius: 12px !important;
            overflow: hidden;
            position: relative;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02) !important;
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }

          .product-card:hover {
            transform: translateY(-8px) scale(1.01) !important;
            box-shadow: 0 20px 30px rgba(0, 0, 0, 0.08) !important;
            border-color: rgba(0,0,0,0.1) !important;
          }

          .zoom-image {
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .product-card:hover .zoom-image {
            transform: scale(1.06) !important;
          }

          button, input, select, textarea {
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          }

          button:active {
            transform: scale(0.97);
          }

          nav {
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            background: rgba(17, 17, 17, 0.95) !important;
          }

          @media (max-width: 768px) {
            nav {
              padding: 10px 4% !important;
              flex-direction: column;
              gap: 10px;
            }
            nav div:nth-child(2) {
              width: 100% !important;
              order: 3;
            }
            nav div:nth-child(3) {
              width: 100%;
              justify-content: space-between;
              gap: 10px !important;
            }
            .product-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 12px !important;
            }
            .product-card {
              border-radius: 8px !important;
            }
          }

          @keyframes skeletonShimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          .skeleton-unit {
            background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 50%, #f2f2f2 75%);
            background-size: 200% 100%;
            animation: skeletonShimmer 1.5s infinite linear;
          }
        `}</style>

        {/* TOP STATUS NOTIFICATION BANNER CONTAINER */}
        {activeNotification && (
          <div style={{ background: '#d4af37', color: '#111', padding: '8px 6%', fontSize: '0.8rem', fontWeight: '700', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1100 }}>
            <span>🔔 {activeNotification}</span>
            <button onClick={() => setActiveNotification('')} style={{ background: 'none', border: 'none', color: '#111', cursor: 'pointer', fontWeight: '700' }}>✕</button>
          </div>
        )}

        {/* MODERN STICKY NAVIGATION BAR */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 6%', background: darkMode ? '#1f1f1f' : '#111', color: '#fff', alignItems: 'center', position: 'sticky', top: 0, zIndex: 900, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderBottom: darkMode ? '1px solid #333' : 'none' }}>
          <Link to="/" style={{ fontSize: '1.4rem', fontWeight: '900', color: '#fff', textDecoration: 'none', letterSpacing: '1px' }}>FASHIONHUB</Link>
          
          {/* SEARCH FIELD INTEGRATION MAP */}
          <div style={{ position: 'relative', width: '35%', minWidth: '240px' }}>
            <div style={{ display: 'flex', background: '#222', borderRadius: '4px', overflow: 'hidden', border: '1px solid #333' }}>
              <input type="text" placeholder="Search elite marketplace brands..." value={searchQuery} onChange={handleSearchChange} style={{ border: 'none', background: 'transparent', color: '#fff', padding: '10px 14px', width: '100%', fontSize: '0.85rem', outline: 'none' }} />
            </div>
            {suggestions.length > 0 && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: darkMode ? '#1f1f1f' : '#fff', color: darkMode ? '#fff' : '#111', borderRadius: '0 0 6px 6px', boxShadow: '0 8px 20px rgba(0,0,0,0.2)', zIndex: 999, maxHeight: '250px', overflowY: 'auto' }}>
                {suggestions.map(p => (
                  <Link key={p.id} to={`/product/${p.id}`} onClick={() => setSearchQuery('') || setSuggestions([])} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 15px', textDecoration: 'none', color: 'inherit', borderBottom: darkMode ? '1px solid #333' : '1px solid #eee' }}>
                    <img src={p.img} alt="" style={{ width: '30px', height: '35px', objectFit: 'cover' }} />
                    <span style={{ fontSize: '0.85rem' }}>{p.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* ACTION NAVIGATION ACTIONS LINK BLOCK */}
          <div style={{ display: 'flex', gap: '22px', alignItems: 'center' }}>
            <Link to="/category/men" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>Men</Link>
            <Link to="/category/women" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>Women</Link>
            <Link to="/category/kids" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>Kids</Link>
            <Link to="/category/accessories" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>Accessories</Link>
            
            {isAdminMode && (
              <Link to="/admin" style={{ color: '#ff4d4d', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem' }}>🛡️ Admin Panel</Link>
            )}
            
            <button onClick={() => setDarkMode(!darkMode)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.1rem', padding: 0 }}>
              {darkMode ? '☀️' : '🌙'}
            </button>
            
            {/* MODERN USER PROFILE NAVIGATION TRIGGER HUB */}
            <Link to={isAuthenticated ? "/profile" : "/login"} style={{ textDecoration: 'none', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              {isAuthenticated ? (
                <div style={{ width: '28px', height: '28px', background: '#d4af37', color: '#111', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '800' }}>
                  {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
                </div>
              ) : (
                <div style={{ fontSize: '1.2rem', lineHeight: 1 }}>👤</div>
              )}
              <span style={{ fontSize: '0.7rem', fontWeight: '600', color: '#aaa' }}>
                {isAuthenticated ? "Profile" : "Login"}
              </span>
            </Link>

            {isAuthenticated && (
              <Link to="/orders" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9rem' }}>Orders</Link>
            )}

            <button onClick={() => { setIsCartOpen(true); setOrderPlaced(false); }} style={{ background: '#d4af37', color: '#111', border: 'none', padding: '8px 14px', borderRadius: '4px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>🛍️ Bag</span>
              <span style={{ background: '#111', color: '#fff', padding: '1px 6px', borderRadius: '10px', fontSize: '0.75rem' }}>{cart.reduce((a,b)=>a+b.quantity, 0)}</span>
            </button>
          </div>
        </nav>

        {/* SYSTEM WORKSPACE DECK COMPONENT SWITCH MATRICES */}
        <Routes>
          <Route path="/" element={<Homepage products={productsList} toggleWishlist={toggleWishlist} wishlist={wishlist} browsingHistory={browsingHistory} />} />
          <Route path="/category/:type" element={<Category products={productsList} toggleWishlist={toggleWishlist} wishlist={wishlist} />} />
          <Route path="/product/:id" element={<ProductDetail products={productsList} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} trackHistory={trackProductViewingHistory} />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/orders" element={<Orders ordersList={ordersList} onCancelOrder={handleCancelOrder} />} />
          <Route path="/profile" element={<Profile profile={userProfile} wishlist={wishlist} onLogout={handleLogout} moveWishlistToCart={moveWishlistToCart} />} />
          <Route path="/admin" element={isAdminMode ? <AdminDashboard products={productsList} orders={ordersList} onAddProduct={handleAddProduct} onUpdateProduct={handleUpdateProduct} onDeleteProduct={handleDeleteProduct} onUpdateStatus={handleUpdateOrderStatus} /> : <Navigate to="/" />} />
        </Routes>

        {/* INTERACTIVE CART BAG SLIDEOUT LAYOUT FRAMEWORK */}
        {isCartOpen && (
          <div style={{ position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: '420px', height: '100vh', background: darkMode ? '#1f1f1f' : '#fff', color: darkMode ? '#fff' : '#111', boxShadow: '-5px 0 25px rgba(0,0,0,0.25)', zIndex: 1000, padding: '25px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Your Secure Cart Bag</h3>
              <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: 'inherit' }}>✕</button>
            </div>

            {orderPlaced ? (
              <div style={{ textAlign: 'center', margin: 'auto 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🎉</div>
                <h4 style={{ color: '#27ae60', fontWeight: '700' }}>Order Successfully Verified!</h4>
                <p style={{ fontSize: '0.85rem', color: '#666', margin: '10px 0 20px' }}>Your shipping route schedules have synchronized with local deployment delivery vehicles.</p>
                <button onClick={() => setIsCartOpen(false)} style={{ background: '#111', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Close Window</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                <div style={{ flex: 1, overflowY: 'auto' }}>
                  {cart.length === 0 ? <p style={{ color: '#888', textAlign: 'center', marginTop: '40px' }}>Your shopping bag is completely empty.</p> : cart.map(item => (
                    <div key={`${item.id}-${item.size}`} style={{ display: 'flex', gap: '12px', padding: '10px 0', borderBottom: '1px dashed #eee' }}>
                      <img src={item.img} alt="" style={{ width: '55px', height: '65px', objectFit: 'cover', borderRadius: '4px' }} />
                      <div style={{ flex: 1 }}>
                        <h5 style={{ fontSize: '0.85rem', fontWeight: '600', margin: 0 }}>{item.name}</h5>
                        <p style={{ fontSize: '0.75rem', color: '#666', margin: '3px 0' }}>Size Variant: {item.size}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                          <div style={{ display: 'flex', border: '1px solid #ddd', borderRadius: '4px' }}>
                            <button onClick={() => updateCartQuantity(item.id, item.size, -1)} style={{ background: '#f5f5f5', border: 'none', padding: '2px 8px', color: '#111' }}>-</button>
                            <span style={{ padding: '0 8px', fontSize: '0.85rem' }}>{item.quantity}</span>
                            <button onClick={() => updateCartQuantity(item.id, item.size, 1)} style={{ background: '#f5f5f5', border: 'none', padding: '2px 8px', color: '#111' }}>+</button>
                          </div>
                          <span style={{ fontSize: '0.9rem', fontWeight: '700' }}>₹{item.price * item.quantity}</span>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id, item.size)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}>🗑️</button>
                    </div>
                  ))}
                </div>

                {cart.length > 0 && (
                  <div style={{ borderTop: '2px solid #111', paddingTop: '10px' }}>
                    <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                      <input type="text" placeholder="Promo Voucher Code" value={coupon} onChange={(e)=>setCoupon(e.target.value)} style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.8rem' }} />
                      <button onClick={applyPromoCoupon} style={{ background: '#333', color: '#fff', border: 'none', padding: '0 12px', borderRadius: '4px', cursor: 'pointer' }}>Apply</button>
                    </div>
                    <div style={{ fontSize: '0.85rem', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subtotal Bag Cost:</span><span>₹{subtotal}</span></div>
                      {appliedDiscount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', color: '#27ae60' }}><span>Coupon Deduction:</span><span>-₹{appliedDiscount}</span></div>}
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Logistics Cargo Delivery:</span><span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1rem', marginTop: '5px' }}><span>Grand Checkout Total:</span><span>₹{grandTotal}</span></div>
                    </div>
                    <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <input type="text" placeholder="Complete Dropoff Address" value={address} onChange={(e)=>setAddress(e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '0.8rem' }} required />
                      <input type="tel" placeholder="Primary Telephone Handset Number" value={phone} onChange={(e)=>setPhone(e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '0.8rem' }} required />
                      <select value={paymentType} onChange={(e)=>setPaymentType(e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', background: '#fff', color: '#111', fontSize: '0.8rem' }}>
                        <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
                        <option value="UPI Gateway Engine">Secure UPI Handshake Interface</option>
                      </select>
                      <button type="submit" style={{ width: '100%', background: '#d4af37', color: '#111', border: 'none', padding: '12px', fontWeight: '700', borderRadius: '4px', cursor: 'pointer', textTransform: 'uppercase' }}>Confirm Order Hand-off</button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Router>
  );
}

export default Application;