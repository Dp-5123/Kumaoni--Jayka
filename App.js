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
    name: "भट्ट की चुड़कानी",
    price: 120,
    emoji: "🍲",
    desc: "पारंपरिक कुमाऊँनी स्वाद",
  },
  {
    id: 2,
    name: "आलू के गुटके",
    price: 80,
    emoji: "🥔",
    desc: "पहाड़ी मसालों के साथ",
  },
  {
    id: 3,
    name: "काफुली",
    price: 100,
    emoji: "🥬",
    desc: "स्वादिष्ट पहाड़ी व्यंजन",
  },
  {
    id: 4,
    name: "मंडुवे की रोटी",
    price: 60,
    emoji: "🫓",
    desc: "स्वस्थ और पारंपरिक",
  },
  {
    id: 5,
    name: "झंगोरे की खीर",
    price: 90,
    emoji: "🍚",
    desc: "मीठी पहाड़ी मिठास",
  },
  {
    id: 6,
    name: "सिंगल",
    price: 70,
    emoji: "🥟",
    desc: "कुमाऊँ का खास नाश्ता",
  },
];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
    Alert.alert("जोड़ा गया", `${item.name} कार्ट में जोड़ दिया गया।`);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const HomeScreen = () => (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.logo}>🏔️</Text>
        <Text style={styles.appName}>Kumaoni Jayka</Text>
        <Text style={styles.tagline}>पहाड़ का स्वाद, आपके घर तक ❤️</Text>

        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => setScreen("menu")}
        >
          <Text style={styles.mainButtonText}>🍽️ Order Now</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>आज का Kumaoni स्वाद</Text>

        {menuItems.slice(0, 4).map((item) => (
          <View style={styles.card} key={item.id}>
            <Text style={styles.foodEmoji}>{item.emoji}</Text>

            <View style={styles.foodInfo}>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodDesc}>{item.desc}</Text>
              <Text style={styles.price}>₹{item.price}</Text>
            </View>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addToCart(item)}
            >
              <Text style={styles.addText}>+</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const MenuScreen = () => (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🍽️ Kumaoni Menu</Text>
        <Text style={styles.headerSubtitle}>अपना पसंदीदा खाना चुनें</Text>
      </View>

      <View style={styles.section}>
        {menuItems.map((item) => (
          <View style={styles.card} key={item.id}>
            <Text style={styles.foodEmoji}>{item.emoji}</Text>

            <View style={styles.foodInfo}>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodDesc}>{item.desc}</Text>
              <Text style={styles.price}>₹{item.price}</Text>
            </View>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addToCart(item)}
            >
              <Text style={styles.addText}>+</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const CartScreen = () => (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛒 आपका Cart</Text>
      </View>

      {cart.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyText}>आपका cart खाली है</Text>

          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => setScreen("menu")}
          >
            <Text style={styles.mainButtonText}>Menu देखें</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.section}>
          {cart.map((item, index) => (
            <View style={styles.cartItem} key={index}>
              <Text style={styles.cartEmoji}>{item.emoji}</Text>

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
            onPress={() => setScreen("order")}
          >
            <Text style={styles.orderButtonText}>
              📦 Order Place करें
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );

  const OrderScreen = () => (
    <View style={styles.empty}>
      <Text style={styles.successEmoji}>🎉</Text>
      <Text style={styles.successTitle}>Order तैयार है!</Text>

      <Text style={styles.successText}>
        आपका Kumaoni Jayka order जल्द ही आपके पास पहुँचेगा।
      </Text>

      <View style={styles.totalBox}>
        <Text style={styles.totalText}>Order Amount</Text>
        <Text style={styles.totalPrice}>₹{total}</Text>
      </View>

      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => {
          setCart([]);
          setScreen("home");
        }}
      >
        <Text style={styles.mainButtonText}>🏠 Home पर जाएँ</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ flex: 1 }}>
        {screen === "home" && <HomeScreen />}
        {screen === "menu" && <MenuScreen />}
        {screen === "cart" && <CartScreen />}
        {screen === "order" && <OrderScreen />}

        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => setScreen("home")}>
            <Text style={styles.navIcon}>🏠</Text>
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setScreen("menu")}>
            <Text style={styles.navIcon}>🍽️</Text>
            <Text style={styles.navText}>Menu</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setScreen("cart")}>
            <View>
              <Text style={styles.navIcon}>🛒</Text>
              {cart.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cart.length}</Text>
                </View>
              )}
            </View>
            <Text style={styles.navText}>Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fffaf2",
  },

  container: {
    flex: 1,
    backgroundColor: "#fffaf2",
  },

  hero: {
    backgroundColor: "#176b45",
    paddingTop: 55,
    paddingBottom: 45,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  logo: {
    fontSize: 65,
  },

  appName: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 8,
  },

  tagline: {
    fontSize: 17,
    color: "#ffffff",
    marginTop: 8,
    textAlign: "center",
  },

  mainButton: {
    backgroundColor: "#f2a900",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 25,
  },

  mainButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },

  section: {
    padding: 18,
    paddingBottom: 100,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#26352d",
    marginBottom: 15,
  },

  header: {
    backgroundColor: "#176b45",
    padding: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  headerTitle: {
    color: "#ffffff",
    fontSize: 27,
    fontWeight: "bold",
  },

  headerSubtitle: {
    color: "#ffffff",
    fontSize: 15,
    marginTop: 6,
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 15,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },

  foodEmoji: {
    fontSize: 42,
    marginRight: 13,
  },

  foodInfo: {
    flex: 1,
  },

  foodName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#26352d",
  },

  foodDesc: {
    color: "#777777",
    marginTop: 4,
    fontSize: 13,
  },

  price: {
    color: "#176b45",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 6,
  },

  addButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#176b45",
    alignItems: "center",
    justifyContent: "center",
  },

  addText: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
  },

  cartItem: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  cartEmoji: {
    fontSize: 35,
    marginRight: 12,
  },

  removeButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#eeeeee",
  },

  removeText: {
    color: "#b3261e",
    fontWeight: "bold",
  },

  totalBox: {
    backgroundColor: "#e9f5ed",
    padding: 18,
    borderRadius: 15,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalText: {
    fontSize: 19,
    fontWeight: "bold",
  },

  totalPrice: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#176b45",
  },

  orderButton: {
    backgroundColor: "#176b45",
    padding: 17,
    borderRadius: 30,
    marginTop: 18,
    alignItems: "center",
  },

  orderButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },

  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#fffaf2",
  },

  emptyEmoji: {
    fontSize: 70,
  },

  emptyText: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 15,
  },

  successEmoji: {
    fontSize: 75,
  },

  successTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#176b45",
    marginTop: 15,
  },

  successText: {
    fontSize: 16,
    textAlign: "center",
    color: "#555555",
    marginTop: 10,
    lineHeight: 24,
  },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 72,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#dddddd",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  navIcon: {
    fontSize: 24,
    textAlign: "center",
  },

  navText: {
    fontSize: 12,
    color: "#333333",
    textAlign: "center",
  },

  badge: {
    position: "absolute",
    right: -8,
    top: -5,
    backgroundColor: "#e53935",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "bold",
  },
});
