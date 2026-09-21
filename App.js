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
  { id: 1, name: "भट्ट की चड़कानी", price: 120, category: "मुख्य भोजन", emoji: "🍛" },
  { id: 2, name: "आलू के गुटके", price: 80, category: "नाश्ता", emoji: "🥔" },
  { id: 3, name: "झंगोरे की खीर", price: 100, category: "मिठाई", emoji: "🍮" },
  { id: 4, name: "काफुली", price: 120, category: "मुख्य भोजन", emoji: "🥣" },
  { id: 5, name: "मंडुवे की रोटी", price: 60, category: "रोटी", emoji: "🫓" },
  { id: 6, name: "भांग की चटनी", price: 50, category: "साइड", emoji: "🌿" },
  { id: 7, name: "रस", price: 100, category: "मुख्य भोजन", emoji: "🍲" },
  { id: 8, name: "सिंगल की सब्जी", price: 110, category: "मुख्य भोजन", emoji: "🥘" },
];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((oldCart) => {
      const found = oldCart.find((x) => x.id === item.id);

      if (found) {
        return oldCart.map((x) =>
          x.id === item.id ? { ...x, qty: x.qty + 1 } : x
        );
      }

      return [...oldCart, { ...item, qty: 1 }];
    });

    Alert.alert("कार्ट में जोड़ा गया", item.name);
  };

  const removeFromCart = (id) => {
    setCart((oldCart) => {
      const item = oldCart.find((x) => x.id === id);

      if (!item) return oldCart;

      if (item.qty > 1) {
        return oldCart.map((x) =>
          x.id === id ? { ...x, qty: x.qty - 1 } : x
        );
      }

      return oldCart.filter((x) => x.id !== id);
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const placeOrder = () => {
    if (cart.length === 0) {
      Alert.alert("कार्ट खाली है", "पहले कोई खाना कार्ट में जोड़ें।");
      return;
    }

    Alert.alert(
      "ऑर्डर सफल 🎉",
      `आपका ₹${totalPrice} का ऑर्डर प्राप्त हो गया है।`
    );

    setCart([]);
    setScreen("home");
  };

  const HomeScreen = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <Text style={styles.logo}>🏔️</Text>
        <Text style={styles.title}>Kumaoni Jayka</Text>
        <Text style={styles.subtitle}>
          पहाड़ों का असली स्वाद आपके घर तक ❤️
        </Text>

        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => setScreen("menu")}
        >
          <Text style={styles.orderButtonText}>🍽️ अभी ऑर्डर करें</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>आज का खास खाना</Text>

      <View style={styles.featureBox}>
        <Text style={styles.featureEmoji}>🥔</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.featureTitle}>आलू के गुटके</Text>
          <Text style={styles.featureText}>
            पहाड़ी मसालों के साथ स्वादिष्ट और पारंपरिक
          </Text>
          <Text style={styles.price}>₹80</Text>
        </View>

        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => addToCart(menuItems[1])}
        >
          <Text style={styles.smallButtonText}>+ जोड़ें</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>हमारे बारे में</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Kumaoni Jayka में आपको उत्तराखंड के पारंपरिक कुमाऊँनी व्यंजनों
          का स्वाद मिलेगा। हमारा उद्देश्य पहाड़ों के घर जैसा स्वाद
          आपके घर तक पहुँचाना है।
        </Text>
      </View>

      <View style={styles.features}>
        <View style={styles.featureCard}>
          <Text style={styles.cardEmoji}>🥘</Text>
          <Text style={styles.cardTitle}>पारंपरिक स्वाद</Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.cardEmoji}>🚴</Text>
          <Text style={styles.cardTitle}>होम डिलीवरी</Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.cardEmoji}>❤️</Text>
          <Text style={styles.cardTitle}>ताज़ा खाना</Text>
        </View>
      </View>
    </ScrollView>
  );

  const MenuScreen = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.pageTitle}>🍽️ हमारा मेन्यू</Text>

      {menuItems.map((item) => (
        <View style={styles.menuCard} key={item.id}>
          <Text style={styles.menuEmoji}>{item.emoji}</Text>

          <View style={styles.menuInfo}>
            <Text style={styles.menuName}>{item.name}</Text>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.price}>₹{item.price}</Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addToCart(item)}
          >
            <Text style={styles.addButtonText}>+ जोड़ें</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  const CartScreen = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.pageTitle}>🛒 आपकी कार्ट</Text>

      {cart.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyTitle}>कार्ट खाली है</Text>
          <Text style={styles.emptyText}>
            अपने पसंदीदा कुमाऊँनी व्यंजन जोड़ें।
          </Text>

          <TouchableOpacity
            style={styles.orderButton}
            onPress={() => setScreen("menu")}
          >
            <Text style={styles.orderButtonText}>मेन्यू देखें</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {cart.map((item) => (
            <View style={styles.cartCard} key={item.id}>
              <Text style={styles.cartEmoji}>{item.emoji}</Text>

              <View style={{ flex: 1 }}>
                <Text style={styles.menuName}>{item.name}</Text>
                <Text style={styles.price}>
                  ₹{item.price} × {item.qty}
                </Text>
              </View>

              <View style={styles.quantity}>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => removeFromCart(item.id)}
                >
                  <Text style={styles.qtyText}>−</Text>
                </TouchableOpacity>

                <Text style={styles.qtyNumber}>{item.qty}</Text>

                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => addToCart(item)}
                >
                  <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>कुल आइटम</Text>
            <Text style={styles.totalValue}>{totalItems}</Text>

            <Text style={styles.totalLabel}>कुल कीमत</Text>
            <Text style={styles.totalPrice}>₹{totalPrice}</Text>
          </View>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={placeOrder}
          >
            <Text style={styles.checkoutText}>ऑर्डर करें • ₹{totalPrice}</Text>
          </TouchableOpacity>
        </>
      )}
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
        {screen === "home" && <HomeScreen />}
        {screen === "menu" && <MenuScreen />}
        {screen === "cart" && <CartScreen />}
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setScreen("home")}
        >
          <Text style={styles.navEmoji}>🏠</Text>
          <Text style={styles.navText}>होम</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setScreen("menu")}
        >
          <Text style={styles.navEmoji}>🍽️</Text>
          <Text style={styles.navText}>मेन्यू</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setScreen("cart")}
        >
          <Text style={styles.navEmoji}>🛒</Text>
          <Text style={styles.navText}>कार्ट</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F0",
  },

  header: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  headerLogo: {
    fontSize: 30,
  },

  headerTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#7A321D",
  },

  cartIcon: {
    fontSize: 28,
  },

  badge: {
    position: "absolute",
    right: -5,
    top: -7,
    backgroundColor: "#D84315",
    borderRadius: 12,
    minWidth: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 12,
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
  },

  hero: {
    marginTop: 18,
    padding: 25,
    borderRadius: 20,
    backgroundColor: "#F2C078",
    alignItems: "center",
  },

  logo: {
    fontSize: 55,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#672D18",
    marginTop: 5,
  },

  subtitle: {
    fontSize: 16,
    color: "#5A3A25",
    textAlign: "center",
    marginTop: 8,
  },

  orderButton: {
    backgroundColor: "#7A321D",
    paddingVertical: 13,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginTop: 20,
  },

  orderButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#5C2817",
    marginTop: 24,
    marginBottom: 12,
  },

  featureBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  featureEmoji: {
    fontSize: 50,
    marginRight: 15,
  },

  featureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#442519",
  },

  featureText: {
    color: "#777",
    marginTop: 3,
    fontSize: 13,
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#D84315",
    marginTop: 5,
  },

  smallButton: {
    backgroundColor: "#7A321D",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
  },

  smallButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  infoBox: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 15,
  },

  infoText: {
    fontSize: 15,
    lineHeight: 23,
    color: "#555",
  },

  features: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    marginBottom: 25,
  },

  featureCard: {
    backgroundColor: "#FFFFFF",
    width: "31%",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  cardEmoji: {
    fontSize: 30,
  },

  cardTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 7,
    color: "#555",
  },

  pageTitle: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#5C2817",
    marginTop: 20,
    marginBottom: 15,
  },

  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  menuEmoji: {
    fontSize: 48,
    marginRight: 14,
  },

  menuInfo: {
    flex: 1,
  },

  menuName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#442519",
  },

  category: {
    fontSize: 12,
    color: "#888",
    marginTop: 3,
  },

  addButton: {
    backgroundColor: "#7A321D",
    borderRadius: 18,
    paddingHorizontal: 13,
    paddingVertical: 9,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  emptyBox: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 30,
  },

  emptyEmoji: {
    fontSize: 65,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#5C2817",
    marginTop: 10,
  },

  emptyText: {
    color: "#777",
    textAlign: "center",
    marginTop: 8,
  },

  cartCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  cartEmoji: {
    fontSize: 42,
    marginRight: 13,
  },

  quantity: {
    flexDirection: "row",
    alignItems: "center",
  },

  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#7A321D",
    alignItems: "center",
    justifyContent: "center",
  },

  qtyText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  qtyNumber: {
    fontSize: 17,
    fontWeight: "bold",
    marginHorizontal: 8,
  },

  totalBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginTop: 10,
    marginBottom: 15,
  },

  totalLabel: {
    color: "#777",
    fontSize: 14,
    marginTop: 4,
  },

  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
  },

  totalPrice: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#D84315",
    marginTop: 3,
  },

  checkoutButton: {
    backgroundColor: "#D84315",
    padding: 17,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 25,
  },

  checkoutText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  bottomNav: {
    height: 65,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },

  navEmoji: {
    fontSize: 23,
  },

  navText: {
    fontSize: 12,
    color: "#555",
    marginTop: 2,
  },
});
