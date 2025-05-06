interface ColorInfo {
  hex: string;
  name?: string;
  id?: string;
}

export interface Palette {
  id: string;
  title: string;
  brand: string;
  image: string;
  colors: ColorInfo[];
  type: 'interior' | 'exterior';
}

export const palettes: Palette[] = [
  {
    id: "timeless-whites",
    title: "Timeless Whites",
    brand: "Sherwin-Williams",
    image: "https://apdhkbyusjmuyyjdvwbb.supabase.co/storage/v1/object/public/assets/images/timeless-whites.webp",
    colors: [
      { hex: "#DEDACD", name: "Oat Milk", id: "SW9501" },
      { hex: "#E4DECF", name: "Arrowroote", id: "SW9502" },
      { hex: "#F6F2E8", name: "Cheviot", id: "SW9503" },
      { hex: "#EFECE3", name: "Cold Foam", id: "SW9504" },
      { hex: "#F6F0E5", name: "Frost Bite", id: "SW9505" }
    ],
    type: "interior"
  },
  {
    id: "warm-welcoming",
    title: "Warm & Welcoming",
    brand: "Sherwin-Williams",
    image: "https://apdhkbyusjmuyyjdvwbb.supabase.co/storage/v1/object/public/assets/images/warm-welcoming.webp",
    colors: [
      { hex: "#E3DBCD", name: "White Sesame", id: "SW9586" },
      { hex: "#D0C7B7", name: "Mushroom", id: "SW9587" },
      { hex: "#C8C0B3", name: "High Sierra", id: "SW9588" },
      { hex: "#DBD5CB", name: "Limewash", id: "SW9589" },
      { hex: "#DAD2C6", name: "Taupe of the Morning", id: "SW9590" }
    ],
    type: "interior"
  },
  {
    id: "pottery-barn",
    title: "Pottery Barn",
    brand: "Sherwin-Williams",
    image: "https://apdhkbyusjmuyyjdvwbb.supabase.co/storage/v1/object/public/assets/images/pottery-barn.webp",
    colors: [
      { hex: "#E1D9C6", name: "Warm Winter", id: "SW9506" },
      { hex: "#DDCFB9", name: "Cream and Sugar", id: "SW9507" },
      { hex: "#D7C9AE", name: "Natural Wool", id: "SW9508" },
      { hex: "#E0D4BD", name: "Steamed Chai", id: "SW9509" },
      { hex: "#C4B9A3", name: "Peace of Mind", id: "SW9510" }
    ],
    type: "interior"
  },
  {
    id: "west-elm",
    title: "West Elm",
    brand: "Sherwin-Williams",
    image: "https://apdhkbyusjmuyyjdvwbb.supabase.co/storage/v1/object/public/assets/images/west-elm.webp",
    colors: [
      { hex: "#D8CFBA", name: "Warm Oats", id: "SW9511" },
      { hex: "#CEC2AA", name: "Threaded Loom", id: "SW9512" },
      { hex: "#B5A78D", name: "Sleepy Owlet", id: "SW9513" },
      { hex: "#8C8373", name: "Zinc Luster", id: "SW9514" },
      { hex: "#584E41", name: "Tungsten", id: "SW9515" }
    ],
    type: "interior"
  },
  {
    id: "2024-blues-greens",
    title: "2024 Blues & Greens",
    brand: "Sherwin-Williams",
    image: "https://apdhkbyusjmuyyjdvwbb.supabase.co/storage/v1/object/public/assets/images/2024-blues-greens.webp",
    colors: [
      { hex: "#DCE2DF", name: "Mantra", id: "SW9631" },
      { hex: "#CED7D5", name: "Serenely", id: "SW9632" },
      { hex: "#B6C3C4", name: "Silver Lake", id: "SW9633" },
      { hex: "#82979B", name: "Morning at Sea", id: "SW9634" },
      { hex: "#60757A", name: "Stargazer", id: "SW9635" }
    ],
    type: "interior"
  },
  {
    id: "2024-deeps-darks",
    title: "2024 Deeps & Darks",
    brand: "Sherwin-Williams",
    image: "https://apdhkbyusjmuyyjdvwbb.supabase.co/storage/v1/object/public/assets/images/2024-deeps-darks.webp",
    colors: [
      { hex: "#D5D8D7", name: "Windchill", id: "SW9636" },
      { hex: "#B0B7B7", name: "Mineral", id: "SW9637" },
      { hex: "#A2A8A6", name: "Breakwater", id: "SW9638" },
      { hex: "#536168", name: "Rain Cloud", id: "SW9639" },
      { hex: "#434A54", name: "Sea Mariner", id: "SW9640" }
    ],
    type: "interior"
  },
  {
    id: "2024-delicate-tints",
    title: "2024 Delicate Tints",
    brand: "Sherwin-Williams",
    image: "https://apdhkbyusjmuyyjdvwbb.supabase.co/storage/v1/object/public/assets/images/2024-delicate-tints.webp",
    colors: [
      { hex: "#D4DCDC", name: "Dew Drop", id: "SW9641" },
      { hex: "#BFC2BF", name: "Silver Tipped Sage", id: "SW9642" },
      { hex: "#A3AFAC", name: "Eventide", id: "SW9643" },
      { hex: "#768482", name: "Portsmouth", id: "SW9644" },
      { hex: "#41494B", name: "Big Dipper", id: "SW9645" }
    ],
    type: "interior"
  },
  {
    id: "2024-reds-purples",
    title: "2024 Reds & Purples",
    brand: "Sherwin-Williams",
    image: "https://apdhkbyusjmuyyjdvwbb.supabase.co/storage/v1/object/public/assets/images/2024-reds-purples.webp",
    colors: [
      { hex: "#C9CABF", name: "Create", id: "SW9646" },
      { hex: "#BCBCAE", name: "Soft Sage", id: "SW9647" },
      { hex: "#A7A796", name: "Frosted Fern", id: "SW9648" },
      { hex: "#85877B", name: "Willowleaf", id: "SW9649" },
      { hex: "#616C64", name: "Succulent", id: "SW9650" }
    ],
    type: "interior"
  },
  {
    id: "traditional",
    title: "Traditional",
    brand: "Sherwin-Williams",
    image: "https://apdhkbyusjmuyyjdvwbb.supabase.co/storage/v1/object/public/assets/images/traditional.webp",
    colors: [
      { hex: "#EDE6DA", name: "Dover White", id: "SW6385" },
      { hex: "#C0B7A4", name: "Gateway Gray", id: "SW7644" },
      { hex: "#4D6B6F", name: "Mediterranean", id: "SW7617" }
    ],
    type: "exterior"
  },
  {
    id: "modern",
    title: "Modern",
    brand: "Sherwin-Williams",
    image: "https://apdhkbyusjmuyyjdvwbb.supabase.co/storage/v1/object/public/assets/images/modern.webp",
    colors: [
      { hex: "#9CA3A6", name: "Uncertain Gray", id: "SW6234" },
      { hex: "#C4C9CD", name: "Evening Shadow", id: "SW7662" },
      { hex: "#555658", name: "Peppercorn", id: "SW7674" }
    ],
    type: "exterior"
  },
  {
    id: "craftsman",
    title: "Craftsman",
    brand: "Sherwin-Williams",
    image: "https://apdhkbyusjmuyyjdvwbb.supabase.co/storage/v1/object/public/assets/images/craftsman.webp",
    colors: [
      { hex: "#CB8A42", name: "Eastlake Gold", id: "SW6686" },
      { hex: "#E8D8BE", name: "Classical White", id: "SW2829" },
      { hex: "#A89B89", name: "Curio Gray", id: "SW7666" }
    ],
    type: "exterior"
  },
  {
    id: "coastal",
    title: "Coastal",
    brand: "Sherwin-Williams",
    image: "https://apdhkbyusjmuyyjdvwbb.supabase.co/storage/v1/object/public/assets/images/coastal.webp",
    colors: [
      { hex: "#958967", name: "Renwick Olive", id: "SW2815" },
      { hex: "#E5D4B4", name: "Roycroft Vellum", id: "SW2833" },
      { hex: "#826B6C", name: "Renwick Heather", id: "SW2818" }
    ],
    type: "exterior"
  },
  {
    id: "spanish",
    title: "Spanish",
    brand: "Sherwin-Williams",
    image: "https://apdhkbyusjmuyyjdvwbb.supabase.co/storage/v1/object/public/assets/images/spanish.webp",
    colors: [
      { hex: "#E9DCC6", name: "Netsuke", id: "SW6194" },
      { hex: "#908C75", name: "Connected Gray", id: "SW6165" },
      { hex: "#763F3F", name: "Fiery Brown", id: "SW6055" }
    ],
    type: "exterior"
  },
  {
    id: "beach",
    title: "Beach",
    brand: "Sherwin-Williams",
    image: "https://apdhkbyusjmuyyjdvwbb.supabase.co/storage/v1/object/public/assets/images/beach.webp",
    colors: [
      { hex: "#F5EAD4", name: "Cottage Cream", id: "SW7678" },
      { hex: "#EDE6DA", name: "Dover White", id: "SW6385" },
      { hex: "#A8C2C4", name: "Distance", id: "SW6243" }
    ],
    type: "exterior"
  }
];