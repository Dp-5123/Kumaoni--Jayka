import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";

const menuItems = [
  {
    id: 1,
    name: "भट्ट की चड़कानी",
    price: 120,
    emoji: "🍲",
    desc: "पारंपरिक कुमाऊँनी स्वाद",
  },
  {
    id: 2,
    name: "आलू के गुटके",
    price: 80,
    emoji: "🥔",
    desc: "मसालेदार पहाड़ी आलू",
  },
  {
    id: 3,
    name: "झंगोरे की खीर",
    price: 100,
    emoji: "🍚",
    desc: "पारंपरिक पहाड़ी मिठाई",
  },
  {
    id: 4,
    name: "मंडुवे की रोटी",
    price: 60,
    emoji: "🫓",
    desc: "स्वस्थ और स्वादिष्ट रोटी",
  },
  {
    id: 5,
    name: "कापा",
    price: 110,
    emoji: "🥬",
    desc: "कुमाऊँनी पालक की सब्जी",
  },
  {
    id: 6,
    name: "भांग की चटनी",
    price: 50,
    emoji: "🌿",
    desc: "पहाड़ी स्पेशल चटनी",
  },
  {
    id: 7,
    name: "सिंगल की सब्जी",
    price: 100,
    emoji: "🥘",
    desc: "घर जैसा पहाड़ी स्वाद",
  },
  {
    id: 8,
    name: "बाल मिठाई",
    price: 90,
    emoji: "🍬",
    desc: "उत्तराखंड की प्रसिद्ध मिठाई",
  },
];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existing = cart.find((x) => x.id === item.id);

    if (existing) {
      setCart(
        cart.map((x) =>
          x.id === item.id ? { ...x, qty: x.qty + 1 } : x
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }

    Alert.alert("जोड़ा गया", `${item.name} कार्ट में जोड़ दिया गया`);
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

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const deliveryFee = subtotal > 0 ? 30 : 0;
  const total = subtotal + deliveryFee;

  const placeOrder = () => {
    if (cart.length === 0) {
      Alert.alert("कार्ट खाली है", "पहले कुछ खाना ऑर्डर करें।");
      return;
    }

    Alert.alert(
      "ऑर्डर सफल 🎉",
      "आपका ऑर्डर Kumaoni Jayka को मिल गया है।",
      [
        {
          text: "ठीक है",
          onPress: () => {
            setCart([]);
            setScreen("home");
          },
        },
      ]
    );
  };

  const Home = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <Text style={styles.logo}>🏔️</Text>
        <Text style={styles.appName}>Kumaoni Jayka</Text>
        <Text style={styles.tagline}>
          पहाड़ का स्वाद, आपके घर तक ❤️
        </Text>

        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => setScreen("menu")}
        >
          <Text style={styles.mainButtonText}>🍽️ अभी ऑर्डर करें</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>हमारे खास पकवान</Text>

        <View style={styles.grid}>
          {menuItems.slice(0, 4).map((item) => (
            <View style={styles.smallCard} key={item.id}>
              <Text style={styles.foodEmoji}>{item.emoji}</Text>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.price}>₹{item.price}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>🌿 असली कुमाऊँनी स्वाद</Text>
        <Text style={styles.infoText}>
          पारंपरिक पहाड़ी मसालों और घर जैसी रेसिपी से तैयार स्वादिष्ट खाना।
        </Text>
      </View>
    </ScrollView>
  );

  const Menu = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.pageTitle}>🍽️ हमारा मेन्यू</Text>

      {menuItems.map((item) => (
        <View style={styles.menuCard} key={item.id}>
          <View style={styles.foodIconBox}>
            <Text style={styles.bigEmoji}>{item.emoji}</Text>
          </View>

          <View style={styles.menuInfo}>
            <Text style={styles.menuName}>{item.name}</Text>
            <Text style={styles.menuDesc}>{item.desc}</Text>
            <Text style={styles.menuPrice}>₹{item.price}</Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addToCart(item)}
          >
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  const Cart = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.pageTitle}>🛒 आपका कार्ट</Text>

      {cart.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyTitle}>कार्ट खाली है</Text>
          <Text style={styles.emptyText}>
            अपना पसंदीदा पहाड़ी खाना चुनें।
          </Text>

          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => setScreen("menu")}
          >
            <Text style={styles.mainButtonText}>मेन्यू देखें</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {cart.map((item) => (
            <View style={styles.cartCard} key={item.id}>
              <Text style={styles.cartEmoji}>{item.emoji}</Text>

              <View style={{ flex: 1 }}>
                <Text style={styles.cartName}>{item.name}</Text>
                <Text style={styles.cartPrice}>₹{item.price}</Text>
              </View>

              <View style={styles.qtyBox}>
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
          ))}

          <View style={styles.bill}>
            <Text style={styles.billTitle}>ऑर्डर विवरण</Text>

            <View style={styles.billRow}>
              <Text>Subtotal</Text>
              <Text>₹{subtotal}</Text>
            </View>

            <View style={styles.billRow}>
              <Text>Delivery</Text>
              <Text>₹{deliveryFee}</Text>
            </View>

            <View style={styles.totalRow}>
              <Text>कुल राशि</Text>
              <Text>₹{total}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => setScreen("checkout")}
          >
            <Text style={styles.mainButtonText}>
              Checkout • ₹{total}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );

  const Checkout = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.pageTitle}>📦 Checkout</Text>

      <View style={styles.checkoutBox}>
        <Text style={styles.checkoutTitle}>डिलीवरी जानकारी</Text>

        <Text style={styles.label}>नाम</Text>
        <View style={styles.input}>
          <Text style={styles.placeholder}>अपना नाम दर्ज करें</Text>
        </View>

        <Text style={styles.label}>मोबाइल नंबर</Text>
        <View style={styles.input}>
          <Text style={styles.placeholder}>मोबाइल नंबर दर्ज करें</Text>
        </View>

        <Text style={styles.label}>डिलीवरी पता</Text>
        <View style={[styles.input, styles.addressInput]}>
          <Text style={styles.placeholder}>
            पूरा पता दर्ज करें
          </Text>
        </View>
      </View>

      <View style={styles.bill}>
        <Text style={styles.billTitle}>Payment Summary</Text>

        <View style={styles.billRow}>
          <Text>Items</Text>
          <Text>{totalItems}</Text>
        </View>

        <View style={styles.billRow}>
          <Text>Food</Text>
          <Text>₹{subtotal}</Text>
        </View>

        <View style={styles.billRow}>
          <Text>Delivery</Text>
          <Text>₹{deliveryFee}</Text>
        </View>

        <View style={styles.totalRow}>
          <Text>कुल</Text>
          <Text>₹{total}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.mainButton}
        onPress={placeOrder}
      >
        <Text style={styles.mainButtonText}>
          ✅ ऑर्डर प्लेस करें
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setScreen("home")}>
          <Text style={styles.headerLogo}>🏔️</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Kumaoni Jayka</Text>

        <TouchableOpacity onPress={() => setScreen("cart")}>
          <Text style={styles.cartIcon}>🛒</Text>
          {totalItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {screen === "home" && <Home />}
        {screen === "menu" && <Menu />}
        {screen === "cart" && <Cart />}
        {screen === "checkout" && <Checkout />}
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setScreen("home")}
        >
          <Text style={styles.navEmoji}>🏠</Text>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setScreen("menu")}
        >
          <Text style={styles.navEmoji}>🍽️</Text>
          <Text style={styles.navText}>Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setScreen("cart")}
        >
          <Text style={styles.navEmoji}>🛒</Text>
          <Text style={styles.navText}>Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8EF",
  },

  header: {
    height: 65,
    backgroundColor: "#7B2D26",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },

  headerLogo: {
    fontSize: 30,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "bold",
  },

  cartIcon: {
    fontSize: 27,
  },

  badge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "#FFD166",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#7B2D26",
  },

  content: {
    flex: 1,
    padding: 16,
  },

  hero: {
    backgroundColor: "#8E3B32",
    borderRadius: 22,
    padding: 28,
    alignItems: "center",
    marginBottom: 22,
  },

  logo: {
    fontSize: 60,
    marginBottom: 5,
  },

  appName: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },

  tagline: {
    color: "#FFE9D5",
    fontSize: 16,
    marginTop: 8,
    textAlign: "center",
  },

  mainButton: {
    backgroundColor: "#F4A261",
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 22,
    alignItems: "center",
    marginTop: 22,
    marginBottom: 12,
  },

  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4A241E",
    marginBottom: 14,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  smallCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
    elevation: 2,
  },

  foodEmoji: {
    fontSize: 42,
  },

  foodName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#4A241E",
    textAlign: "center",
    marginTop: 8,
  },

  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#B24C35",
    marginTop: 5,
  },

  infoBox: {
    backgroundColor: "#FFF0D9",
    borderRadius: 16,
    padding: 18,
    marginTop: 8,
    marginBottom: 20,
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6B3028",
    marginBottom: 6,
  },

  infoText: {
    fontSize: 15,
    color: "#5B403B",
    lineHeight: 22,
  },

  pageTitle: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#4A241E",
    marginBottom: 18,
  },

  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  foodIconBox: {
    width: 70,
    height: 70,
    borderRadius: 14,
    backgroundColor: "#FFF0D9",
    alignItems: "center",
    justifyContent: "center",
  },

  bigEmoji: {
    fontSize: 38,
  },

  menuInfo: {
    flex: 1,
    marginLeft: 13,
  },

  menuName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#4A241E",
  },

  menuDesc: {
    color: "#777",
    marginTop: 4,
    fontSize: 13,
  },

  menuPrice: {
    color: "#B24C35",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 6,
  },

  addButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#7B2D26",
    alignItems: "center",
    justifyContent: "center",
  },

  addText: {
    color: "#FFFFFF",
    fontSize: 28,
    lineHeight: 30,
  },

  emptyBox: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 20,
  },

  emptyEmoji: {
    fontSize: 60,
  },

  emptyTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#4A241E",
    marginTop: 12,
  },

  emptyText: {
    color: "#777",
    marginTop: 7,
  },

  cartCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  cartEmoji: {
    fontSize: 38,
    marginRight: 12,
  },

  cartName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4A241E",
  },

  cartPrice: {
    color: "#B24C35",
    fontWeight: "bold",
    marginTop: 4,
  },

  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  qtyButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#7B2D26",
    alignItems: "center",
    justifyContent: "center",
  },

  qtyText: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "bold",
  },

  qtyNumber: {
    fontSize: 17,
    fontWeight: "bold",
    marginHorizontal: 10,
  },

  bill: {
