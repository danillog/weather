# Sobre

Essa ferreamente construída com ReactJS, acessa o Open Weahter API e nos diz a previsão do tempo de acordo com sua pesquisa ou sua localização, também utilizando o Nomination API.

Eu construí essa ferramenta pois queria algo que se adaptasse com o horário do dia e também para me auxiliar nos passeios de bicicleta mais longos.

Obs.: Esse é apenas um MVP o serviço final ainda está em construção

## Acessando o Demo 
Para acessar o demo é só [clicar aqui](http://dgweather.site) 

## Como instalar?

Importante antes de baixar o conteúdo tenha certeza que você possui ao menos o nodeJS instalado no seu computador.

1. Para instalar baixe o conteúdo deste repositório ou faça um clone deste projeto;
2. Faça a instalação das dependências utilizando o NPM, digite no seu terminal **npm i**;
3. Por motivos de segurança a chave da API do Open Weather não está exposta, então gere este chave no site e coloque na pasta src/config no arquivo config.js no seguinte formato:
    
```javascript
const key =  "cole aqui seu acesso"
    export default key
```
 
4. Após todo este processo, no console digite **npm start** e o projeto irá iniciar no caminho http://localhost:3000;
5. Envie um feedback, para que possamos melhorar este projeto. 