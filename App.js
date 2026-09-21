import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";

const foods = [
  {
    id: 1,
    name: "कुमाऊँनी थाली",
    price: 199,
    emoji: "🍛",
    desc: "भट्ट की दाल, आलू के गुटके, रायता और पहाड़ी स्वाद",
  },
  {
    id: 2,
    name: "आलू के गुटके",
    price: 99,
    emoji: "🥔",
    desc: "पारंपरिक कुमाऊँनी मसालों के साथ",
  },
  {
    id: 3,
    name: "भट्ट की चुरकानी",
    price: 129,
    emoji: "🍲",
    desc: "स्वादिष्ट पारंपरिक पहाड़ी व्यंजन",
  },
  {
    id: 4,
    name: "झंगोरे की खीर",
    price: 89,
    emoji: "🍚",
    desc: "पहाड़ की पारंपरिक मीठी खीर",
  },
  {
    id: 5,
    name: "मंडुवे की रोटी",
    price: 49,
    emoji: "🫓",
    desc: "स्वास्थ्यवर्धक मंडुवे के आटे की रोटी",
  },
  {
    id: 6,
    name: "सिंगल थाली",
    price: 149,
    emoji: "🍱",
    desc: "एक व्यक्ति के लिए स्वादिष्ट पहाड़ी भोजन",
  },
];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderId, setOrderId] = useState("");

  const addToCart = (food) => {
    setCart([...cart, food]);
    Alert.alert("जोड़ दिया गया", `${food.name} कार्ट में जोड़ दिया गया है।`);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      Alert.alert(
        "जानकारी अधूरी है",
        "कृपया नाम, मोबाइल नंबर और डिलीवरी पता भरें।"
      );
      return;
    }

    if (phone.length < 10) {
      Alert.alert("मोबाइल नंबर", "कृपया सही 10 अंकों का मोबाइल नंबर डालें।");
      return;
    }

    if (cart.length === 0) {
      Alert.alert("Cart खाली है", "पहले कोई खाना चुनें।");
      return;
    }

    const id = "KJ" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(id);
    setScreen("success");
  };

  const Home = () => (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🏔️</Text>
        <View>
          <Text style={styles.appName}>Kumaoni Jayka</Text>
          <Text style={styles.tagline}>पहाड़ का स्वाद, आपके घर तक ❤️</Text>
        </View>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerEmoji}>🍛</Text>
        <Text style={styles.bannerTitle}>असली कुमाऊँनी स्वाद</Text>
        <Text style={styles.bannerText}>
          घर जैसा पहाड़ी खाना अब आपके घर तक
        </Text>
      </View>

      <Text style={styles.sectionTitle}>🍽️ आज का मेन्यू</Text>

      {foods.map((food) => (
        <View style={styles.foodCard} key={food.id}>
          <Text style={styles.foodEmoji}>{food.emoji}</Text>

          <View style={styles.foodInfo}>
            <Text style={styles.foodName}>{food.name}</Text>
            <Text style={styles.foodDesc}>{food.desc}</Text>
            <Text style={styles.price}>₹{food.price}</Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addToCart(food)}
          >
            <Text style={styles.addText}>+ Add</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => setScreen("cart")}
      >
        <Text style={styles.cartButtonText}>
          🛒 Cart ({cart.length}) • ₹{total}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const Cart = () => (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setScreen("home")}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>आपका Cart</Text>
      </View>

      {cart.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyTitle}>Cart खाली है</Text>
          <Text style={styles.emptyText}>कुछ स्वादिष्ट खाना चुनिए।</Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => setScreen("home")}
          >
            <Text style={styles.primaryButtonText}>मेन्यू देखें</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView>
          {cart.map((item, index) => (
            <View style={styles.cartItem} key={index}>
              <Text style={styles.cartEmoji}>{item.emoji
