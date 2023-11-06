const path = require('path')

module.exports = () => ({
  resolve: {
    alias: {
/*         , 
        
        
        */
        './html/AddressForm.html': path.resolve(__dirname, 'template/js/html/AddressForm.html'),
        './js/AddressForm.js': path.resolve(__dirname, 'template/js/js/AddressForm.js'),
        './js/InputZipCode.js': path.resolve(__dirname, 'template/js/js/InputZipCode.js')
    }
  }
})
