import {
    i19asOf,
    i19from,
    i19interestFree,
    i19of,
    i19to,
    i19upTo,
    i19youEarn
  } from '@ecomplus/i18n'
  
  import {
    i18n,
    price as getPrice,
    onPromotion as checkOnPromotion,
    formatMoney
  } from '@ecomplus/utils'
  
  import waitStorefrontInfo from '@ecomplus/storefront-components/src/js/helpers/wait-storefront-info'
  
  const getPriceWithDiscount = (price, discount) => {
    const { type, value } = discount
    let priceWithDiscount
    if (value) {
      if (type === 'percentage') {
        priceWithDiscount = price * (100 - value) / 100
      } else {
        priceWithDiscount = price - value
      }
      return priceWithDiscount > 0 ? priceWithDiscount : 0
    }
  }
  
  export default {
    name: 'APrices',
  
    props: {
      product: {
        type: Object,
        required: true
      },
      isLiteral: Boolean,
      isBig: Boolean,
      isAmountTotal: Boolean,
      installmentsOption: Object,
      discountOption: Object,
      discountText: {
        type: [String, Boolean],
        default: ''
      },
      canShowPriceOptions: {
        type: Boolean,
        default: true
      }
    },
  
    data () {
      return {
        installmentsNumber: 0,
        monthlyInterest: 0,
        discount: {
          type: null,
          value: 0
        },
        extraDiscount: {
          type: null,
          value: 0,
          min_amount: 0
        },
        discountLabel: this.discountText,
        pointsProgramName: null,
        pointsMinPrice: 0,
        earnPointsFactor: 0,
        restrictIds: [
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
      i19asOf: () => i18n(i19asOf),
      i19from: () => i18n(i19from),
      i19interestFree: () => i18n(i19interestFree),
      i19of: () => i18n(i19of),
      i19to: () => i18n(i19to),
      i19upTo: () => i18n(i19upTo),
      i19youEarn: () => i18n(i19youEarn),

      restrictInstallments () {
        const arraySkus = window.creditCardRestrict
        const arrayIds = this.restrictIds
        const { ecomCart } = window
        if (this.product.sku && !this.product.product_id) {
          return arrayIds.some(ids => ids === this.product._id)
        } else if (ecomCart && ecomCart.data && ecomCart.data.items && ecomCart.data.items.length) {
            return ecomCart.data.items.some(({ product_id }) => arrayIds.includes(product_id))
        }
        if (this.product.sku) {
            return arraySkus.some(sku => sku === this.product.sku)
        } else if (ecomCart && ecomCart.data && ecomCart.data.items && ecomCart.data.items.length) {
            return ecomCart.data.items.some(({ sku }) => arraySkus.includes(sku))
        }
        return false 
      },
  
      price () {
        const price = getPrice(this.product)
        if (
          this.extraDiscount.value &&
          (!this.extraDiscount.min_amount || price > this.extraDiscount.min_amount)
        ) {
          return getPriceWithDiscount(price, this.extraDiscount)
        }
        return price
      },
  
      comparePrice () {
        if (checkOnPromotion(this.product)) {
          return this.product.base_price
        } else if (this.extraDiscount.value) {
          return getPrice(this.product)
        }
      },
  
      hasVariedPrices () {
        const { variations } = this.product
        if (variations) {
          const productPrice = getPrice(this.product)
          for (let i = 0; i < variations.length; i++) {
            const price = getPrice({
              ...this.product,
              ...variations[i]
            })
            if (price > productPrice) {
              return true
            }
          }
        }
        return false
      },
  
      priceWithDiscount () {
        return this.canShowPriceOptions && getPriceWithDiscount(this.price, this.discount)
      },
  
      installmentValue () {
        if (this.canShowPriceOptions && this.installmentsNumber >= 2) {
          if (!this.monthlyInterest) {
            return this.price / this.installmentsNumber
          } else {
            const interest = this.monthlyInterest / 100
            return this.price * interest /
              (1 - Math.pow(1 + interest, -this.installmentsNumber))
          }
        }
        return 0
      }
    },
  
    methods: {
      formatMoney,
  
      updateInstallments (installments) {
        if (installments) {
          this.monthlyInterest = installments.monthly_interest
          const minInstallment = installments.min_installment || 5
          const installmentsNumber = parseInt(this.price / minInstallment, 10)
          this.installmentsNumber = Math.min(installmentsNumber, installments.max_number)
        }
      },
  
      updateDiscount (discount) {
        if (
          discount &&
          (!discount.min_amount || discount.min_amount <= this.price) &&
          (!this.isAmountTotal || discount.apply_at === 'total')
        ) {
          this.discount = discount
          if (!this.discountText && this.discountText !== false && discount.label) {
            this.discountLabel = `via ${discount.label}`
          }
        }
      }
    },
  
    watch: {
      price: {
        handler (price) {
          this.$emit('fix-price', price)
        },
        immediate: true
      }
    },
  
    created () {
      if (this.canShowPriceOptions) {
        if (this.discountOption) {
          this.updateDiscount(this.discountOption)
        } else {
          waitStorefrontInfo('apply_discount')
            .then(discountCampaign => {
              if (discountCampaign.available_extra_discount) {
                this.extraDiscount = discountCampaign.available_extra_discount
              }
            })
        }
        if (this.installmentsOption) {
          this.updateInstallments(this.installmentsOption)
        } else {
          waitStorefrontInfo('list_payments')
            .then(paymentInfo => {
              this.updateInstallments(paymentInfo.installments_option)
              this.updateDiscount(paymentInfo.discount_option)
              const pointsPrograms = paymentInfo.loyalty_points_programs
              if (this.isLiteral && pointsPrograms) {
                this.$nextTick(() => {
                  for (const programId in pointsPrograms) {
                    const pointsProgram = pointsPrograms[programId]
                    if (pointsProgram && pointsProgram.earn_percentage > 0) {
                      this.pointsMinPrice = pointsProgram.min_subtotal_to_earn
                      this.pointsProgramName = pointsProgram.name
                      this.earnPointsFactor = pointsProgram.earn_percentage / 100
                      break
                    }
                  }
                })
              }
            })
        }
      }
    }
  }
  