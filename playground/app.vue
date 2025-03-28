<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">
      Mollie Module Demo
    </h1>

    <!-- Customer Section -->
    <div class="mb-10 p-6 border rounded-lg shadow-sm">
      <h2 class="text-xl font-semibold mb-4">
        Customer Management
      </h2>

      <!-- Create Customer Form -->
      <form
        class="mb-6"
        @submit.prevent="createCustomer"
      >
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium mb-1">Name</label>
            <input
              v-model="newCustomer.name"
              class="w-full p-2 border rounded"
            >
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Email</label>
            <input
              v-model="newCustomer.email"
              type="email"
              class="w-full p-2 border rounded"
            >
          </div>
        </div>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Customer
        </button>
      </form>

      <!-- Customer List -->
      <div v-if="customers.length">
        <h3 class="font-medium mb-3">
          Customers
        </h3>
        <div class="border rounded divide-y">
          <div
            v-for="customer in customers"
            :key="customer.id"
            class="p-3"
          >
            <div class="flex justify-between items-center">
              <div>
                <div class="font-medium">
                  {{ customer.name }}
                </div>
                <div class="text-sm text-gray-600">
                  {{ customer.email }}
                </div>
              </div>
              <div class="flex gap-2">
                <button
                  class="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
                  @click="selectCustomer(customer)"
                >
                  Select
                </button>
                <button
                  class="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                  @click="deleteCustomer(customer.id)"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Subscription Management (only shown when a customer is selected) -->
    <div
      v-if="selectedCustomer"
      class="mb-10 p-6 border rounded-lg shadow-sm"
    >
      <h2 class="text-xl font-semibold mb-4">
        Subscription Management for {{ selectedCustomer.name }}
      </h2>

      <!-- Create Subscription Form -->
      <form
        class="mb-6"
        @submit.prevent="createSubscription"
      >
        <div class="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium mb-1">Amount</label>
            <input
              v-model="newSubscription.amount.value"
              type="text"
              class="w-full p-2 border rounded"
            >
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Currency</label>
            <select
              v-model="newSubscription.amount.currency"
              class="w-full p-2 border rounded"
            >
              <option value="EUR">
                EUR
              </option>
              <option value="USD">
                USD
              </option>
              <option value="GBP">
                GBP
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Interval</label>
            <select
              v-model="newSubscription.interval"
              class="w-full p-2 border rounded"
            >
              <option value="1 day">
                Daily
              </option>
              <option value="1 week">
                Weekly
              </option>
              <option value="1 month">
                Monthly
              </option>
              <option value="1 year">
                Yearly
              </option>
            </select>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Description</label>
          <input
            v-model="newSubscription.description"
            class="w-full p-2 border rounded"
          >
        </div>
        <button
          type="submit"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Create Subscription
        </button>
      </form>

      <!-- Subscription List -->
      <div v-if="subscriptions.length">
        <h3 class="font-medium mb-3">
          Active Subscriptions
        </h3>
        <div class="border rounded divide-y">
          <div
            v-for="subscription in subscriptions"
            :key="subscription.id"
            class="p-3"
          >
            <div class="flex justify-between items-center">
              <div>
                <div class="font-medium">
                  {{ subscription.description }}
                </div>
                <div class="text-sm text-gray-600">
                  {{ subscription.amount.currency }} {{ subscription.amount.value }} / {{ subscription.interval }}
                </div>
              </div>
              <button
                class="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                @click="cancelSubscription(subscription.id)"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Status Messages -->
    <div
      v-if="statusMessage"
      class="p-4 mb-6 rounded-lg"
      :class="statusSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
    >
      {{ statusMessage }}
    </div>
  </div>
</template>

<script setup>
const mollie = useMollie()

// Customer state
const newCustomer = ref({
  name: '',
  email: '',
})
const customers = ref([])
const selectedCustomer = ref(null)

// Subscription state
const newSubscription = ref({
  amount: {
    currency: 'EUR',
    value: '25.00',
  },
  interval: '1 month',
  description: 'Monthly subscription',
})
const subscriptions = ref([])

// Status messages
const statusMessage = ref('')
const statusSuccess = ref(true)

// Show status message
const showStatus = (message, success = true) => {
  statusMessage.value = message
  statusSuccess.value = success
  setTimeout(() => {
    statusMessage.value = ''
  }, 3000)
}

// Customer methods
const loadCustomers = async () => {
  try {
    const response = await mollie.customers.list()
    if (response.success && response.data?._embedded?.customers) {
      customers.value = response.data._embedded.customers
    }
  }
  catch (error) {
    console.log(error)
    showStatus('Failed to load customers', false)
  }
}

const createCustomer = async () => {
  try {
    const response = await mollie.customers.create(newCustomer.value)
    if (response.success && response.data) {
      customers.value.push(response.data)
      newCustomer.value = { name: '', email: '' }
      showStatus('Customer created successfully')
    }
    else {
      showStatus(response.error?.title || 'Failed to create customer', false)
    }
  }
  catch (error) {
    console.log(error)
    showStatus('Error creating customer', false)
  }
}

const deleteCustomer = async (id) => {
  try {
    const response = await mollie.customers.delete(id)
    if (response.success) {
      customers.value = customers.value.filter(customer => customer.id !== id)
      if (selectedCustomer.value?.id === id) {
        selectedCustomer.value = null
        subscriptions.value = []
      }
      showStatus('Customer deleted successfully')
    }
    else {
      showStatus(response.error?.title || 'Failed to delete customer', false)
    }
  }
  catch (error) {
    console.log(error)
    showStatus('Error deleting customer', false)
  }
}

const selectCustomer = async (customer) => {
  selectedCustomer.value = customer
  await loadSubscriptions(customer.id)
}

// Subscription methods
const loadSubscriptions = async (customerId) => {
  try {
    const response = await mollie.subscriptions.list(customerId)
    if (response.success && response.data?._embedded?.subscriptions) {
      subscriptions.value = response.data._embedded.subscriptions
    }
    else {
      subscriptions.value = []
    }
  }
  catch (error) {
    console.log(error)
    subscriptions.value = []
    showStatus('Failed to load subscriptions', false)
  }
}

const createSubscription = async () => {
  if (!selectedCustomer.value) return

  try {
    const response = await mollie.subscriptions.create(
      selectedCustomer.value.id,
      newSubscription.value,
    )
    if (response.success && response.data) {
      subscriptions.value.push(response.data)
      showStatus('Subscription created successfully')
    }
    else {
      showStatus(response.error?.title || 'Failed to create subscription', false)
    }
  }
  catch (error) {
    console.log(error)
    showStatus('Error creating subscription', false)
  }
}

const cancelSubscription = async (id) => {
  if (!selectedCustomer.value) return

  try {
    const response = await mollie.subscriptions.cancel(
      selectedCustomer.value.id,
      id,
    )
    if (response.success) {
      subscriptions.value = subscriptions.value.filter(sub => sub.id !== id)
      showStatus('Subscription cancelled successfully')
    }
    else {
      showStatus(response.error?.title || 'Failed to cancel subscription', false)
    }
  }
  catch (error) {
    console.log(error)
    showStatus('Error cancelling subscription', false)
  }
}

// Load customers on component mount
onMounted(async () => {
  await loadCustomers()
})
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>
