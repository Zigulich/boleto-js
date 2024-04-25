<h1 align="center">📄 BoletoJS</h1>

<p align="center">
	Ferramenta para gerenciamento de boletos com Javascript
	<p align="center">
		<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
		<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
	</p>
</p>

### 🔥 Funcionamento

O usuário informa a linha digitável ou efetua a leitura do código de barras do boleto, e a ferramente faz a leitura simples deste boleto, podendo retornar o banco, o valor, e a data de vencimento, além de verificar se o boleto é valido. `Necessário adicionar um sistema melhor de validação do boleto.`

### 🔥 Utilização

Para instalar a biblioteca, execute o seguinte comando.

```
npm install boleto-js@https://github.com/Zigulich/boleto-js
```

ou

```
yarn add boleto-js@https://github.com/Zigulich/boleto-js
```

Importe a biblioteca para o seu projeto.

```javascript
import { BoletoJS } from 'boleto-js'
```

Inicie a classe informando o código de barras ou a linha digitável do boleto

```javascript
const boleto = new BoletoJS({ codigoBarras: '', linhaDigitavel: '' })
```

---

### ℹ Métodos disponíveis

```javascript
.linhaDigitavel({ formatar: false })   // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
.linhaDigitavel({ formatar: true })    // XXXXX.XXXXX XXXXX.XXXXXX XXXXX.XXXXXX X XXXXXXXXXXXXXX
.codigoBarras()                        // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
.valor()                               // 9999.99
.banco()                               // { nomeCompleto: '', nomeAbreviado: '' }
.dataVencimento()                      // Sun Jan 15 2024 03:00:00
```
