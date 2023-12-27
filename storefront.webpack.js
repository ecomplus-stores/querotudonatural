const path = require('path')
const dirSearchAlias = path.resolve(__dirname, 'template/js/lib/search-engine')
const pathDslAlias = path.resolve(dirSearchAlias, 'dsl')

module.exports = () => ({
  resolve: {
    alias: {
      './methods/set-search-term': path.resolve(dirSearchAlias, 'set-search-term'),
        './html/APrices.html': path.resolve(__dirname, 'template/js/html/APrices.html'),
        './js/APrices.js': path.resolve(__dirname, 'template/js/js/APrices.js'),
        './js/TheProduct.js': path.resolve(__dirname, 'template/js/js/TheProduct.js'),
        './js/PaymentMethods.js': path.resolve(__dirname, 'template/js/js/PaymentMethods.js'),
        './html/AddressForm.html': path.resolve(__dirname, 'template/js/html/AddressForm.html'),
        './js/AddressForm.js': path.resolve(__dirname, 'template/js/js/AddressForm.js'),
        './js/InputZipCode.js': path.resolve(__dirname, 'template/js/js/InputZipCode.js')
    }
  }
})
