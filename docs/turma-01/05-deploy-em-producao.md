# Capítulo 6: O Lançamento - Deploy em Produção

Escrever o código é apenas metade da jornada. A outra metade, igualmente crucial, é levar esse código para o mundo de forma segura e eficiente. Este capítulo revela os bastidores do nosso processo de deploy, uma das principais responsabilidades de um Engenheiro de DevOps.

## A Filosofia: CI/CD - A Esteira da Automação

No desenvolvimento moderno, evitamos ao máximo processos manuais. Para isso, adotamos a cultura de **CI/CD**:

*   **Integração Contínua (CI - Continuous Integration):** Cada vez que um desenvolvedor envia um código novo para o repositório (`git push`), um processo automático é iniciado para construir e testar a aplicação. Isso garante que o novo código não "quebre" o que já existia.

*   **Entrega Contínua (CD - Continuous Delivery):** Se a fase de CI for bem-sucedida, o próximo passo é empacotar a aplicação e deixá-la pronta para ser implantada em produção. No nosso caso, isso significa construir uma imagem Docker.

*   **Implantação Contínua (CD - Continuous Deployment):** É a etapa final, onde a nova versão da aplicação é automaticamente enviada para o servidor de produção. No nosso projeto, isso acontece toda vez que um commit é feito na branch `main`.

## A Ferramenta: GitHub Actions - Nosso Robô de CI/CD

Para automatizar todo esse processo, usamos o GitHub Actions. As regras da nossa automação estão no arquivo `.github/workflows/main.yml`. Ele define dois trabalhos principais:

1.  **`build-and-push` (Construir e Empurrar):**
    *   **Checkout:** Baixa a versão mais recente do código da branch `main`.
    *   **Build:** Usa o `Dockerfile` do projeto para construir duas imagens Docker: uma para a aplicação PHP (`agilizando-app`) e outra para o servidor web (`agilizando-nginx`).
    *   **Push:** Envia (empurra) essas imagens recém-criadas para o nosso registro de contêineres, o **GitHub Container Registry (ghcr.io)**. Agora, as imagens estão prontas para serem usadas em qualquer lugar.

2.  **`deploy` (Implantar):**
    *   Este trabalho só começa se o `build-and-push` for concluído com sucesso.
    *   **Conexão Segura:** Ele se conecta ao nosso servidor de produção (VPS) usando uma chave SSH, que é armazenada de forma segura nos "Secrets" do GitHub.
    *   **Sincronização e Deploy:** Uma vez conectado, ele executa uma série de comandos no servidor:
        1.  `git pull`: Atualiza os arquivos de configuração, como o `docker-swarm-prod.yml`.
        2.  `docker login`: Autentica o servidor no GitHub Container Registry para que ele possa baixar as imagens privadas.
        3.  `docker stack deploy`: Este é o comando final. Ele lê o arquivo `docker-swarm-prod.yml` e instrui o Docker Swarm a baixar as novas imagens (que acabamos de construir) e a atualizar os serviços que estão no ar, sem tempo de inatividade.

## A Infraestrutura: Docker Swarm e Traefik

*   **Docker Swarm:** É o nosso orquestrador de contêineres. Usamos o modo Swarm do Docker para gerenciar nossos serviços (`app` e `nginx`), garantindo que eles estejam sempre rodando e se recuperem de falhas automaticamente.

*   **`docker-swarm-prod.yml`:** Este arquivo é a "planta baixa" da nossa infraestrutura. Ele define:
    *   Quais serviços devem rodar (`agilizando-app`, `agilizando-nginx`).
    *   Qual imagem Docker cada serviço deve usar (as que o GitHub Actions acabou de criar).
    *   Como os serviços se conectam através de redes Docker privadas.
    *   Como os dados persistentes, como os arquivos de log e o `storage` do Laravel, são gerenciados através de volumes.

*   **Traefik:** Atua como nosso proxy reverso. Ele recebe todo o tráfego do domínio `agilizando.clubesiga.com.br`, gerencia os certificados SSL (Let's Encrypt) automaticamente e direciona as requisições para o contêiner `agilizando-nginx` correto.

## Segurança em Primeiro Lugar: Docker Secrets

Uma regra de ouro: **credenciais nunca devem estar no código**. No nosso `docker-swarm-prod.yml`, você não encontrará a senha do banco de dados. Em vez disso, usamos **Docker Secrets**. As senhas e chaves de API são armazenadas de forma segura diretamente no Docker Swarm do servidor. O arquivo de stack apenas declara que precisa de acesso a esses segredos, e o Docker os injeta de forma segura nos contêineres em tempo de execução.

E assim, nosso ciclo se completa. Do `git commit` na máquina do desenvolvedor a uma aplicação segura e atualizada rodando na nuvem, tudo de forma automatizada, segura e eficiente.

---

**Fim do Guia. Parabéns por chegar até aqui!**
