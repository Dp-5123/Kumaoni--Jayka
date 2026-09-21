import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

const foods = [
  { id: 1, name: "आलू के गुटके", price: 80, emoji: "🥔" },
  { id: 2, name: "भट्ट की चुड़कानी", price: 120, emoji: "🍲" },
  { id: 3, name: "झंगोरे की खीर", price: 100, emoji: "🍚" },
  { id: 4, name: "काफुली", price: 110, emoji: "🥬" },
  { id: 5, name: "मंडुवे की रोटी", price: 60, emoji: "🫓" },
  { id: 6, name: "सिंगल", price: 90, emoji: "🥞" },
];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const addToCart = (food) => {
    setCart([...cart, food]);
    Alert.alert("जोड़ा गया", `${food.name} कार्ट में जोड़ दिया गया`);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = () => {
    if (!name || !phone || !address) {
      Alert.alert("जानकारी पूरी करें", "नाम, मोबाइल नंबर और पता भरें।");
      return;
    }

    Alert.alert(
      "🎉 ऑर्डर सफल!",
      `धन्यवाद ${name}!\nआपका Kumaoni Jayka ऑर्डर प्राप्त हो गया है।`,
      [
        {
          text: "OK",
          onPress: () => {
            setCart([]);
            setScreen("home");
          },
        },
      ]
    );
  };

  if (screen === "cart") {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setScreen("home")}>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>🛒 आपका Cart</Text>
        </View>

        <ScrollView style={styles.content}>
          {cart.length === 0 ? (
            <Text style={styles.empty}>आपका Cart खाली है 😔</Text>
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
                <Text style={styles.totalText}>कुल राशि</Text>
                <Text style={styles.totalPrice}>₹{total}</Text>
              </View>

              <TouchableOpacity
                style={styles.orderButton}
                onPress={() => setScreen("checkout")}
              >
                <Text style={styles.orderButtonText}>Checkout करें →</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </View>
    );
  }

  if (screen === "checkout") {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setScreen("cart")}>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>📦 डिलीवरी जानकारी</Text>

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
            style={[styles.input, styles.addressInput]}
            placeholder="पूरा डिलीवरी पता"
            multiline
            value={address}
            onChangeText={setAddress}
          />

          <Text style={styles.sectionTitle}>💵 Payment</Text>

          <View style={styles.paymentBox}>
            <Text style={styles.paymentText}>
              ✓ Cash on Delivery
            </Text>
          </View>

          <View style={styles.totalBox}>
            <Text style={styles.totalText}>कुल भुगतान</Text>
            <Text style={styles.totalPrice}>₹{total}</Text>
          </View>

          <TouchableOpacity
            style={styles.orderButton}
            onPress={placeOrder}
          >
            <Text style={styles.orderButtonText}>
              🛍️ Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.top}>
          <View>
            <Text style={styles.logo}>🏔️</Text>
            <Text style={styles.appName}>Kumaoni Jayka</Text>
            <Text style={styles.tagline}>
              पहाड़ का स्वाद, आपके घर तक ❤️
            </Text>
          </View>

          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => setScreen("cart")}
          >
            <Text style={styles.cartText}>🛒 {cart.length}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>घर जैसा पहाड़ी स्वाद</Text>
          <Text style={styles.bannerText}>
            स्वादिष्ट Kumaoni खाना अब आपके घर तक!
          </Text>
        </View>

        <Text style={styles.menuTitle}>🍽️ हमारा Menu</Text>

        {foods.map((food) => (
          <View style={styles.foodCard} key={food.id}>
            <Text style={styles.bigEmoji}>{food.emoji}</Text>

            <View style={{ flex: 1 }}>
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

        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => setScreen("cart")}
        >
          <Text style={styles.orderButtonText}>
            🛒 Cart देखें ({cart.length})
          </Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          © 2026 Kumaoni Jayka
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8EF",
  },

  top: {
    padding: 20,
    paddingTop: 45,
    backgroundColor: "#8B2E1E",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    fontSize: 38,
  },

  appName: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },

  tagline: {
    color: "#FFE7C2",
    marginTop: 4,
    fontSize: 14,
  },

  cartButton: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 15,
  },

  cartText: {
    fontSize: 17,
    fontWeight: "bold",
  },

  banner: {
    margin: 15,
    padding: 22,
    borderRadius: 18,
    backgroundColor: "#F4C27A",
  },

  bannerTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#5C2418",
  },

  bannerText: {
    marginTop: 7,
    fontSize: 15,
    color: "#5C2418",
  },

  menuTitle: {
    fontSize: 23,
    fontWeight: "bold",
    marginHorizontal: 18,
    marginBottom: 10,
    color: "#4B2118",
  },

  foodCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    marginVertical: 7,
    padding: 14,
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },

  bigEmoji: {
    fontSize: 42,
    marginRight: 12,
  },

  foodEmoji: {
    fontSize: 35,
    marginRight: 12,
  },

  foodName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3D211A",
  },

  price: {
    fontSize: 16,
    marginTop: 5,
    color: "#8B2E1E",
    fontWeight: "bold",
  },

  addButton: {
    backgroundColor: "#8B2E1E",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
  },

  addText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  orderButton: {
    backgroundColor: "#1F7A45",
    margin: 18,
    padding: 17,
    borderRadius: 15,
    alignItems: "center",
  },

  orderButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  footer: {
    textAlign: "center",
    padding: 25,
    color: "#777777",
  },

  header: {
    backgroundColor: "#8B2E1E",
    padding: 18,
    paddingTop: 42,
    flexDirection: "row",
    alignItems: "center",
  },

  back: {
    color: "#FFFFFF",
    fontSize: 32,
    marginRight: 15,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },

  content: {
    padding: 18,
  },

  empty: {
    textAlign: "center",
    marginTop: 80,
    fontSize: 20,
    color: "#777777",
  },

  cartItem: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginBottom: 10,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  removeButton: {
    backgroundColor: "#F1D7D2",
    padding: 8,
    borderRadius: 8,
  },

  removeText: {
    color: "#8B2E1E",
    fontWeight: "bold",
  },

  totalBox: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 15,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  totalText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  totalPrice: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#8B2E1E",
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    marginBottom: 12,
  },

  addressInput: {
    height: 100,
    textAlignVertical: "top",
  },

  paymentBox: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#1F7A45",
  },

  paymentText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1F7A45",
  },
});
