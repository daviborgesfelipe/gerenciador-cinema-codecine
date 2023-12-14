# Gerenciador Cinema - [Code Cine](https://code-cine-webapp.onrender.com/filmes/inicial).

O Codecine é uma Single Page Aplication desenvolvida com o objetivo de ser um projeto dedicado à gestão e organização de um catalogo de filmes. Esta catalogo, por sua vez, é um centro com diversas listas de filmes, como filmes em altas e mais populares, tambem pode ser salvo os filmes favoritos.

Construído por Davi Felipe Borges - @daviborgesfelipe. [LinkedIn](https://www.linkedin.com/in/davi-borges-felipe/)

## Principais Funcionalidades

### Listar Filmes

* Acessar listas de filmes conforme opçoes no menu.
  
### Acessar Detalhes do Filme

* Acessar detalhes do filme conforme seleção do usuario.
* 
### Salvar Filmes Favoritos

* Salvar filme em uma lista de favoritos.

## Tecnologias

* **Angular** - Framework de desenvolvimento para construção de Single Page Applications. [Site oficial](https://angular.dev)
* **RxJS** -  Biblioteca reativa para programação assíncrona. [Site oficial](https://rxjs.dev)
* **Bootstrap** - Framework de design para facilitar a criação de interfaces responsivas. [Site oficial](https://getbootstrap.com)


## Organização do projeto

A estrutura do projeto segue as melhores práticas para facilitar a manutenção e escalabilidade:

1. Components
	
    * **Componentes** reutilizáveis para construir as diferentes partes da interface. 

2. Services
	
    * **Serviços** que lidam com a lógica de negócios e comunicação com a API backend.

3. Models
	
    * Definição de **modelos de dados** utilizados na aplicação.

4. Views
    
    * Componentes responsáveis por apresentar a **interface** ao usuário.
 

## Dependências

As dependências do projeto frontend são gerenciadas com o npm. Certifique-se de ter o Node.js instalado.

As instruções a seguir assumem que você utiliza o **Windows** como o sistema operacional.

Para alterar ou executar o projeto é necessário o **Visual Studio Code**.

### Instalar Dependências do Frontend
As dependências do front-end são gerenciadas utilizando o NPM e as do back-end com o Nuget.

As instruções a seguir assumem que você utiliza o **Windows** como o sistema operacional.

1. Instalar o Git

    Para instalar o Git é necessário fazer o download do instalador [disponível aqui](https://git-for-windows.github.io/).
    Utilizar as configurações padrão do instalador é a melhor opção.

2. Instalar o NPM

    O NPM é principalmente um gerenciador de pacotes. O projeto possui um arquivo **package.json** no qual é listado todas as dependências do projeto, que depende de vários pacotes mantidos pela comunidade, como o próprio angular e o bootstrap.

    O NPM é construído com base no Node.JS e é necessário instalar o Node.JS para utilizá-lo. Como o NPM é o principal gerenciador de pacotes do ecossistema Node, ele vem junto com a instalação do Node no Windows.

    [Obtenha o instalador do Node.JS aqui](https://nodejs.org/en/).

    **Instale a versão 18.17.1 ou maior**.

Instalando o Git e o Node você poderá adquirir e executar o projeto.

Para alterar o Front-end recomendo a utilização do **Visual Studio Code**.

### Instalando as dependências do front-end

Com os passos acima feito, agora é necessário instalar as dependências do front-end através do NPM.

Vamos instalar as dependências do projeto. Navegue até a pasta onde o repositório foi baixado, entre na pasta **e-agenda-medica-client** que é onde estão os arquivos do Front-End e execute o seguinte comando:

```bash
> npm install
```

Com esse comando todas as dependências listadas no package.json do projeto serão instaladas na pasta node_modules.

### Executar o projeto

#### Tasks do NPM

#### Ambiente de Desenvolvimento

```bash
> npm start
```

## FIM

Em caso de dúvidas, entre em contato! [LinkedIn](https://www.linkedin.com/in/davi-borges-felipe/)
Obrigado.
