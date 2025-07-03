import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { Alert, FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from 'react-native'
import { SignOutButton } from '../../components/SignOutButton'
import { useTransactions } from '../../hooks/UseTransactions'
import { useEffect } from 'react'
import { PageLoader } from '../../components/PageLoader'
import { styles } from '../../assets/styles/home.styles'
import { Ionicons } from '@expo/vector-icons';
import {BalanceCard} from '../../components/BalanceCard'
import {TransactionItems} from '../../components/TransactionItems'
import { NoTransactionsFound } from '../../components/NoTransactionsFound'

export default function Page() {
  const { user } = useUser()
  const { summary, isloading, deleteTransaction, transactions, loadData } = useTransactions(user.id)
  const [refreshing, setRefreshing] = useState(false)
  
  const onRefresh = async () => {
    setRefreshing(true)
    await loadData()
    setRefreshing(false)
  }
  useEffect(() => {
    loadData()
  }, [loadData])

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTransaction(id)
        }
      ]
    );
  }

  if (isloading && !refreshing) {
    return <PageLoader />
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          {/* Left */}
          <View style={styles.headerLeft}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.headerLogo}
              resizeMode='contain'
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split('@')[0] || 'User'}
              </Text>
            </View>
          </View>
          {/* Right */}
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push('/create')}>
              <Ionicons name="add" size={20} color="#FFF" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>
        {/* Balance Card */}
        <BalanceCard summary={summary}  />

        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>
      </View>
      <FlatList 
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={transactions}
        renderItem={({ item }) => (
          <TransactionItems item={item} onDelete={handleDelete} />
        )}
        ListEmptyComponent={<NoTransactionsFound />}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </View>
  )
}