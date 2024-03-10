import {
    i19anyPaymentMethodMsg,
    i19changePaymentMethod,
    i19checkout,
    i19chooseSubscriptionPeriod,
    i19generateBillet,
    i19interestFree,
    i19ofDiscount,
    i19onFreight,
    i19paymentError,
    i19paymentErrorMsg,
    i19recurrent,
    i19subscription,
    i19total,
    i19tryAgain,
    i19upTo
  } from '@ecomplus/i18n'
  
  import {
    i18n,
    price as getPrice,
    formatMoney,
    $ecomConfig
  } from '@ecomplus/utils'
  
  import { modules } from '@ecomplus/client'
  import ecomCart from '@ecomplus/shopping-cart'
  import loadPaymentClient from '@ecomplus/storefront-app/src/lib/load-payment-client'
  import { sortApps } from '@ecomplus/storefront-app/src/lib/utils'
  import CreditCardForm from '@ecomplus/storefront-app/src/components/CreditCardForm.vue'
  
  export default {
    name: 'PaymentMethods',
  
    components: {
      CreditCardForm
    },
  
    props: {
      amount: {
        type: Object,
        required: true
      },
      cartItems: Array,
      customer: Object,
      paymentGateways: {
        type: Array,
        default () {
          return window.ecomPaymentGateways || []
        }
      },
      defaultAppId: {
        type: Number,
        default () {
          return window.ecomDefaultPaymentApp
        }
      },
      appsSort: {
        type: Array,
        default () {
          return window.ecomPaymentApps || []
        }
      },
      canUpdateGateways: {
        type: Boolean,
        default: !(window.ecomPaymentGateways && window.ecomPaymentGateways.length)
      },
      canGroupRecurrentGateways: {
        type: Boolean,
        default: window.ecomGroupRecurrentGateways !== false
      },
      ecomCart: {
        type: Object,
        default () {
          return ecomCart
        }
      }
    },
  
    data () {
      return {
        isWaiting: false,
        fetching: null,
        processingAppId: undefined,
        hasLoaded: false,
        selectedGateway: -1,
        loadedClients: {},
        restrictIds: [
          "65ec925e87ab487fbfdd9152",
          "627be2da3da6d37bc22e3a8a",
    "627be2863da6d37bc22e3914",
    "627be2e33da6d37bc22e3abe",
    "627be2723da6d37bc22e38bb",
    "629e4d23ac0cb4200f06dd0b",
    "627be2803da6d37bc22e38f4",
    "627be2f43da6d37bc22e3b1c",
    "627be2fa3da6d37bc22e3b3c",
    "627be2843da6d37bc22e390b",
    "627be2eb3da6d37bc22e3aea",
    "627be2f03da6d37bc22e3b09",
    "627be2fb3da6d37bc22e3b43",
    "627be2733da6d37bc22e38be",
    "627be27c3da6d37bc22e38e3",
    "627be27d3da6d37bc22e38e6",
    "627be2873da6d37bc22e391c",
    "627be2d53da6d37bc22e3a78",
    "627be2ec3da6d37bc22e3aee",
    "627be2ed3da6d37bc22e3af4",
    "627be2f23da6d37bc22e3b13",
    "627be2f83da6d37bc22e3b33",
    "627be2ee3da6d37bc22e3afe",
    "627be2f53da6d37bc22e3b20",
    "627be2f93da6d37bc22e3b37",
    "627be2fe3da6d37bc22e3b54",
    "627be2563da6d37bc22e384d",
    "627be27b3da6d37bc22e38df",
    "627be27e3da6d37bc22e38ea",
    "627be2853da6d37bc22e3910",
    "627be2ef3da6d37bc22e3b05",
    "627be3633da6d37bc22e3d5c",
    "627be2633da6d37bc22e387e",
    "627be2f73da6d37bc22e3b2d",
    "627be2ff3da6d37bc22e3b5a",
    "627be2893da6d37bc22e392a",
    "627be2fc3da6d37bc22e3b49",
    "627be3013da6d37bc22e3b66",
    "627be3003da6d37bc22e3b60",
    "627be3023da6d37bc22e3b6e",
    "627be3033da6d37bc22e3b73",
    "627be7783da6d37bc22e4ebe",
    "627be2883da6d37bc22e3922",
    "627be3603da6d37bc22e3d4d",
    "627be2e03da6d37bc22e3aaa",
    "63090ff973321213f8596356",
    "627be2e73da6d37bc22e3ad9",
    "632d01a273321213f8891293",
    "627be24e3da6d37bc22e383c",
    "627be2f13da6d37bc22e3b0d",
    "627be3713da6d37bc22e3d9e",
    "6566120c2cd6b65959c159df",
    "65660bc12cd6b65959c149e0",
    "652b17d22cd6b659597a7c4c",
    "634f54f173321213f8b25a80",
    "6340bad573321213f8a1f222",
    "650e11082cd6b6595959f24d",
    "64fa383d2cd6b65959425f10",
    "64fa34df2cd6b65959425cb9",
    "6491ee025e6069037041a90b",
    "6491c9285e60690370415b0b",
    "648bba105e606903703b7758",
    "648bb6355e606903703b7390",
    "648bb35a5e606903703b70f4",
    "6489ca555e606903703915c3",
    "648911485e606903703871e8",
    "6393d2a073321213f80d5069",
    "634ee9ea73321213f8b199e3",
    "631fcad073321213f872b72f",
    "65298f342cd6b659597961c4",
    "650f56012cd6b659595ab887",
    "650ba3f72cd6b6595956e0d3",
    "650f210a2cd6b659595a9050",
    "64b7dd5d5e606903706a3c81",
    "648bbdf75e606903703b7a6c",
    "6489a3795e6069037038c77c",
    "648993b45e6069037038aed3",
    "63bd807e4834634f732f4dd6",
    "64b6b6b75e6069037068f34d",
    "64a58dfb5e606903705513ef",
    "649205e15e6069037041ddee",
    "627be72b3da6d37bc22e4d91",
    "64b6d9f55e6069037069358c",
    "6498688e5e60690370483075",
    "63a5f7f04834634f731d4fb9",
    "648ce4045e606903703cd25e",
    "648cdc615e606903703cca78",
    "64b0bfd75e6069037063d99f",
    "64b074175e60690370639632",
    "64affc585e6069037062b5ab",
    "64aff6625e6069037062a68c",
    "64af58d35e606903706200df",
    "6314799d73321213f865e17b",
    "64b5e4b15e606903706851b3",
    "64b5e0975e60690370684cda",
    "627be7203da6d37bc22e4d5a",
    "627be72e3da6d37bc22e4da1",
    "627be72d3da6d37bc22e4d9e",
    "627be5373da6d37bc22e446a",
    "627be4dd3da6d37bc22e4345",
    "62919888ac0cb4200feebf01",
    "627be6083da6d37bc22e4814",
    "627be70c3da6d37bc22e4cdc",
    "627be4cf3da6d37bc22e4311",
    "627be52a3da6d37bc22e4431",
    "627be4d73da6d37bc22e4330",
    "627be4d83da6d37bc22e4334",
    "627be6af3da6d37bc22e4b06",
    "627be5303da6d37bc22e444b",
    "627be62c3da6d37bc22e48e0",
    "627be6b13da6d37bc22e4b12",
    "627be7053da6d37bc22e4cad",
    "627be7133da6d37bc22e4d0a",
    "627be71c3da6d37bc22e4d45",
    "627be52e3da6d37bc22e4444",
    "627be2733da6d37bc22e38be",
    "627be4c53da6d37bc22e42eb",
    "627be51f3da6d37bc22e43f4",
    "627be53c3da6d37bc22e4486",
    "627be54e3da6d37bc22e44e6",
    "627be6233da6d37bc22e48bb",
    "627be7073da6d37bc22e4cbc",
    "627be71a3da6d37bc22e4d3d",
    "627be7253da6d37bc22e4d72",
    "627be7293da6d37bc22e4d87",
    "627be77d3da6d37bc22e4ed0",
    "627be7823da6d37bc22e4eeb",
    "627beb5b3da6d37bc22e6021",
    "649205e15e6069037041ddee",
    "64b6d9f55e6069037069358c",
    "627be4af3da6d37bc22e42a4",
    "627be5283da6d37bc22e442a",
    "627be5553da6d37bc22e450f",
    "627be6113da6d37bc22e4843",
    "627be6133da6d37bc22e4847",
    "627be6213da6d37bc22e48ac",
    "627be6263da6d37bc22e48c5",
    "627be62f3da6d37bc22e48ea",
    "627be6353da6d37bc22e4908",
    "627be6a23da6d37bc22e4ab3",
    "627be6b03da6d37bc22e4b09",
    "627be7143da6d37bc22e4d14",
    "627be7173da6d37bc22e4d29",
    "627be7193da6d37bc22e4d34",
    "627be71e3da6d37bc22e4d4d",
    "627be71f3da6d37bc22e4d54",
    "627be72c3da6d37bc22e4d96",
    "627be72f3da6d37bc22e4da8",
    "627be7753da6d37bc22e4ea9",
    "627be7803da6d37bc22e4edf",
    "627be7933da6d37bc22e4f61",
    "627be79a3da6d37bc22e4f8e",
    "627be7a23da6d37bc22e4fbe",
    "627be7a83da6d37bc22e4fdc",
    "629194ffac0cb4200feeba03",
    "62a1f407ac0cb4200f0d9f46",
    "627be5403da6d37bc22e449d",
    "627be5443da6d37bc22e44af",
    "627be6aa3da6d37bc22e4ae6",
    "627be7003da6d37bc22e4c8c",
    "627be7163da6d37bc22e4d25",
    "627be7883da6d37bc22e4f14",
    "627be7943da6d37bc22e4f67",
    "627be7a03da6d37bc22e4fb4",
    "627be7a63da6d37bc22e4fd1",
    "62b3bbb9eb859112166121e1",
    "627be4c43da6d37bc22e42e8",
    "627be4a53da6d37bc22e428e",
    "627be4ce3da6d37bc22e430c",
    "627be5353da6d37bc22e445f",
    "627be6333da6d37bc22e4900",
    "627be6923da6d37bc22e4a59",
    "627be6ae3da6d37bc22e4b01",
    "627be7013da6d37bc22e4c95",
    "627be7793da6d37bc22e4ec1",
    "627be79e3da6d37bc22e4fab",
    "627bf8e43da6d37bc22e8f4b",
    "6342eef373321213f8a395dc",
    "627be4cc3da6d37bc22e4306",
    "627be5193da6d37bc22e43ce",
    "627be54d3da6d37bc22e44e1",
    "627be6863da6d37bc22e4a24",
    "627be6ef3da6d37bc22e4c2a",
    "627be6973da6d37bc22e4a75",
    "627be7083da6d37bc22e4cc7",
    "627be70d3da6d37bc22e4ce3",
    "627be72b3da6d37bc22e4d91",
    "627be7963da6d37bc22e4f72",
    "627bf8cb3da6d37bc22e8ecc",
    "6342f38873321213f8a39a97",
    "634ee9ea73321213f8b199e3",
    "634f54f173321213f8b25a80",
    "627be4be3da6d37bc22e42d0",
    "627be53e3da6d37bc22e448f",
    "627be5493da6d37bc22e44cd",
    "627be54c3da6d37bc22e44db",
    "627be5513da6d37bc22e44f9",
    "627be62d3da6d37bc22e48e3",
    "627be62e3da6d37bc22e48e6",
    "627be69d3da6d37bc22e4a90",
    "627be7233da6d37bc22e4d69",
    "627be79d3da6d37bc22e4fa8",
    "62b3b6e1eb8591121661181c",
    "62f2ba2eeb85911216ac8e77",
    "630acc1673321213f85ad09c",
    "632b534c73321213f8866f0d",
    "627be6883da6d37bc22e4a2c",
    "627be6a73da6d37bc22e4ad2",
    "627be7783da6d37bc22e4ebe",
    "627be7863da6d37bc22e4eff",
    "63a5fc504834634f731d543d",
    "627be63a3da6d37bc22e491c",
    "627be6833da6d37bc22e4a12",
    "627be7a33da6d37bc22e4fc3",
    "62f2bc6beb85911216ac933c",
    "627be6a13da6d37bc22e4aae",
    "62b458f0eb8591121661bb96",
    "63090ff973321213f8596356",
    "627be4cd3da6d37bc22e4309",
    "64b5e0975e60690370684cda",
    "6570f8ec2cd6b65959d056df",
    "657e34322cd6b65959e0187f",
    "657e3abb2cd6b65959e01c3b",
    "657e44622cd6b65959e0225b",
    "657e48e22cd6b65959e0246f",
    "658368bc2cd6b65959e52435",
    "658490b12cd6b65959e658f9",
    "65871a612cd6b65959e83380",
    "649876595e6069037048355f",
    "64b033535e60690370631d03",
    "649876595e6069037048355f",
    "65ddd50187ab487fbfca1ffd",
    "657e44622cd6b65959e0225b"
        ]
      }
    },
  
    computed: {
      i19anyPaymentMethodMsg: () => i18n(i19anyPaymentMethodMsg),
      i19changePaymentMethod: () => i18n(i19changePaymentMethod),
      i19chooseSubscriptionPeriod: () => i18n(i19chooseSubscriptionPeriod),
      i19checkout: () => i18n(i19checkout),
      i19generateBillet: () => i18n(i19generateBillet),
      i19interestFree: () => i18n(i19interestFree),
      i19ofDiscount: () => i18n(i19ofDiscount),
      i19onFreight: () => i18n(i19onFreight),
      i19recurrent: () => i18n(i19recurrent),
      i19subscription: () => i18n(i19subscription),
      i19total: () => i18n(i19total),
      i19tryAgain: () => i18n(i19tryAgain),
      i19upTo: () => i18n(i19upTo),
  
      items () {
        return this.cartItems || this.ecomCart.data.items
      },

      restrictInstallments () {
        const arraySkus = window.creditCardRestrict
        const arrayIds = this.restrictIds
        if (this.items && this.items.length) {
          const skus = []
          const ids = []
          if (arrayIds && arrayIds.length) {
            this.items.forEach(item => ids.push(item.product_id))
            return this.items.some(({ product_id }) => arrayIds.includes(product_id))
          }
          this.items.forEach(item => skus.push(item.sku))
            return this.items.some(({ sku }) => arraySkus.includes(sku)) || arraySkus.some(sku => skus.some(skuItem => {
              const skuSplit = sku.split('-')
              return skuItem.includes(sku) || skuSplit.some(split => skuItem.includes(split))
            }))
        }
        return false 
      },
  
      paymentGateway () {
        return this.paymentGateways[this.selectedGateway] || {}
      },
  
      jsClient () {
        return this.paymentGateway.js_client
      },
  
      jsClientLoad () {
        const { amount, customer, items, loadedClients, selectedGateway } = this
        if (amount.total) {
          return loadedClients[selectedGateway].then(runOnloadExpression => {
            if (this.$refs.gatewayContainer) {
              this.$refs.gatewayContainer.innerHTML = this.jsClient.container_html
            }
            const payload = runOnloadExpression({ amount, customer, items })
            const transactionPromise = this.jsClient.transaction_promise
            if (transactionPromise && selectedGateway === this.selectedGateway) {
              try {
                window[transactionPromise]
                  .then(this.checkout)
                  .catch(err => {
                    console.error(err)
                    this.$toast({
                      title: i18n(i19paymentError),
                      body: i18n(i19paymentErrorMsg),
                      variant: 'danger'
                    })
                  })
              } catch (err) {
                console.error(err)
              }
            }
            return payload
          })
        } else {
          return Promise.resolve()
        }
      },
  
      canShowGatewayIcon () {
        return this.selectedGateway === -1 || !this.jsClient || !this.jsClient.container_html
      },
  
      shouldUseCardForm () {
        switch (this.paymentGateway.payment_method.code) {
          case 'credit_card':
            return true
          case 'debit_card':
          case 'balance_on_intermediary':
            return Boolean(this.jsClient)
        }
        return false
      },
  
      cardFormGatewayOptions () {
        if (this.paymentGateway.type === 'recurrence' && this.canGroupRecurrentGateways) {
          return this.paymentGateways.filter(({ type }) => type === 'recurrence')
        }
        return null
      },
  
      isCompany () {
        return this.customer && this.customer.registry_type !== 'p'
      },
  
      customerName () {
        return this.customer && this.customer.name && this.customer.name.given_name
      }
    },
  
    methods: {
      formatMoney,
  
      checkListedGateway (gateway, i) {
        if (gateway.payment_method.code !== 'loyalty_points') {
          if (this.canGroupRecurrentGateways) {
            const checkRecurrentCardGateway = (gateway) => {
              return gateway.type === 'recurrence' &&
                gateway.payment_method.code === 'credit_card'
            }
            if (checkRecurrentCardGateway(gateway)) {
              return i === this.paymentGateways.findIndex((gateway) => {
                return checkRecurrentCardGateway(gateway)
              })
            }
          }
          return true
        }
        return false
      },
  
      checkShownGateway (gateway, i) {
        return this.selectedGateway === -1 ||
          this.selectedGateway === i ||
          (this.canGroupRecurrentGateways &&
            gateway.type === 'recurrence' &&
            this.paymentGateway.type === 'recurrence')
      },
  
      gatewayIcon (gateway) {
        switch (gateway.payment_method.code) {
          case 'credit_card':
            return 'credit-card'
          case 'banking_billet':
            return 'barcode'
        }
        return 'money-check'
      },
  
      installmentOption (gateway) {
        let bestOption
        if (gateway.installment_options) {
          gateway.installment_options.forEach(option => {
            if (
              !bestOption ||
              (!option.tax && bestOption.tax) ||
              (option.tax === bestOption.tax && option.number > bestOption.number)
            ) {
              bestOption = option
            }
          })
        }
        return bestOption
      },
  
      setupGatewayClient (paymentGateway, gatewayIndex) {
        const jsClient = paymentGateway.js_client
        if (jsClient) {
          this.loadedClients[gatewayIndex] = loadPaymentClient(jsClient, true)
        }
      },
  
      postHandleGateways () {
        this.paymentGateways.forEach(this.setupGatewayClient)
        if (!this.hasLoaded && this.paymentGateways.length) {
          this.hasLoaded = true
          if (this.defaultAppId && this.selectedGateway === -1) {
            this.selectedGateway = this.paymentGateways.findIndex(gateway => {
              return gateway.app_id === this.defaultAppId
            })
          }
        }
      },
  
      parsePaymentOptions (listResult = [], isUpdatingSelected) {
        let { paymentGateways } = this
        if (!isUpdatingSelected) {
          paymentGateways = []
          this.loadedClients = {}
        }
        if (listResult.length) {
          listResult.forEach(appResult => {
            const { validated, error, response } = appResult
            if (validated && !error) {
              let showOption = this.restrictInstallments
              response.payment_gateways.forEach(gateway => {
                showOption = showOption && ((gateway.payment_method.code === 'credit_card') || (gateway.payment_method.code === 'balance_on_intermediary'))
                const paymentGateway = {
                  app_id: appResult.app_id,
                  installment_option: this.installmentOption(gateway),
                  ...gateway
                }
                if (!isUpdatingSelected && !showOption) {
                  if (paymentGateway.type !== 'recurrence') {
                    paymentGateways.push(paymentGateway)
                  } else {
                    paymentGateways.unshift(paymentGateway)
                  }
                } else {
                  this.setupGatewayClient(paymentGateway, this.selectedGateway)
                  paymentGateways[this.selectedGateway] = paymentGateway
                  isUpdatingSelected = false
                }
              })
            }
          })
        }
        if (Array.isArray(this.appsSort) && this.appsSort.length) {
            sortApps(listResult, this.appsSort)
        }
        this.$emit('update:payment-gateways', paymentGateways)
      },
  
      fetchPaymentGateways (appId = null, isRetry = false) {
        let url = '/list_payments.json'
        const method = 'POST'
        const { items } = this
        const amount = this.amount ? { ...this.amount } : {}
        if (typeof amount.subtotal !== 'number') {
          amount.total = amount.subtotal = items
            .reduce((subtotal, item) => subtotal + getPrice(item) * item.quantity, 0)
          if (amount.freight) {
            amount.total += amount.freight
          }
          if (amount.discount) {
            amount.total -= amount.discount
          }
        }
        const data = {
          items,
          amount,
          domain: window.location.hostname,
          can_fetch_when_selected: true,
          currency_id: items[0].currency_id || $ecomConfig.get('currency'),
          currency_symbol: items[0].currency_symbol || $ecomConfig.get('currency_symbol')
        }
        if (!isRetry && this.customer) {
          data.customer = {}
          for (const prop in this.customer) {
            const val = this.customer[prop]
            if (val && (typeof val !== 'object' || Object.keys(val).length)) {
              data.customer[prop] = val
            }
          }
        }
        if (appId > 0) {
          url += `?app_id=${appId}`
          if (this.paymentGateway.payment_method) {
            data.payment_method = this.paymentGateway.payment_method
          }
        }
        if (!this.isWaiting || this.processingAppId !== appId) {
          this.isWaiting = true
          this.processingAppId = appId
          setTimeout(() => {
            this.fetching = modules({ url, method, data })
              .then(({ data }) => {
                this.parsePaymentOptions(data.result, Boolean(appId && this.selectedGateway >= 0))
              })
              .catch(err => {
                console.error(err)
                if (!isRetry) {
                  setTimeout(() => {
                    this.fetchPaymentGateways(appId, true)
                  }, err.response && err.response.status === 400 ? 50 : 500)
                }
              })
              .finally(() => {
                this.isWaiting = false
              })
          }, appId ? 5 : 50)
        }
      },
  
      onCardFormSelectGateway (gateway) {
        this.selectedGateway = this.paymentGateways.findIndex((paymentGateway) => {
          return gateway === paymentGateway
        })
      },
  
      handleCheckout () {
        if (!this.jsClient || !this.jsClient.transaction_promise || !this.jsClientLoad.toString()) {
          this.checkout()
        }
      },
  
      checkout (transaction) {
        this.$emit('checkout', {
          ...this.paymentGateway,
          ...transaction
        })
      }
    },
  
    watch: {
      selectedGateway: {
        handler (gatewayIndex) {
          const { paymentGateway, loadedClients } = this
          const proceed = () => {
            this.$emit('select-gateway', paymentGateway)
            if (paymentGateway.fetch_when_selected) {
              this.fetchPaymentGateways(paymentGateway.app_id)
            }
          }
          if (loadedClients[gatewayIndex]) {
            loadedClients[gatewayIndex].then(proceed)
          } else {
            proceed()
          }
        },
        immediate: true
      },
  
      paymentGateways: {
        handler (paymentGateways) {
          if (paymentGateways.length) {
            this.postHandleGateways()
          }
        },
        immediate: true
      },
  
      'amount.total' (total, oldTotal) {
        if (
          ((total && !oldTotal) || Math.abs(total - oldTotal) > 0.1) &&
          this.selectedGateway === -1 &&
          this.canUpdateGateways
        ) {
          if (!this.isWaiting) {
            this.fetchPaymentGateways()
          } else {
            this.fetching.then(this.fetchPaymentGateways)
          }
        }
      }
    },
  
    created () {
      if (!this.paymentGateways.length) {
        this.fetchPaymentGateways()
      }
    }
  }
  