# Plano de teste
## Produto
   - Loja Integrada
    
## Testador

    Leonardo

## Feature
    Permitir a utilização de Cupons nas compras
    
## Pré Condições
    - Deve estar logado
    - Deve haver produtos adicionados ao carrinho
--------
## Casos de Testes

| # | Testes 
| ------ | ------ | 
| 1 | Cupons devem ser Cumulativos com outros descontos | 
| 2 | Cupons podem aplicar descontos nos produtos |
| 3 | Cupons pode aplicar frete grátis nas compras |
| 4 | Cupons podem ter valor minimo para compra |
| 5 | Cupons podem ter validade |
| 6 | Cupons aplicados no valor do carrinho |
| 7 | Cupons aplicados no valor total do pedido |
| 8 | Validar compra sem cupom inserido |


#### 1 - Cupons devem ser Cumulativos com outros descontos
    User Story: Dado que usuário está logado,
                que há produtos no carrinho
                que a forma de pagamento é Boleto
                Quando inserir um cupom válido
                Então o desconto deve ser aplicado
                
    Comportamento Esperado: Ao inserir o cupom no pedido, o desconto deve ser aplicado, mantendo os outros descontos.

#### 2 - Cupons podem aplicar descontos nos produtos
    User Story: Dado que usuário está logado,
                que há produtos no carrinho
                Quando inserir um cupom válido
                O produto deverá receber desconto
            
    Comportamento Esperado:
    Ao aplicar o cupom, o produto vinculado ao cupom deve receber um desconto

#### 3 - Cupons podem aplicar frete grátis nas compras
    User Story: Dado que o usuário está logado,
                que já produtos no carrinho
                Quando inserir um cupom válido
                O pedido deve ficar com frete grátis
    Comportamento Esperado:
    Ao aplicar o cupom, o pedido deve ter frete grátis
    
#### 4 - Cupons podem ter valor minimo para compra
    User Story: Dado que o usuário está logado,
                que já produtos no carrinho
                Quando inserir um cupom válido
                O pedido deve atingir um valor minimo.
    Comportamento Esperado: 
    Para o cupom ser aplicado, o pedido deve conter um valor minimo
    
#### 5 - Cupons podem ter validade
    User Story: Dado que o usuário está logado,
                que já produtos no carrinho
                Quando inserir um cupom vencido
                Deve haver uma mensagem informado que o cupom está vencido
    Comportamento Esperado:
    Ao inserir um cupom vencido, deve haver uma mensagem de erro e não dar nenhum tipo de desconto
    
#### 6 - Cupons aplicados no valor do carrinho
    User Story: Dado que o usuário está logado,
                que já produtos no carrinho
                Quando inserir um cupom válido
                Os produtos no carrinho receberá descontos
    Comportamento Esperado:
    Ao inserir um cupom para o carrinho, os produtos no carrinho devem receber um desconto, as informações no checkout como forma de pagamento e forma de entrega não receberá o desconto desse cupom

#### 7 - Cupons Aplicados no valor total do pedido
    User Story: Dado que o usuário está logado,
                que já produtos no carrinho
                Quando inserir um cupom válido
                O pedido receberá um desconto
    Comportamento Esperado:
    Ao inserir um cupom para o pedido, os valor total do pedido receberá o desconto do cupom
    
#### 8 - Validar compra sem cupom inserido
    User Story: Dado que o usuário está logado,
                que já produtos no carrinho
                e não inserir um cupom
                Quando finalizar uma compra
                Deve garantir que o carrinho e o pedido não receberão descontos de cupom
    Comportamento Esperado:
    Quando um cupom não for inserido no carrinho, não deve haver nenhum tipo de desconto referente aos cupons
--------