import '#template/js/checkout'
import './custom-js/checkout'
import ecomCart from '@ecomplus/shopping-cart'

const lessUnit = document.getElementById('lessUnit')
const firstphrase = document.getElementById('lessSome')
const lastphrase = document.getElementById('noMore')
const containerCalc = document.getElementById('containerCalc')
const checkoutButton = document.querySelector('.cart__btn-checkout')

const lessQuantity = 529

// Exibe valor mínimo
lessUnit.innerHTML = window.ecomUtils.formatMoney(lessQuantity, 'BRL', 'pt_br')

// Atualiza barra e mensagens conforme o carrinho muda
ecomCart.on('change', ({ data }) => {
  const cartCalc = document.querySelectorAll('#cart')
  if (cartCalc.length) {
    containerCalc.style.display = 'block'
    const countQuantity = data.subtotal
    const evalQuantity = lessQuantity - countQuantity
    let percentBar

    if (evalQuantity > 0) {
      lessUnit.innerHTML = window.ecomUtils.formatMoney(evalQuantity, 'BRL', 'pt_br')
      percentBar = Math.round((countQuantity / lessQuantity) * 100) + '%'
      firstphrase.style.display = 'block'
      lastphrase.style.display = 'none'
      checkoutButton.style.display = 'none'
    } else {
      percentBar = '100%'
      firstphrase.style.display = 'none'
      lastphrase.style.display = 'block'
      checkoutButton.style.display = 'block'
    }

    document.getElementById('lastUnitsBar').style.width = percentBar
    document.getElementById('percentBar').innerHTML = percentBar
  } else {
    containerCalc.style.display = 'none'
  }
})

// Redirecionamento seguro no checkout
const router = window.storefrontApp && window.storefrontApp.router

if (router) {
  router.afterEach(({ name }) => {
    if (name === 'checkout') {
      const countQuantity = ecomCart.data.subtotal
      if (countQuantity < lessQuantity) {
        window.alert('O pedido mínimo para todo o site é de R$ 529,00. Complete o valor mínimo para que sua compra seja concluída.')
        window.location.href = '/app/#/cart'
      }
    }
  })
}
