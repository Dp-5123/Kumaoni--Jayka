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
  { id: 2, name: "भट्ट की चुड़कानी", price: 149, emoji: "🥘" },
  { id: 3, name: "आलू के गुटके", price: 99, emoji: "🥔" },
  { id: 4, name: "काफुली", price: 129, emoji: "🍲" },
  { id: 5, name: "झंगोरे की खीर", price: 119, emoji: "🍮" },
  { id: 6, name: "सिंगल की रोटी", price: 79, emoji: "🫓" },
];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [cart, setCart] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const addToCart = (food) => {
    setCart([...cart, food]);
    Alert.alert("सफलता", `${food.name} कार्ट में जोड़ दिया गया`);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const openFood = (food) => {
    setSelectedFood(food);
    setScreen("food");
  };

  const placeOrder = () => {
    if (!name || !phone || !address) {
      Alert.alert("जानकारी पूरी करें", "नाम, मोबाइल और पता भरें।");
      return;
    }

    if (cart.length === 0) {
      Alert.alert("कार्ट खाली है", "पहले कुछ खाना चुनें।");
      return;
    }

    setScreen("success");
  };

  const goHome = () => {
    setScreen("home");
    setSelectedFood(null);
  };

  // HOME
  if (screen === "home") {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.logo}>🍛</Text>
            <View>
              <Text style={styles.appName}>Kumaoni Jayka</Text>
              <Text style={styles.tagline}>पहाड़ों का असली स्वाद ❤️</Text>
            </View>
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => setScreen("cart")}
            >
              <Text style={styles.cartText}>🛒 {cart.length}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.banner}>
            <Text style={styles.bannerTitle}>कुमाऊँ का स्वाद अब आपके घर 🏔️</Text>
            <Text style={styles.bannerText}>
              स्वादिष्ट पहाड़ी खाना • घर बैठे ऑर्डर करें
            </Text>
          </View>

          <Text style={styles.sectionTitle}>आज का मेन्यू</Text>

          {foods.map((food) => (
            <TouchableOpacity
              key={food.id}
              style={styles.foodCard}
              onPress={() => openFood(food)}
            >
              <Text style={styles.foodEmoji}>{food.emoji}</Text>

              <View style={styles.foodInfo}>
                <Text style={styles.foodName}>{food.name}</Text>
                <Text style={styles.foodPrice}>₹{food.price}</Text>
              </View>

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addToCart(food)}
              >
                <Text style={styles.addText}>+ जोड़ें</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  // FOOD DETAILS
  if (screen === "food" && selectedFood) {
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={goHome}>
            <Text style={styles.back}>← वापस</Text>
          </TouchableOpacity>
          <Text style={styles.topTitle}>खाने की जानकारी</Text>
        </View>

        <View style={styles.detailBox}>
          <Text style={styles.bigEmoji}>{selectedFood.emoji}</Text>
          <Text style={styles.detailName}>{selectedFood.name}</Text>
          <Text style={styles.detailPrice}>₹{selectedFood.price}</Text>

          <Text style={styles.description}>
            स्वादिष्ट पारंपरिक कुमाऊँनी व्यंजन, ताज़ी सामग्री से तैयार।
          </Text>

          <TouchableOpacity
            style={styles.orderButton}
            onPress={() => addToCart(selectedFood)}
          >
            <Text style={styles.orderButtonText}>🛒 कार्ट में जोड़ें</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setScreen("cart")}
          >
            <Text style={styles.secondaryText}>कार्ट देखें</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // CART
  if (screen === "cart") {
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={goHome}>
            <Text style={styles.back}>← होम</Text>
          </TouchableOpacity>
          <Text style={styles.topTitle}>🛒 मेरा कार्ट</Text>
        </View>

        <ScrollView>
          {cart.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyEmoji}>🛒</Text>
              <Text style={styles.emptyText}>आपका कार्ट खाली है</Text>

              <TouchableOpacity style={styles.orderButton} onPress={goHome}>
                <Text style={styles.orderButtonText}>खाना देखें</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {cart.map((item, index) => (
                <View style={styles.cartItem} key={index}>
                  <Text style={styles.cartEmoji}>{item.emoji}</Text>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.cartName}>{item.name}</Text>
                    <Text style={styles.cartPrice}>₹{item.price}</Text>
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
                style={styles.orderButton}
                onPress={() => setScreen("checkout")}
              >
                <Text style={styles.orderButtonText}>
                  आगे बढ़ें →
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </View>
    );
  }

  // CHECKOUT
  if (screen === "checkout") {
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => setScreen("cart")}>
            <Text style={styles.back}>← कार्ट</Text>
          </TouchableOpacity>
          <Text style={styles.topTitle}>ऑर्डर करें</Text>
        </View>

        <ScrollView>
          <Text style={styles.formTitle}>डिलीवरी जानकारी</Text>

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

          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>ऑर्डर कुल</Text>
            <Text style={styles.total}>₹{total}</Text>
          </View>

          <TouchableOpacity
            style={styles.orderButton}
            onPress={placeOrder}
          >
            <Text style={styles.orderButtonText}>
              🛍️ ऑर्डर प्लेस करें
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // SUCCESS
  if (screen === "success") {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successEmoji}>🎉</Text>
        <Text style={styles.successTitle}>ऑर्डर सफल हुआ!</Text>

        <Text style={styles.successText}>
          धन्यवाद {name}!{`\n`}
          आपका Kumaoni Jayka ऑर्डर प्राप्त हो गया है।
        </Text>

        <View style={styles.orderNumber}>
          <Text style={styles.orderNumberText}>
            ऑर्डर राशि: ₹{total}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => {
            setCart([]);
            setScreen("home");
          }}
        >
          <Text style={styles.orderButtonText}>होम पर जाएँ</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F0",
    paddingTop: 45,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
  },

  logo: {
    fontSize: 42,
    marginRight: 10,
  },

  appName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1B7A3A",
  },

  tagline: {
    fontSize: 12,
    color: "#777",
    marginTop: 3,
  },

  cartButton: {
    marginLeft: "auto",
    backgroundColor: "#1B7A3A",
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
    backgroundColor: "#DFF3E5",
  },

  bannerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#155D2C",
  },

  bannerText: {
    marginTop: 7,
    color: "#555",
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginBottom: 10,
    color: "#333",
  },

  foodCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginBottom: 12,
    padding: 13,
    borderRadius: 15,
    elevation: 2,
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

  foodPrice: {
    fontSize: 16,
    color: "#1B7A3A",
    fontWeight: "bold",
    marginTop: 5,
  },

  addButton: {
    backgroundColor: "#1B7A3A",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },

  addText: {
    color: "#fff",
    fontWeight: "bold",
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },

  back: {
    color: "#1B7A3A",
    fontWeight: "bold",
  },

  topTitle: {
    fontSize: 19,
    fontWeight: "bold",
    marginLeft: 25,
  },

  detailBox: {
    margin: 20,
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
  },

  bigEmoji: {
    fontSize: 100,
  },

  detailName: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 15,
  },

  detailPrice: {
    fontSize: 22,
    color: "#1B7A3A",
    fontWeight: "bold",
    marginTop: 8,
  },

  description: {
    textAlign: "center",
    color: "#666",
    marginVertical: 20,
    lineHeight: 22,
  },

  orderButton: {
    backgroundColor: "#1B7A3A",
    margin: 20,
    padding: 16,
    borderRadius: 13,
    alignItems: "center",
  },

  orderButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: "#1B7A3A",
    padding: 14,
    borderRadius: 12,
    width: "90%",
    alignItems: "center",
  },

  secondaryText: {
    color: "#1B7A3A",
    fontWeight: "bold",
  },

  emptyBox: {
    alignItems: "center",
    paddingTop: 100,
  },

  emptyEmoji: {
    fontSize: 70,
  },

  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
  },

  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginTop: 12,
    padding: 14,
    borderRadius: 15,
  },

  cartEmoji: {
    fontSize: 40,
    marginRight: 12,
  },

  cartName: {
    fontSize: 16,
    fontWeight: "bold",
  },

  cartPrice: {
    color: "#1B7A3A",
    fontWeight: "bold",
    marginTop: 5,
  },

  removeButton: {
    backgroundColor: "#FFE5E5",
    padding: 8,
    borderRadius: 8,
  },

  removeText: {
    color: "#D22",
    fontWeight: "bold",
  },

  totalBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
    padding: 18,
    backgroundColor: "#fff",
    borderRadius: 15,
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },

  total: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#1B7A3A",
  },

  formTitle: {
    fontSize: 22,
    fontWeight: "bold",
    margin: 20,
  },

  input: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  addressInput: {
    height: 100,
    textAlignVertical: "top",
  },

  successContainer: {
    flex: 1,
    backgroundColor: "#FFF8F0",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },

  successEmoji: {
    fontSize: 80,
  },

  successTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1B7A3A",
    marginTop: 15,
  },

  successText: {
    textAlign: "center",
    fontSize: 17,
    color: "#555",
    marginTop: 15,
    lineHeight: 26,
  },

  orderNumber: {
    backgroundColor: "#fff",
    padding: 18,
    marginTop: 20,
    borderRadius: 15,
  },

  orderNumberText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
