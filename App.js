import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";

const foods = [
  {
    id: 1,
    name: "कुमाऊँनी थाली",
    price: 199,
    emoji: "🍛",
    desc: "पहाड़ी स्वाद वाली पूरी थाली",
  },
  {
    id: 2,
    name: "आलू के गुटके",
    price: 99,
    emoji: "🥔",
    desc: "कुमाऊँ का प्रसिद्ध पहाड़ी स्वाद",
  },
  {
    id: 3,
    name: "भट्ट की चुड़कानी",
    price: 149,
    emoji: "🍲",
    desc: "पारंपरिक कुमाऊँनी व्यंजन",
  },
  {
    id: 4,
    name: "मंडुवे की रोटी",
    price: 79,
    emoji: "🫓",
    desc: "स्वादिष्ट और पारंपरिक पहाड़ी रोटी",
  },
  {
    id: 5,
    name: "झंगोरे की खीर",
    price: 99,
    emoji: "🍚",
    desc: "पारंपरिक पहाड़ी मिठाई",
  },
];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const addToCart = (food) => {
    setCart([...cart, food]);
    Alert.alert("सफलता", `${food.name} कार्ट में जोड़ दिया गया`);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = () => {
    if (!name || !phone || !address) {
      Alert.alert("जानकारी पूरी करें", "नाम, मोबाइल नंबर और पता भरें।");
      return;
    }

    setScreen("success");
  };

  if (screen === "order") {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setScreen("home")}>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>आपका ऑर्डर</Text>
          <Text style={styles.cartIcon}>🛒 {cart.length}</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.sectionTitle}>चुने गए आइटम</Text>

          {cart.length === 0 ? (
            <Text style={styles.empty}>अभी कोई आइटम नहीं चुना गया।</Text>
          ) : (
            cart.map((item, index) => (
              <View style={styles.cartItem} key={index}>
                <Text style={styles.foodEmoji}>{item.emoji}</Text>

                <View style={{ flex: 1 }}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.price}>₹{item.price}</Text>
                </View>
              </View>
            ))
          )}

          <View style={styles.totalRow}>
            <Text style={styles.totalText}>कुल राशि</Text>
            <Text style={styles.totalText}>₹{total}</Text>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.sectionTitle}>डिलीवरी जानकारी</Text>

          <TextInput
            style={styles.input}
            placeholder="आपका नाम"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="मोबाइल नंबर"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <TextInput
            style={[styles.input, styles.address]}
            placeholder="पूरा डिलीवरी पता"
            multiline
            value={address}
            onChangeText={setAddress}
          />

          <TouchableOpacity
            style={styles.orderButton}
            onPress={placeOrder}
          >
            <Text style={styles.orderButtonText}>
              ऑर्डर प्लेस करें • ₹{total}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  if (screen === "success") {
    return (
      <View style={styles.successScreen}>
        <Text style={styles.successEmoji}>🎉</Text>

        <Text style={styles.successTitle}>
          ऑर्डर सफलतापूर्वक हो गया!
        </Text>

        <Text style={styles.successText}>
          धन्यवाद {name}! आपका Kumaoni Jayka ऑर्डर जल्द ही तैयार किया जाएगा।
        </Text>

        <Text style={styles.orderAmount}>
          कुल राशि: ₹{total}
        </Text>

        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => {
            setCart([]);
            setScreen("home");
          }}
        >
          <Text style={styles.orderButtonText}>
            वापस Home पर जाएँ
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.logo}>🏔️</Text>

        <Text style={styles.appName}>Kumaoni Jayka</Text>

        <Text style={styles.tagline}>
          असली पहाड़ी स्वाद, आपके घर तक ❤️
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>आज क्या खाना पसंद करेंगे?</Text>

        {foods.map((food) => (
          <View style={styles.foodCard} key={food.id}>
            <Text style={styles.bigEmoji}>{food.emoji}</Text>

            <View style={{ flex: 1 }}>
              <Text style={styles.foodName}>{food.name}</Text>

              <Text style={styles.description}>
                {food.desc}
              </Text>

              <Text style={styles.foodPrice}>
                ₹{food.price}
              </Text>
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
          style={styles.mainOrderButton}
          onPress={() => setScreen("order")}
        >
          <Text style={styles.mainOrderText}>
            🛒 Order Now
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F0",
  },

  hero: {
    backgroundColor: "#7A3E12",
    paddingTop: 55,
    paddingBottom: 30,
    alignItems: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  logo: {
    fontSize: 55,
  },

  appName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 5,
  },

  tagline: {
    color: "#FFE6C7",
    fontSize: 15,
    marginTop: 7,
  },

  content: {
    padding: 16,
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4A260F",
    marginBottom: 15,
  },

  foodCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    marginBottom: 13,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },

  bigEmoji: {
    fontSize: 42,
    marginRight: 12,
  },

  foodName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A260F",
  },

  description: {
    color: "#777",
    fontSize: 12,
    marginTop: 4,
  },

  foodPrice: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#D35400",
    marginTop: 7,
  },

  addButton: {
    backgroundColor: "#7A3E12",
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 10,
  },

  addText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  mainOrderButton: {
    backgroundColor: "#D35400",
    padding: 17,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },

  mainOrderText: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
  },

  header: {
    backgroundColor: "#7A3E12",
    paddingTop: 50,
    paddingBottom: 18,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  back: {
    color: "#FFFFFF",
    fontSize: 30,
