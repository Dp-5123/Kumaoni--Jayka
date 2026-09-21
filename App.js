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
    desc: "पहाड़ी स्वाद वाली पूरी थाली",
  },
  {
    id: 2,
    name: "आलू के गुटके",
    price: 99,
    emoji: "🥔",
    desc: "कुमाऊँ का प्रसिद्ध स्वाद",
  },
  {
    id: 3,
    name: "भट्ट की चुड़कानी",
    price: 149,
    emoji: "🍲",
    desc: "पारंपरिक पहाड़ी व्यंजन",
  },
  {
    id: 4,
    name: "मंडुवे की रोटी",
    price: 79,
    emoji: "🫓",
    desc: "स्वस्थ और स्वादिष्ट पहाड़ी रोटी",
  },
];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  const addToCart = (food) => {
    setCart((oldCart) => [...oldCart, food]);
    Alert.alert("सफलता", `${food.name} कार्ट में जोड़ दिया गया`);
  };

  const removeFromCart = (index) => {
    setCart((oldCart) => oldCart.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = () => {
    if (!name || !mobile || !address) {
      Alert.alert(
        "जानकारी पूरी करें",
        "कृपया नाम, मोबाइल नंबर और पता भरें।"
      );
      return;
    }

    if (mobile.length < 10) {
      Alert.alert("मोबाइल नंबर", "कृपया सही मोबाइल नंबर डालें।");
      return;
    }

    setCart([]);
    setScreen("success");
  };

  // HOME SCREEN
  if (screen === "home") {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.logo}>🏔️</Text>
            <View>
              <Text style={styles.appName}>Kumaoni Jayka</Text>
              <Text style={styles.tagline}>पहाड़ का असली स्वाद ❤️</Text>
            </View>

            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => setScreen("cart")}
            >
              <Text style={styles.cartText}>🛒 {cart.length}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.banner}>
            <Text style={styles.bannerTitle}>घर बैठे पाएँ पहाड़ी स्वाद</Text>
            <Text style={styles.bannerText}>
              स्वादिष्ट कुमाऊँनी खाना अब आपके घर तक
            </Text>
          </View>

          <Text style={styles.sectionTitle}>🍽️ लोकप्रिय व्यंजन</Text>

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
                <Text style={styles.addText}>ADD</Text>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            style={styles.orderNow}
            onPress={() => {
              if (cart.length === 0) {
                Alert.alert(
                  "कार्ट खाली है",
                  "पहले कोई खाना कार्ट में जोड़ें।"
                );
              } else {
                setScreen("cart");
              }
            }}
          >
            <Text style={styles.orderNowText}>🛍️ Order Now</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // CART SCREEN
  if (screen === "cart") {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => setScreen("home")}>
              <Text style={styles.back}>←</Text>
            </TouchableOpacity>

            <Text style={styles.pageTitle}>आपकी Cart</Text>
          </View>

          {cart.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyEmoji}>🛒</Text>
              <Text style={styles.emptyTitle}>Cart खाली है</Text>

              <TouchableOpacity
                style={styles.orderNow}
                onPress={() => setScreen("home")}
              >
                <Text style={styles.orderNowText}>खाना देखें</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {cart.map((item, index) => (
                <View style={styles.cartItem} key={index}>
                  <Text style={styles.foodEmoji}>{item.emoji}</Text>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.foodName}>{item.name}</Text>
                    <Text style={styles.price}>₹{item.price}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeFromCart(index)}
                  >
                    <Text style={styles.removeText}>हटाएँ</Text>
                  </TouchableOpacity>
                </View>
              ))}

              <View style={styles.totalBox}>
                <Text style={styles.totalLabel}>कुल राशि</Text>
                <Text style={styles.total}>₹{total}</Text>
              </View>

              <TouchableOpacity
                style={styles.orderNow}
                onPress={() => setScreen("checkout")}
              >
                <Text style={styles.orderNowText}>
                  आगे बढ़ें → Checkout
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </View>
    );
  }

  // CHECKOUT SCREEN
  if (screen === "checkout") {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => setScreen("cart")}>
              <Text style={styles.back}>←</Text>
            </TouchableOpacity>

            <Text style={styles.pageTitle}>Checkout</Text>
          </View>

          <Text style={styles.inputLabel}>नाम</Text>
          <TextInput
            style={styles.input}
            placeholder="अपना नाम लिखें"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.inputLabel}>मोबाइल नंबर</Text>
          <TextInput
            style={styles.input}
            placeholder="10 अंकों का मोबाइल नंबर"
            keyboardType="phone-pad"
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
          />

          <Text style={styles.inputLabel}>Delivery Address</Text>
          <TextInput
            style={[styles.input, styles.addressInput]}
            placeholder="पूरा पता लिखें"
            multiline
            value={address}
            onChangeText={setAddress}
          />

          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Order Total</Text>
            <Text style={styles.total}>₹{total}</Text>
          </View>

          <TouchableOpacity
            style={styles.orderNow}
            onPress={placeOrder}
          >
            <Text style={styles.orderNowText}>
              ✅ Order Place करें
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // SUCCESS SCREEN
  if (screen === "success") {
    return (
      <View style={styles.successScreen}>
        <Text style={styles.successEmoji}>🎉</Text>

        <Text style={styles.successTitle}>
          Order Successfully Placed!
        </Text>

        <Text style={styles.successText}>
          आपका Kumaoni Jayka order मिल गया है।
        </Text>

        <Text style={styles.successText}>
          जल्द ही आपका स्वादिष्ट खाना पहुँचाया जाएगा। ❤️
        </Text>

        <TouchableOpacity
          style={styles.orderNow}
          onPress={() => setScreen("home")}
        >
          <Text style={styles.orderNowText}>🏠 होम पर जाएँ</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf3",
    paddingTop: 45,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    backgroundColor: "#ffffff",
  },

  logo: {
    fontSize: 38,
    marginRight: 10,
  },

  appName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#176b3a",
  },

  tagline: {
    fontSize: 12,
    color: "#777",
    marginTop: 3,
  },

  cartButton: {
    marginLeft: "auto",
    backgroundColor: "#176b3a",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 20,
  },

  cartText: {
    color: "#fff",
    fontWeight: "bold",
  },

  banner: {
    margin: 15,
    padding: 22,
    borderRadius: 18,
    backgroundColor: "#e5f3df",
  },

  bannerTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#176b3a",
  },

  bannerText: {
    marginTop: 7,
    fontSize: 14,
    color: "#555",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginTop: 8,
    marginBottom: 10,
    color: "#333",
  },

  foodCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 7,
    padding: 13,
    borderRadius: 15,
    backgroundColor: "#fff",
    elevation: 3,
  },

  foodEmoji: {
    fontSize: 40,
    marginRight: 12,
  },

  foodInfo: {
    flex: 1,
  },

  foodName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
  },

  foodDesc: {
    fontSize: 12,
    color: "#777",
    marginTop: 3,
  },

  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#176b3a",
    marginTop: 5,
  },

  addButton: {
    backgroundColor: "#176b3a",
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 10,
  },

  addText: {
    color: "#fff",
    fontWeight: "bold",
  },

  orderNow: {
    backgroundColor: "#176b3a",
    margin: 18,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  orderNowText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
  },

  back: {
    fontSize: 32,
    marginRight: 15,
  },

  pageTitle: {
    fontSize: 23,
    fontWeight: "bold",
  },

  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 6,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 14,
    elevation: 2,
  },

  removeButton: {
    backgroundColor: "#ffe2e2",
    padding: 8,
    borderRadius: 8,
  },

  removeText: {
    color: "#c62828",
    fontWeight: "bold",
  },

  totalBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 18,
    padding: 18,
    backgroundColor: "#e5f3df",
    borderRadius: 14,
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },

  total: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#176b3a",
  },

  empty: {
    alignItems: "center",
    marginTop: 100,
  },

  emptyEmoji: {
    fontSize: 60,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 15,
  },

  inputLabel: {
    marginHorizontal: 18,
    marginTop: 12,
    marginBottom: 6,
    fontSize: 15,
    fontWeight: "bold",
  },

  input: {
    backgroundColor: "#fff",
    marginHorizontal: 18,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
  },

  addressInput: {
    height: 100,
    textAlignVertical: "top",
  },

  successScreen: {
    flex: 1,
    backgroundColor: "#fffaf3",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },

  successEmoji: {
    fontSize: 75,
  },

  successTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#176b3a",
    textAlign: "center",
    marginTop: 20,
  },

  successText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 12,
  },
});
