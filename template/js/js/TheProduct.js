import {
    i19addToFavorites,
    i19buy,
    i19close,
    i19days,
    i19discountOf,
    i19endsIn,
    i19freeShippingFrom,
    i19loadProductErrorMsg,
    i19offer,
    i19only,
    i19outOfStock,
    i19paymentOptions,
    i19perUnit,
    i19productionDeadline,
    i19removeFromFavorites,
    i19retry,
    i19selectVariationMsg,
    i19unavailable,
    i19units,
    i19unitsInStock,
    i19workingDays
  } from '@ecomplus/i18n'
  
  import {
    i18n,
    randomObjectId as genRandomObjectId,
    name as getName,
    inStock as checkInStock,
    onPromotion as checkOnPromotion,
    price as getPrice,
    img as getImg,
    variationsGrids as getVariationsGrids,
    specTextValue as getSpecTextValue,
    specValueByText as getSpecValueByText,
    formatMoney,
    $ecomConfig
  } from '@ecomplus/utils'
  
  import { store, modules } from '@ecomplus/client'
  import EcomSearch from '@ecomplus/search-engine'
  import ecomCart from '@ecomplus/shopping-cart'
  import { isMobile } from '@ecomplus/storefront-twbs'
  import lozad from 'lozad'
  import sortApps from '@ecomplus/storefront-components/src/js/helpers/sort-apps'
  import addIdleCallback from '@ecomplus/storefront-components/src/js/helpers/add-idle-callback'
  import scrollToElement from '@ecomplus/storefront-components/src/js/helpers/scroll-to-element'
  import { Portal } from '@linusborg/vue-simple-portal'
  import ALink from '@ecomplus/storefront-components/src/ALink.vue'
  import AAlert from '@ecomplus/storefront-components/src/AAlert.vue'
  import APicture from '@ecomplus/storefront-components/src/APicture.vue'
  import APrices from '@ecomplus/storefront-components/src/APrices.vue'
  import AShare from '@ecomplus/storefront-components/src/AShare.vue'
  import ProductVariations from '@ecomplus/storefront-components/src/ProductVariations.vue'
  import ProductGallery from '@ecomplus/storefront-components/src/ProductGallery.vue'
  import QuantitySelector from '@ecomplus/storefront-components/src/QuantitySelector.vue'
  import ShippingCalculator from '@ecomplus/storefront-components/src/ShippingCalculator.vue'
  import PaymentOption from '@ecomplus/storefront-components/src/PaymentOption.vue'
  import ecomPassport from '@ecomplus/passport-client'
  import { toggleFavorite, checkFavorite } from '@ecomplus/storefront-components/src/js/helpers/favorite-products'
  
  const storefront = (typeof window === 'object' && window.storefront) || {}
  const getContextBody = () => (storefront.context && storefront.context.body) || {}
  const getContextId = () => getContextBody()._id
  
  const sanitizeProductBody = body => {
    const product = Object.assign({}, body)
    delete product.body_html
    delete product.body_text
    delete product.specifications
    delete product.inventory_records
    delete product.price_change_records
    return product
  }
  
  export default {
    name: 'TheProduct',
  
    components: {
      Portal,
      ALink,
      AAlert,
      APicture,
      APrices,
      AShare,
      ProductVariations,
      ProductGallery,
      QuantitySelector,
      ShippingCalculator,
      PaymentOption
    },
  
    props: {
      productId: {
        type: String,
        default () {
          return getContextId()
        }
      },
      product: Object,
      headingTag: {
        type: String,
        default: 'h1'
      },
      buyText: String,
      galleryColClassName: {
        type: String,
        default: 'col-12 col-md-6'
      },
      hasPromotionTimer: Boolean,
      hasStickyBuyButton: {
        type: Boolean,
        default: true
      },
      hasQuantitySelector: Boolean,
      canAddToCart: {
        type: Boolean,
        default: true
      },
      hasBuyButton: {
        type: Boolean,
        default: true
      },
      lowQuantityToWarn: {
        type: Number,
        default: 12
      },
      maxVariationOptionsBtns: Number,
      isQuickview: Boolean,
      paymentAppsSort: {
        type: Array,
        default () {
          return window.ecomPaymentApps || []
        }
      },
      quoteLink: String,
      isSSR: Boolean,
      ecomPassport: {
        type: Object,
        default () {
          return ecomPassport
        }
      },
      accountUrl: {
        type: String,
        default: '/app/#/account/'
      }
    },
  
    data () {
      return {
        body: {},
        fixedPrice: null,
        selectedVariationId: null,
        currentGalleyImg: 1,
        isOnCart: false,
        qntToBuy: 1,
        isStickyBuyVisible: false,
        isFavorite: false,
        hasClickedBuy: false,
        hasLoadError: false,
        paymentOptions: [],
        customizations: [],
        kitItems: [],
        currentTimer: null,
        restrictIds: [
          "65fc7c4008d55b3b783bb6cd","669d934cf4e6d85ab2d9daf0","6329afcc73321213f88116f8","669d9c42f4e6d85ab2d9e30f","669da5fbf4e6d85ab2d9ed8c",,"648bb35a5e606903703b70f4",
"648993b45e6069037038aed3",
"6650e59df4e6d85ab2933cef",
"6570f8ec2cd6b65959d056df",
"6489a3795e6069037038c77c",
"65298f342cd6b659597961c4",
"627be6863da6d37bc22e4a24",
"627be6ef3da6d37bc22e4c2a",
"627be71b3da6d37bc22e4d40",
"6491e4135e606903704194ba",
"64898a745e6069037038aa92",
          "66118e450fc534303df1131e",
"6650e59df4e6d85ab2933cef",
          "64898a745e6069037038aa92",
          "649437c95e6069037044ad0a",
          "65fc8bd808d55b3b783bd71a",
          "65ec925e87ab487fbfdd9152",
          "65ddd50187ab487fbfca1ffd",
    "657e44622cd6b65959e0225b",
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
    "649876595e6069037048355f"
        ]
      }
    },
  
    computed: {
      i19addToFavorites: () => i18n(i19addToFavorites),
      i19close: () => i18n(i19close),
      i19days: () => i18n(i19days),
      i19discountOf: () => i18n(i19discountOf),
      i19endsIn: () => i18n(i19endsIn),
      i19freeShippingFrom: () => i18n(i19freeShippingFrom),
      i19loadProductErrorMsg: () => i18n(i19loadProductErrorMsg),
      i19offer: () => i18n(i19offer),
      i19only: () => i18n(i19only),
      i19outOfStock: () => i18n(i19outOfStock),
      i19paymentOptions: () => i18n(i19paymentOptions),
      i19perUnit: () => i18n(i19perUnit),
      i19productionDeadline: () => i18n(i19productionDeadline),
      i19removeFromFavorites: () => i18n(i19removeFromFavorites),
      i19retry: () => i18n(i19retry),
      i19selectVariationMsg: () => i18n(i19selectVariationMsg),
      i19unavailable: () => i18n(i19unavailable),
      i19quoteProduct: () => 'Cotar produto',
      i19units: () => i18n(i19units).toLowerCase(),
      i19unitsInStock: () => i18n(i19unitsInStock),
      i19workingDays: () => i18n(i19workingDays),
  
      selectedVariation () {
        return this.selectedVariationId
          ? this.body.variations.find(({ _id }) => _id === this.selectedVariationId)
          : {}
      },
  
      name () {
        return this.selectedVariation.name || getName(this.body)
      },
  
      isInStock () {
        return checkInStock(this.body)
      },
  
      isWithoutPrice () {
        return !getPrice(this.body)
      },
  
      isVariationInStock () {
        return checkInStock(this.selectedVariationId ? this.selectedVariation : this.body)
      },
  
      isLogged () {
        return ecomPassport.checkAuthorization()
      },
  
      thumbnail () {
        return getImg(this.body, null, 'small')
      },
  
      productQuantity () {
        if (this.selectedVariation.quantity) {
          return this.selectedVariation.quantity
        } else if (this.body.quantity) {
          return this.body.quantity
        }
      },
  
      isLowQuantity () {
        return this.productQuantity > 0 && this.lowQuantityToWarn > 0 &&
          this.productQuantity <= this.lowQuantityToWarn
      },
  
      strBuy () {
        return this.buyText || i18n(i19buy)
      },
  
      discount () {
        const { body } = this
        const priceValue = this.fixedPrice || getPrice(body)
        return checkOnPromotion(body) || (body.price > priceValue)
          ? Math.round(((body.base_price - priceValue) * 100) / body.base_price)
          : 0
      },

      restrictInstallments () {
        const arraySkus = window.creditCardRestrict
        const arrayIds = this.restrictIds
        if (arrayIds && arrayIds.length) {
          return arrayIds.some(id => id === this.body._id)
        }
        return arraySkus.some(sku => sku === this.body.sku)
      },
  
  
      isOnSale () {
        const { body } = this
        return this.hasPromotionTimer &&
          checkOnPromotion(body) &&
          body.price_effective_date &&
          body.price_effective_date.end &&
          Date.now() < new Date(body.price_effective_date.end).getTime()
      },
  
      ghostProductForPrices () {
        const prices = {}
        ;['price', 'base_price'].forEach(field => {
          let price = this.selectedVariation[field] || this.body[field]
          if (price !== undefined) {
            this.customizations.forEach(customization => {
              if (customization.add_to_price) {
                price += this.getAdditionalPrice(customization.add_to_price)
              }
            })
          }
          prices[field] = price
        })
        const ghostProduct = { ...this.body }
        if (this.selectedVariationId) {
          Object.assign(ghostProduct, this.selectedVariation)
          delete ghostProduct.variations
        }
        return {
          ...ghostProduct,
          ...prices,
          product_id: this.body._id
        }
      },
  
      hasVariations () {
        return this.body.variations && this.body.variations.length
      },
  
      isKit () {
        return this.body.kit_composition && this.body.kit_composition.length
      }
    },
  
    methods: {
      getVariationsGrids,
      getSpecValueByText,
  
      setBody (data) {
        this.body = {
          ...data,
          body_html: '',
          body_text: '',
          inventory_records: []
        }
        this.$emit('update:product', data)
      },
  
      fetchProduct (isRetry = false) {
        const { productId } = this
        return store({
          url: `/products/${productId}.json`,
          axiosConfig: {
            timeout: isRetry ? 2500 : 6000
          }
        })
          .then(({ data }) => {
            this.setBody(data)
            if (getContextId() === productId) {
              storefront.context.body = this.body
            }
            this.hasLoadError = false
          })
          .catch(err => {
            console.error(err)
            const { response } = err
            if (!response || !(response.status >= 400 && response.status < 500)) {
              if (!isRetry) {
                this.fetchProduct(true)
              } else {
                this.setBody(getContextBody())
                if (!this.body.name || !this.body.price || !this.body.pictures) {
                  this.hasLoadError = true
                }
              }
            }
          })
      },
  
      getAdditionalPrice ({ type, addition }) {
        return type === 'fixed'
          ? addition
          : getPrice(this.body) * addition / 100
      },
  
      formatAdditionalPrice (addToPrice) {
        if (addToPrice && addToPrice.addition) {
          return formatMoney(this.getAdditionalPrice(addToPrice))
        }
        return ''
      },
  
      setCustomizationOption (customization, text) {
        const index = this.customizations.findIndex(({ _id }) => _id === customization._id)
        if (text) {
          if (index > -1) {
            this.customizations[index].option = { text }
          } else {
            this.customizations.push({
              _id: customization._id,
              label: customization.label,
              add_to_price: customization.add_to_price,
              option: { text }
            })
          }
        } else if (index > -1) {
          this.customizations.splice(index, 1)
        }
      },
  
      showVariationPicture (variation) {
        if (variation.picture_id) {
          const pictureIndex = this.body.pictures.findIndex(({ _id }) => {
            return _id === variation.picture_id
          })
          this.currentGalleyImg = pictureIndex + 1
        }
      },
  
      handleGridOption ({ gridId, gridIndex, optionText }) {
        if (gridIndex === 0) {
          const variation = this.body.variations.find(variation => {
            return getSpecTextValue(variation, gridId) === optionText
          })
          if (variation) {
            this.showVariationPicture(variation)
          }
        }
      },
  
      toggleFavorite () {
        if (this.isLogged) {
          this.isFavorite = toggleFavorite(this.body._id, this.ecomPassport)
        }
      },
  
      buy () {
        this.hasClickedBuy = true
        const product = sanitizeProductBody(this.body)
        let variationId
        if (this.hasVariations) {
          if (this.selectedVariationId) {
            variationId = this.selectedVariationId
          } else {
            return
          }
        }
        const customizations = [...this.customizations]
        this.$emit('buy', { product, variationId, customizations })
        if (this.canAddToCart) {
          ecomCart.addProduct({ ...product, customizations }, variationId, this.qntToBuy)
        }
        this.isOnCart = true
      },
  
      buyOrScroll () {
        if (this.hasVariations || this.isKit) {
          scrollToElement(this.$refs.actions)
        } else {
          this.buy()
        }
      }
    },
  
    watch: {
      selectedVariationId (variationId) {
        if (variationId) {
          if (this.hasClickedBuy) {
            this.hasClickedBuy = false
          }
          const { pathname } = window.location
          const searchParams = new URLSearchParams(window.location.search)
          searchParams.set('variation_id', variationId)
          window.history.pushState({
            pathname,
            params: searchParams.toString()
          }, '', `${pathname}?${searchParams.toString()}`)
          this.showVariationPicture(this.selectedVariation)
        }
      },
  
      fixedPrice (price) {
        if (price > 0 && !this.isQuickview) {
          addIdleCallback(() => {
            modules({
              url: '/list_payments.json',
              method: 'POST',
              data: {
                amount: {
                  total: price
                },
                items: [{
                  ...sanitizeProductBody(this.body),
                  product_id: this.body._id
                }],
                currency_id: this.body.currency_id || $ecomConfig.get('currency'),
                currency_symbol: this.body.currency_symbol || $ecomConfig.get('currency_symbol')
              }
            })
              .then(({ data }) => {
                if (Array.isArray(this.paymentAppsSort) && this.paymentAppsSort.length) {
                  sortApps(data.result, this.paymentAppsSort)
                }
                this.paymentOptions = data.result
                  .reduce((paymentOptions, appResult) => {
                    if (appResult.validated) {
                        console.log(appResult)
                        if (this.restrictInstallments && appResult.response && appResult.response.payment_gateways && appResult.response.payment_gateways.length && (appResult.response.payment_gateways[0].payment_method.code !== 'credit_card' && appResult.response.payment_gateways[0].payment_method.code !== 'balance_on_intermediary')) {
                            paymentOptions.push({
                                app_id: appResult.app_id,
                                ...appResult.response
                            })
                        } else if (!this.restrictInstallments) {
                            paymentOptions.push({
                                app_id: appResult.app_id,
                                ...appResult.response
                            })
                        }
                    }
                    return paymentOptions
                  }, [])
                  .sort((a, b) => {
                    return a.discount_option && a.discount_option.value &&
                      !(b.discount_option && b.discount_option.value)
                      ? -1
                      : 1
                  })
              })
              .catch(console.error)
          })
        }
      },
  
      isKit: {
        handler (isKit) {
          if (isKit && !this.kitItems.length) {
            const kitComposition = this.body.kit_composition
            const ecomSearch = new EcomSearch()
            ecomSearch
              .setPageSize(kitComposition.length)
              .setProductIds(kitComposition.map(({ _id }) => _id))
              .fetch(true)
              .then(() => {
                ecomSearch.getItems().forEach(product => {
                  const { quantity } = kitComposition.find(({ _id }) => _id === product._id)
                  const addKitItem = variationId => {
                    const item = ecomCart.parseProduct(product, variationId, quantity)
                    if (quantity) {
                      item.min_quantity = item.max_quantity = quantity
                    } else {
                      item.quantity = 0
                    }
                    this.kitItems.push({
                      ...item,
                      _id: genRandomObjectId()
                    })
                  }
                  if (product.variations) {
                    product.variations.forEach(variation => {
                      variation._id = genRandomObjectId()
                      addKitItem(variation._id)
                    })
                  } else {
                    addKitItem()
                  }
                })
              })
              .catch(console.error)
          }
        },
        immediate: true
      }
    },
  
    created () {
      const presetQntToBuy = () => {
        this.qntToBuy = this.body.min_quantity || 1
      }
      if (this.product) {
        this.body = this.product
        if (this.isSSR) {
          this.fetchProduct().then(presetQntToBuy)
        } else {
          presetQntToBuy()
        }
      } else {
        this.fetchProduct().then(presetQntToBuy)
      }
      this.isFavorite = checkFavorite(this.body._id || this.productId, this.ecomPassport)
    },
  
    mounted () {
      if (this.$refs.sticky && !this.isWithoutPrice) {
        let isBodyPaddingSet = false
        const setStickyBuyObserver = (isToVisible = true) => {
          const $anchor = this.$refs[isToVisible ? 'sticky' : 'buy']
          if (!$anchor) {
            return
          }
          const $tmpDiv = document.createElement('div')
          $anchor.parentNode.insertBefore($tmpDiv, $anchor)
          if (isToVisible) {
            $tmpDiv.style.position = 'absolute'
            $tmpDiv.style.bottom = isMobile ? '-1600px' : '-1000px'
          }
          const obs = lozad($tmpDiv, {
            rootMargin: '100px',
            threshold: 0,
            load: () => {
              this.isStickyBuyVisible = isToVisible
              if (isToVisible && !isBodyPaddingSet) {
                this.$nextTick(() => {
                  const stickyHeight = this.$refs.sticky.offsetHeight
                  document.body.style.paddingBottom = `${(stickyHeight + 4)}px`
                  isBodyPaddingSet = true
                })
              }
              $tmpDiv.remove()
              setTimeout(() => {
                const createObserver = function () {
                  setStickyBuyObserver(!isToVisible)
                  document.removeEventListener('scroll', createObserver)
                }
                document.addEventListener('scroll', createObserver)
              }, 100)
            }
          })
          obs.observe()
        }
        setStickyBuyObserver()
      }
      if (this.isOnSale) {
        const promotionDate = new Date(this.body.price_effective_date.end)
        const now = Date.now()
        if (promotionDate.getTime() > now) {
          let targetDate
          const dayMs = 24 * 60 * 60 * 1000
          const daysBetween = Math.floor((promotionDate.getTime() - now) / dayMs)
          if (daysBetween > 2) {
            targetDate = new Date()
            targetDate.setHours(23, 59, 59, 999)
          } else {
            targetDate = promotionDate
          }
          const formatTime = (number) => number < 10 ? `0${number}` : number
          const getRemainingTime = () => {
            const distance = targetDate.getTime() - Date.now()
            const days = Math.floor(distance / dayMs)
            const hours = Math.floor((distance % dayMs) / (1000 * 60 * 60))
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((distance % (1000 * 60)) / 1000)
            return (days > 0 ? `${formatTime(days)}:` : '') +
              `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
          }
          this.currentTimer = setInterval(() => {
            this.$refs.timer.innerHTML = getRemainingTime()
          }, 1000)
        }
      }
    },
  
    destroyed () {
      if (this.currentTimer) {
        clearInterval(this.currentTimer)
      }
    }
  }
  
