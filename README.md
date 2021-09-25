## Descrição

Este projeto é um pequeno app que lista repositórios do github numa tabela atravéz de uma busca por linguagem de programação.

## Instalação

Para utilizar o app, basta clonar o repositório e, na pasta do projeto, executar o comando `yarn` para instalar todas as dependências.

## Scripts Disponíveis

No diretório do projeto pode executar os seguintes comandos

### `yarn start`

Executa o app No modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizar no navegador.

A página recarregará toda vez que fizer uma mudança.\
Também poderá ver erros de lint no console.

### `yarn build`

Constrói o app para produção na pasta `build`.\
O script irá realizar o bundle do React em modo de produção e otimizar para melhor performance.

## Testes

Para testar o app, basta inserir uma linguagem de programação válida(`Pyhon`, `Java`, `Go` por exemplo) e deverão existir um total de 15 entradas na tabela.
A listagem está paginada para retornar 15 repositórios, portanto ao mudar a página seu conteúdo também deverá ser atualizado.

## Técnologias utilizadas

* Typescript
* ReactJs
* Material-UI
* Axios
* Date-fns

## Imagens

![listagem](https://user-images.githubusercontent.com/20386403/134787384-bf1e6e74-6aec-4d87-b423-91b697d4f290.png)
