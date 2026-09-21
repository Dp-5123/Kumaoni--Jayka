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
  { id: 1, name: "भट्ट की चुरकानी", price: 120, emoji: "🍛" },
  { id: 2, name: "आलू के गुटके", price: 80, emoji: "🥔" },
  { id: 3, name: "झंगोरे की खीर", price: 100, emoji: "🍚" },
  { id: 4, name: "काफली", price: 110, emoji: "🥬" },
  { id: 5, name: "मंडुवे की रोटी", price: 60, emoji: "🫓" },
  { id: 6, name: "कुमाऊनी थाली", price: 220, emoji: "🍱" },
];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");

  const addToCart = (food) => {
    setCart([...cart, food]);
    Alert.alert("जोड़ दिया गया", `${food.name} कार्ट में जोड़ दिया गया`);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = () => {
    if (cart.length === 0) {
      Alert.alert("कार्ट खाली है", "पहले कोई खाना चुनें।");
      return;
    }

    if (!address.trim()) {
      Alert.alert("पता डालें", "कृपया डिलीवरी का पता डालें।");
      return;
    }

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
              <Text style={styles.title}>Kumaoni Jayka</Text>
              <Text style={styles.subtitle}>घर जैसा पहाड़ी स्वाद ❤️</Text>
            </View>
          </View>

          <View style={styles.banner}>
            <Text style={styles.bannerTitle}>कुमाऊँ का असली स्वाद</Text>
            <Text style={styles.bannerText}>
              स्वादिष्ट पहाड़ी खाना आपके घर तक
            </Text>
          </View>

          <Text style={styles.sectionTitle}>🍽️ आज का मेन्यू</Text>

          {foods.map((food) => (
            <View style={styles.foodCard} key={food.id}>
              <Text style={styles.foodEmoji}>{food.emoji}</Text>

              <View style={styles.foodInfo}>
                <Text style={styles.foodName}>{food.name}</Text>
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
        </ScrollView>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => setScreen("cart")}
        >
          <Text style={styles.cartText}>
            🛒 Cart ({cart.length})   ₹{total}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // CART SCREEN
  if (screen === "cart") {
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity onPress={() => setScreen("home")}>
            <Text style={styles.back}>← वापस</Text>
          </TouchableOpacity>

          <Text style={styles.pageTitle}>🛒 आपका Cart</Text>

          {cart.length === 0 ? (
            <Text style={styles.empty}>आपका cart खाली है।</Text>
          ) : (
            cart.map((item, index) => (
              <View style={styles.cartItem} key={index}>
                <Text style={styles.foodEmoji}>{item.emoji}</Text>

                <View style={{ flex: 1 }}>
                  <Text style={styles.foodName}>{item.name}</Text>
                  <Text style={styles.price}>₹{item.price}</Text>
                </View>

                <TouchableOpacity
                  onPress={() => removeFromCart(index)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeText}>हटाएँ</Text>
                </TouchableOpacity>
              </View>
            ))
          )}

          {cart.length > 0 && (
            <>
              <View style={styles.totalBox}>
                <Text style={styles.totalLabel}>कुल राशि</Text>
                <Text style={styles.total}>₹{total}</Text>
              </View>

              <TouchableOpacity
                style={styles.orderButton}
                onPress={() => setScreen("address")}
              >
                <Text style={styles.orderText}>आगे बढ़ें →</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </View>
    );
  }

  // ADDRESS SCREEN
  if (screen === "address") {
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity onPress={() => setScreen("cart")}>
            <Text style={styles.back}>← Cart</Text>
          </TouchableOpacity>

          <Text style={styles.pageTitle}>📍 Delivery Address</Text>

          <Text style={styles.inputLabel}>अपना पूरा पता डालें</Text>

          <TextInput
            style={styles.input}
            placeholder="घर नंबर, मोहल्ला, शहर..."
            multiline
            value={address}
            onChangeText={setAddress}
          />

          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            <Text style={styles.summaryText}>
              Items: {cart.length}
            </Text>
            <Text style={styles.summaryText}>
              Total: ₹{total}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.orderButton}
            onPress={placeOrder}
          >
            <Text style={styles.orderText}>🍽️ Order Now</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // SUCCESS SCREEN
  if (screen === "success") {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successEmoji}>🎉</Text>

        <Text style={styles.successTitle}>Order Confirmed!</Text>

        <Text style={styles.successText}>
          आपका Kumaoni Jayka order successfully place हो गया है।
        </Text>

        <Text style={styles.successAmount}>
          कुल राशि: ₹{total}
        </Text>

        <Text style={styles.addressText}>
          📍 {address}
        </Text>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => {
            setCart([]);
            setAddress("");
            setScreen("home");
          }}
        >
          <Text style={styles.orderText}>🏠 Home पर जाएँ</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8EF",
    padding: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
    marginBottom: 20,
  },

  logo: {
    fontSize: 45,
    marginRight: 12,
  },

  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#7B341E",
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
  },

  banner: {
    backgroundColor: "#8B4513",
    borderRadius: 18,
    padding: 22,
    marginBottom: 20,
  },

  bannerTitle: {
    color: "white",
    fontSize: 23,
    fontWeight: "bold",
  },

  bannerText: {
    color: "#FFE8C8",
    fontSize: 15,
    marginTop: 7,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#4A2C20",
    marginBottom: 12,
  },

  foodCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 13,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },

  foodEmoji: {
    fontSize: 42,
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

  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#B45309",
    marginTop: 5,
  },

  addButton: {
    backgroundColor: "#16A34A",
    paddingVertical: 9,
    paddingHorizontal: 13,
    borderRadius: 10,
  },

  addText: {
    color: "white",
    fontWeight: "bold",
  },

  cartButton: {
    backgroundColor: "#7B341E",
    padding: 16,
    borderRadius: 15,
    marginTop: 8,
    marginBottom: 5,
  },

  cartText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  back: {
    fontSize: 18,
    color: "#7B341E",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 15,
  },

  pageTitle: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#4A2C20",
    marginBottom: 20,
  },

  empty: {
    textAlign: "center",
    fontSize: 18,
    color: "#777",
    marginTop: 50,
  },

  cartItem: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  removeButton: {
    backgroundColor: "#FEE2E2",
    padding: 8,
    borderRadius: 8,
  },

  removeText: {
    color: "#DC2626",
    fontWeight: "bold",
  },

  totalBox: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 15,
  },

  totalLabel: {
    fontSize: 17,
    color: "#555",
  },

  total: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#7B341E",
    marginTop: 5,
  },

  orderButton: {
    backgroundColor: "#16A34A",
    padding: 17,
    borderRadius: 14,
    marginTop: 15,
  },

  orderText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  inputLabel: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 14,
    padding: 15,
    height: 120,
    textAlignVertical: "top",
    fontSize: 16,
  },

  summary: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 15,
    marginTop: 20,
  },

  summaryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  summaryText: {
    fontSize: 16,
    marginTop: 5,
  },

  successContainer: {
    flex: 1,
    backgroundColor: "#FFF8EF",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },

  successEmoji: {
    fontSize: 70,
  },

  successTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#16A34A",
    marginTop: 15,
  },

  successText: {
    textAlign: "center",
    fontSize: 17,
    color: "#555",
    marginTop: 15,
    lineHeight: 25,
  },

  successAmount: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#7B341E",
    marginTop: 20,
  },

  addressText: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginTop: 12,
  },

  homeButton: {
    backgroundColor: "#7B341E",
    padding: 16,
    borderRadius: 14,
    width: "100%",
    marginTop: 30,
  },
});
