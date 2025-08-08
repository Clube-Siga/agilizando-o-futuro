# Capítulo 4: O Esqueleto - Arquitetura de Software

Entender a arquitetura de um projeto é como ter o mapa de um edifício. Você sabe onde cada sala está e como elas se conectam. Aqui, vamos desvendar o esqueleto da nossa aplicação.

## A Visão Geral: Monolito com Superpoderes

Nossa arquitetura pode ser descrita como um **Monolito Modular com Frontend Integrado**. Parece complexo, mas a ideia é simples:

`Browser (Cliente)` <--> `Inertia.js` <--> `Laravel (Servidor)` <--> `MySQL (Banco de Dados)`

Usamos uma aplicação Laravel que cuida de todas as regras de negócio, acesso ao banco de dados e segurança. No entanto, em vez de usar o sistema de templates tradicional do Laravel (Blade), nós o conectamos ao React usando o Inertia.js. O resultado é a velocidade e a experiência de usuário de uma Single-Page Application (SPA), com a produtividade e a simplicidade de um backend monolítico.

## O Backend: Laravel - O Artesão do PHP

O Laravel é o nosso robusto framework de backend. Ele é responsável por:

*   **Roteamento:** Definir quais URLs existem e o que acontece quando são acessadas.
*   **Regras de Negócio:** Toda a lógica da aplicação, como salvar um novo contato no banco, validar dados e controlar permissões.
*   **Interação com o Banco de Dados:** Através do seu ORM (Object-Relational Mapper) chamado **Eloquent**, o Laravel nos permite conversar com o banco de dados de forma segura e intuitiva.

## O Banco de Dados: MySQL e phpMyAdmin

*   **MySQL:** Para armazenar todas as informações da nossa aplicação (usuários, contatos, etc.), escolhemos o MySQL, um dos sistemas de gerenciamento de banco de dados relacionais mais testados e confiáveis do mundo. Ele é o cofre seguro dos nossos dados.

*   **phpMyAdmin (Ferramenta de Ensino):** Especialmente para a turma inicial, incluímos o phpMyAdmin no nosso ambiente de desenvolvimento. Ele é uma ferramenta com interface gráfica que roda no navegador e permite visualizar e gerenciar o banco de dados MySQL. Isso foi crucial para que os alunos pudessem **ver** as tabelas, os relacionamentos e os dados, facilitando enormemente o aprendizado sobre como um banco de dados funciona na prática.

## O Frontend: React - A Interface Dinâmica

O React é a biblioteca que usamos para construir tudo o que o usuário vê e com o que ele interage. Ele nos permite criar componentes reutilizáveis (botões, formulários, cards) e construir interfaces complexas de forma organizada.

## A "Cola" Mágica: Inertia.js

O Inertia.js é a peça que conecta o mundo do Laravel (backend) com o mundo do React (frontend). Ele não é um framework, mas sim um padrão de arquitetura. Funciona assim:

1.  Quando você clica em um link, o Inertia intercepta o clique.
2.  Ele faz uma requisição para o Laravel, mas pede a resposta em formato JSON (em vez de uma página HTML completa).
3.  O Laravel retorna os dados necessários para aquela página (as "props").
4.  O Inertia, no lado do cliente, usa esses dados para carregar o componente React correspondente, sem a necessidade de um recarregamento completo da página.

É o melhor dos dois mundos: a reatividade do React com o poder do roteamento e controle de dados do Laravel.

---

*Próximo capítulo: [A Vida - Implementando uma Feature Real](./04-feature-formulario-contato.md)*
