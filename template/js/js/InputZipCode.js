import { i19zipCode } from '@ecomplus/i18n'
import { $ecomConfig, i18n } from '@ecomplus/utils'
import CleaveInput from 'vue-cleave-component'

export default {
  name: 'InputZipCode',

  components: {
    CleaveInput
  },

  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },

  data () {
    return {
      country: 'BR'
    }
  },

  computed: {
    placeholder () {
      return i18n(i19zipCode)
    },

    pattern () {
      if (this.country === 'BR') {
        return '[\\d]{5}-[\\d]{3}'
      }
      return null
    },

    localValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },

    cleaveOptions () {
      return this.country === 'BR'
        ? { blocks: [5, 3], delimiter: '-' }
        : { blocks: [30] }
    }
  }
}
