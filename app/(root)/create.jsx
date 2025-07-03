import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { API_URL } from '../../constants/api';
import { styles } from '../../assets/styles/create.styles';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

const CATEGORIES = [
  { id: "food", name: "Food & Drinks", icons: "fast-food" },
  { id: "shopping", name: "Shopping", icons: "cart" },
  { id: "transportation", name: "Transportation", icons: "car" },
  { id: "bills", name: "Bills & Utilities", icons: "receipt" },
  { id: "entertainment", name: "Entertainment", icons: "film" },
  { id: "health", name: "Health & Fitness", icons: "heart" },
  { id: "travel", name: "Travel", icons: "airplane" },
  { id: "income", name: "Income", icons: "cash" },
  { id: "stationary", name: "Stationary", icons: "book" },
  { id: "others", name: "Others", icons: "ellipsis-h" },
];

const CreateScreen = () => {
  const router = useRouter();
  const { user } = useUser();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].id);
  const [isExpense, setIsExpense] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) return Alert.alert("Error", "Please enter a title for the transaction.");
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      return Alert.alert("Error", "Please enter a valid amount for the transaction.");
    }
    if (!selectedCategory) return Alert.alert("Error", "Please select a category for the transaction.");

    setIsLoading(true);
    try {
      const formattedAmount = isExpense
        ? -Math.abs(parseFloat(amount))
        : Math.abs(parseFloat(amount));

      const response = await fetch(`${API_URL}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
          title,
          amount: formattedAmount,
          category: selectedCategory,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return Alert.alert("Error", errorData.message || "Failed to create transaction.");
      }

      Alert.alert("Success", "Transaction created successfully.");
      router.back();
    } catch (error) {
      console.log("Error creating transaction:", error);
      Alert.alert("Error", "An error occurred while creating the transaction. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Transaction</Text>
        <TouchableOpacity
          style={[styles.saveButtonContainer, isLoading && styles.saveButtonDisabled]}
          onPress={handleCreate}
          disabled={isLoading}
        >
          <Text style={styles.saveButton}>{isLoading ? "Saving..." : "Save"}</Text>
          {!isLoading && <Ionicons name="checkmark" size={18} color={COLORS.primary} />}
        </TouchableOpacity>
      </View>

      {/* Card */}
      <View style={styles.card}>
        {/* Type Selector */}
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[styles.typeButton, isExpense && styles.typeButtonActive]}
            onPress={() => setIsExpense(true)}
          >
            <Ionicons
              name="arrow-down-circle"
              size={22}
              color={isExpense ? COLORS.white : COLORS.expense}
              style={styles.typeIcon}
            />
            <Text style={[styles.typeButtonText, isExpense && styles.typeButtonTextActive]}>
              Expense
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.typeButton, !isExpense && styles.typeButtonActive]}
            onPress={() => setIsExpense(false)}
          >
            <Ionicons
              name="arrow-up-circle"
              size={22}
              color={!isExpense ? COLORS.white : COLORS.income}
              style={styles.typeIcon}
            />
            <Text style={[styles.typeButtonText, !isExpense && styles.typeButtonTextActive]}>
              Income
            </Text>
          </TouchableOpacity>
        </View>

        {/* Amount Input */}
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>₹</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            placeholderTextColor={COLORS.textLight}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>
    
        {/* Input Container */}
        <View style={styles.inputContainer}>
        <Ionicons name="create-outline" size={22} color={COLORS.textLight} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="TransactionTitle"
            placeholderTextColor={COLORS.textLight}
            value={title}
            onChangeText={setTitle}
          />
        </View>
        {/* Title */}
        <Text style={styles.sectionTitle}>
            <Ionicons name="pricetag-outline" size={16} color={COLORS.text} style={styles.sectionIcon} />
            Category
        </Text>
        <View style={styles.categoryGrid}>
            {CATEGORIES.map((category) => (
                <TouchableOpacity
                    key={category.id}
                    style={[
                        styles.categoryButton,
                        selectedCategory === category.name && styles.categoryButtonActive
                    ]}
                    onPress={() => setSelectedCategory(category.name)
                    }
                >
                    <Ionicons
                        name={category.icons}
                        size={20}
                        color={selectedCategory === category.name ? COLORS.white : COLORS.text}
                        style={styles.categoryIcon}
                    />
                    <Text 
                    style={[styles.categoryButtonText, selectedCategory === category.name && styles.categoryButtonTextActive]}>
                        {category.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
      </View>
      { isLoading && (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Saving your transaction...</Text>
        </View>
      )}
    </View>
  );
};

export default CreateScreen;
