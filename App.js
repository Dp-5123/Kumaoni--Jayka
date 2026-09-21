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
  { id: 1, name: "कुमाऊँनी थाली", price: 199, emoji: "🍛" },
  { id: 2, name: "भट्ट की चुड़कानी", price: 129, emoji: "🥘" },
  { id: 3, name: "आलू के गुटके", price: 99, emoji: "🥔" },
  { id: 4, name: "काफुली", price: 129, emoji: "🥬" },
  { id: 5, name: "झंगोरे की खीर", price: 99, emoji: "🍚" },
  { id: 6, name: "सिंगल के पकोड़े", price: 89, emoji: "🥟" },
  { id: 7, name: "मंडुवे की रोटी", price: 79, emoji: "🫓" },
  { id: 8, name: "बाल मिठाई", price: 119, emoji: "🍬" },
];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const addToCart = (food) => {
    const exists = cart.find((item) => item.id === food.id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === food.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...food, qty: 1 }]);
    }
  };

  const increase = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decrease = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const placeOrder = () => {
    if (!name || !phone || !address) {
      Alert.alert("जानकारी अधूरी है", "कृपया नाम, मोबाइल और पता भरें।");
      return;
    }

    Alert.alert(
      "🎉 Order Confirmed",
      `धन्यवाद ${name}!\n\nआपका Kumaoni Jayka order मिल गया है।\n\nकुल राशि: ₹${totalPrice}`,
      [
        {
          text: "OK",
          onPress: () => {
            setCart([]);
            setName("");
            setPhone("");
            setAddress("");
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

        <ScrollView contentContainerStyle={styles.content}>
          {cart.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyEmoji}>🛒</Text>
              <Text style={styles.emptyTitle}>Cart खाली है</Text>
              <Text style={styles.emptyText}>
                अपना पसंदीदा Kumaoni खाना चुनें।
              </Text>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => setScreen("home")}
              >
                <Text style={styles.buttonText}>खाना देखें</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {cart.map((item) => (
                <View style={styles.cartItem} key={item.id}>
                  <Text style={styles.foodEmoji}>{item.emoji}</Text>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.cartName}>{item.name}</Text>
                    <Text style={styles.price}>₹{item.price}</Text>

                    <View style={styles.quantity}>
                      <TouchableOpacity
                        style={styles.qtyButton}
                        onPress={() => decrease(item.id)}
                      >
                        <Text style={styles.qtyText}>−</Text>
                      </TouchableOpacity>

                      <Text style={styles.qtyNumber}>{item.qty}</Text>

                      <TouchableOpacity
                        style={styles.qtyButton}
                        onPress={() => increase(item.id)}
                      >
                        <Text style={styles.qtyText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text style={styles.itemTotal}>
                    ₹{item.price * item.qty}
                  </Text>
                </View>
              ))}

              <View style={styles.totalBox}>
                <Text style={styles.totalLabel}>कुल सामान</Text>
                <Text style={styles.totalLabel}>{totalItems}</Text>

                <Text style={styles.grandTotal}>कुल राशि</Text>
                <Text style={styles.grandTotal}>₹{totalPrice}</Text>
              </View>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => setScreen("checkout")}
              >
                <Text style={styles.buttonText}>Order करें →</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </View>
    );
  }

  if (screen === "checkout") {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setScreen("cart")}>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>📦 Order Details</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.sectionTitle}>Delivery Details</Text>

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
            value={phone}
            onChangeText={setPhone}
          />

          <Text style={styles.inputLabel}>Delivery Address</Text>
          <TextInput
            style={[styles.input, styles.address]}
            placeholder="पूरा पता लिखें"
            multiline
            value={address}
            onChangeText={setAddress}
          />

          <View style={styles.checkoutBox}>
            <Text style={styles.checkoutTitle}>Order Summary</Text>
            <Text style={styles.checkoutText}>
              Items: {totalItems}
            </Text>
            <Text style={styles.checkoutTotal}>
              Total: ₹{totalPrice}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={placeOrder}
          >
            <Text style={styles.buttonText}>
              🚚 Order Place करें
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>🏔️ Kumaoni Jayka</Text>
          <Text style={styles.subtitle}>
            पहाड़ों का असली स्वाद ❤️
          </Text>
        </View>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => setScreen("cart")}
        >
          <Text style={styles.cartIcon}>🛒</Text>
          {totalItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.banner}>
          <Text style={styles.bannerEmoji}>🍲</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerTitle}>
              घर जैसा पहाड़ी खाना
            </Text>
            <Text style={styles.bannerText}>
              ताजा • स्वादिष्ट • Kumaoni
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>आज का Menu</Text>

        {foods.map((food) => (
          <View style={styles.foodCard} key={food.id}>
            <View style={styles.foodImage}>
              <Text style={styles.bigEmoji}>{food.emoji}</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.foodName}>{food.name}</Text>
              <Text style={styles.foodDescription}>
                स्वादिष्ट पारंपरिक पहाड़ी व्यंजन
              </Text>
              <Text style={styles.foodPrice}>₹{food.price}</Text>
            </View>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addToCart(food)}
            >
              <Text style={styles.addText}>+ Add</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>🏔️ Kumaoni Jayka</Text>
          <Text style={styles.footerText}>
            उत्तराखंड के स्वाद को आपके घर तक ❤️
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F0",
  },

  header: {
    backgroundColor: "#7B2D26",
    paddingTop: 45,
    paddingBottom: 18,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#FFE4C4",
    marginTop: 3,
    fontSize: 13,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  back: {
    color: "#FFFFFF",
    fontSize: 32,
    marginRight: 15,
  },

  cartButton: {
    backgroundColor: "#FFFFFF",
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  cartIcon: {
    fontSize: 23,
  },

  badge: {
    position: "absolute",
    right: -3,
    top: -3,
    backgroundColor: "#E53935",
    width: 21,
    height: 21,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  banner: {
    backgroundColor: "#FFE0B2",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  bannerEmoji: {
    fontSize: 45,
    marginRight: 15,
  },

  bannerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5D241D",
  },

  bannerText: {
    marginTop: 5,
    color: "#7B4A35",
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#5D241D",
    marginBottom: 14,
  },

  foodCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  foodImage: {
    width: 70,
    height: 70,
    backgroundColor: "#FFF0DD",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  bigEmoji: {
    fontSize: 38,
  },

  foodName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333333",
  },

  foodDescription: {
    fontSize: 11,
    color: "#777777",
    marginTop: 3,
  },

  foodPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7B2D26",
    marginTop: 6,
  },

  addButton: {
    backgroundColor: "#7B2D26",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
  },

  addText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  primaryButton: {
    backgroundColor: "#7B2D26",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 18,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },

  cartItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  foodEmoji: {
    fontSize: 38,
    marginRight: 12,
  },

  cartName: {
    fontSize: 16,
    fontWeight: "bold",
  },

  price: {
    color: "#7B2D26",
    marginTop: 3,
  },

  quantity: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#FFE0B2",
    alignItems: "center",
    justifyContent: "center",
  },

  qtyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7B2D26",
  },

  qtyNumber: {
    marginHorizontal: 13,
    fontWeight: "bold",
    fontSize: 16,
  },

  itemTotal: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#7B2D26",
  },

  totalBox: {
    backgroundColor: "#FFE0B2",
    borderRadius: 15,
    padding: 18,
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  totalLabel: {
    width: "50%",
    fontSize: 16,
    marginBottom: 10,
  },

  grandTotal: {
    width: "50%",
    fontSize: 19,
    fontWeight: "bold",
    color: "#7B2D26",
  },

  inputLabel: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 6,
    color: "#5D241D",
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0C8B0",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
  },

  address: {
    height: 100,
    textAlignVertical: "top",
  },

  checkoutBox: {
    backgroundColor: "#FFE0B2",
    padding: 18,
    borderRadius: 15,
    marginTop: 20,
  },

  checkoutTitle: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#5D241D",
  },

  checkoutText: {
    fontSize: 16,
    marginBottom: 6,
  },

  checkoutTotal: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#7B2D26",
  },

  empty: {
    alignItems: "center",
    paddingTop: 70,
  },

  emptyEmoji: {
    fontSize: 65,
  },

  emptyTitle: {
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 15,
  },

  emptyText: {
    color: "#777777",
    marginTop: 8,
  },

  footer: {
    alignItems: "center",
    marginTop: 25,
    padding: 20,
  },

  footerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7B2D26",
  },

  footerText: {
    color: "#777777",
    marginTop: 5,
  },
});
