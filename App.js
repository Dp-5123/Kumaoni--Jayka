import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

const foods = [
  { id: 1, name: "भट्ट की चुरकानी", price: 120 },
  { id: 2, name: "आलू के गुटके", price: 80 },
  { id: 3, name: "झंगर का खीर", price: 100 },
  { id: 4, name: "काफुली", price: 110 },
  { id: 5, name: "मंडुए की रोटी", price: 40 },
  { id: 6, name: "सिंगल", price: 90 },
];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [cart, setCart] = useState([]);

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

  // HOME
  if (screen === "home") {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>🥘</Text>
          <View>
            <Text style={styles.title}>Kumaoni Jayka</Text>
            <Text style={styles.subtitle}>पहाड़ का असली स्वाद ❤️</Text>
          </View>
        </View>

        <ScrollView>
          <Text style={styles.heading}>आज का मेन्यू</Text>

          {foods.map((food) => (
            <View style={styles.foodCard} key={food.id}>
              <View style={{ flex: 1 }}>
                <Text style={styles.foodName}>{food.name}</Text>
                <Text style={styles.price}>₹{food.price}</Text>
              </View>

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addToCart(food)}
              >
                <Text style={styles.buttonText}>+ Add</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => setScreen("cart")}
        >
          <Text style={styles.cartButtonText}>
            🛒 Cart ({cart.length})  •  ₹{total}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // CART
  if (screen === "cart") {
    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>🛒 आपका Cart</Text>

        {cart.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Cart अभी खाली है</Text>

            <TouchableOpacity
              style={styles.mainButton}
              onPress={() => setScreen("home")}
            >
              <Text style={styles.buttonText}>Menu देखें</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <ScrollView>
              {cart.map((item, index) => (
                <View style={styles.cartItem} key={index}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.foodName}>{item.name}</Text>
                    <Text style={styles.price}>₹{item.price}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeFromCart(index)}
                  >
                    <Text style={styles.buttonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            <View style={styles.totalBox}>
              <Text style={styles.totalText}>कुल: ₹{total}</Text>

              <TouchableOpacity
                style={styles.mainButton}
                onPress={() => setScreen("order")}
              >
                <Text style={styles.buttonText}>Order Now</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setScreen("home")}
              >
                <Text>← Menu पर जाएँ</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  }

  // ORDER CONFIRMATION
  if (screen === "order") {
    return (
      <View style={styles.container}>
        <View style={styles.successBox}>
          <Text style={styles.successIcon}>✅</Text>
          <Text style={styles.successTitle}>Order Confirmed!</Text>

          <Text style={styles.successText}>
            आपका Kumaoni Jayka का ऑर्डर सफलतापूर्वक मिल गया है।
          </Text>

          <Text style={styles.totalText}>कुल राशि: ₹{total}</Text>

          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => {
              setCart([]);
              setScreen("home");
            }}
          >
            <Text style={styles.buttonText}>नया Order करें</Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: 35,
    paddingBottom: 20,
  },

  logo: {
    fontSize: 48,
    marginRight: 12,
  },

  title: {
    fontSize: 27,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 14,
    marginTop: 3,
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 15,
  },

  pageTitle: {
    fontSize: 27,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 20,
  },

  foodCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  foodName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  price: {
    fontSize: 16,
    marginTop: 5,
  },

  addButton: {
    backgroundColor: "#2E7D32",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  cartButton: {
    backgroundColor: "#D84315",
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
  },

  cartButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },

  cartItem: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  removeButton: {
    backgroundColor: "#B71C1C",
    padding: 10,
    borderRadius: 8,
  },

  totalBox: {
    paddingTop: 10,
    paddingBottom: 20,
  },

  totalText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },

  mainButton: {
    backgroundColor: "#2E7D32",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  backButton: {
    padding: 15,
    alignItems: "center",
  },

  empty: {
    alignItems: "center",
    marginTop: 100,
  },

  emptyText: {
    fontSize: 20,
    marginBottom: 20,
  },

  successBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  successIcon: {
    fontSize: 70,
    marginBottom: 20,
  },

  successTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
  },

  successText: {
    textAlign: "center",
    fontSize: 17,
    lineHeight: 25,
    marginBottom: 25,
  },
});
