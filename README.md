# Calculadora de Planejamento do Preparo por Zonas (calculadora-preparo-zonas)

Calcula, para cada zona do dente (cervical, médio e incisal, em lobos e vales), quanto desgastar a partir da espessura de esmalte, do acréscimo do mock-up e da espessura de cerâmica desejada. Compara o preparo uniforme com a redução diferencial entre lobos e vales.

## Arquivos

- `calculadora-preparo-zonas.html`: app de um arquivo só. Abra no navegador (computador ou celular). Nada é enviado a servidor.
- `nucleo/modelo.js`: o cálculo em JavaScript puro, o mesmo usado pelo app.
- `nucleo/teste_modelo.js`: testes do cálculo. Rode com `node teste_modelo.js` dentro da pasta `nucleo`.

## Método

1. A superfície final da lente fica a uma distância do esmalte igual ao desgaste mais o acréscimo do mock-up. Portanto: desgaste = espessura da cerâmica menos acréscimo.
2. Esmalte restante = esmalte inicial menos desgaste. Se o desgaste passa do esmalte, a diferença é dentina exposta e o app avisa.
3. Se a cerâmica desejada for menor que o acréscimo, o desgaste é zero e a cerâmica real fica igual ao acréscimo.
4. Redução diferencial: menos desgaste sobre os lobos de dentina (cerâmica mais fina, que deixa o dente aparecer através dela) e desgaste convencional nos vales entre os lobos. No terço cervical lobo e vale coincidem.
5. A fresa de orientação sugerida é a maior das fresas informadas que não ultrapassa o desgaste, com o complemento a remover depois de unir os sulcos.
6. O app avisa quando a cerâmica fica abaixo do mínimo informado e quando sobra menos de 30% do esmalte original.

## Limites (declarar em qualquer publicação)

- Os valores iniciais de esmalte e de acréscimo são ilustrativos. A espessura do esmalte varia entre dentes e pessoas. Use a medida do caso.
- A redução diferencial é uma proposta conceitual, ainda não testada em bancada nem em casos clínicos.
- É um modelo geométrico simples, em uma dimensão por zona. Não considera a curvatura do dente, o eixo de inserção, o término cervical nem o contorno proximal.
- A ferramenta é de estudo e planejamento. Não substitui o julgamento clínico nem a conferência do preparo com guias e índices.

## Licença

MIT. Veja `LICENSE`.

## Como citar

Veja `CITATION.cff`.
