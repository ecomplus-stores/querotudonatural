import '#template/js/checkout'
import './custom-js/checkout'
import ecomCart from '@ecomplus/shopping-cart'

const lessQuantity = 529

// Elementos
const lessUnit = document.getElementById('lessUnit')
const firstphrase = document.getElementById('lessSome')
const lastphrase = document.getElementById('noMore')
const containerCalc = document.getElementById('containerCalc')
const checkoutButton = document.querySelector('.cart__btn-checkout')
const lastUnitsBar = document.getElementById('lastUnitsBar')
const percentBar = document.getElementById('percentBar')

// Mostra valor inicial
lessUnit.innerHTML = window.ecomUtils.formatMoney(lessQuantity, 'BRL', 'pt_br')

// Atualiza barra e mensagens quando o carrinho muda
ecomCart.on('change', ({ data }) => {
  if (containerCalc) {
    containerCalc.style.display = 'block'

    const countQuantity = data.subtotal
    const evalQuantity = lessQuantity - countQuantity

    if (evalQuantity > 0) {
      // Ainda não atingiu o mínimo
      lessUnit.innerHTML = window.ecomUtils.formatMoney(evalQuantity, 'BRL', 'pt_br')
      const percent = Math.min(Math.round((countQuantity / lessQuantity) * 100), 100) + '%'

      lastUnitsBar.style.width = percent
      percentBar.innerHTML = percent

      firstphrase.style.display = 'block'
      lastphrase.style.display = 'none'
      checkoutButton.style.display = 'none'
    } else {
      // Já atingiu o mínimo
      lastUnitsBar.style.width = '100%'
      percentBar.innerHTML = '100%'

      firstphrase.style.display = 'none'
      lastphrase.style.display = 'block'
      checkoutButton.style.display = 'block'
    }
  }
})

// Bloqueia checkout se não tiver valor mínimo
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
