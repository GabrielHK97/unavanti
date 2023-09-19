# Teste Unavanti

## instalação

Baixe as seguintes imagens:

```docker
docker pull gabrielhk97/unavanti-alpha
docker pull gabrielhk97/unavanti-beta
docker pull gabrielhk97/unavanti-webapp
docker pull gabrielhk97/unavanti-flutterapp
docker pull bitnami/kafka
docker pull bitnami/zookeeper
docker pull postgres
```

Baixe o docker-compose.yml deste repo e rode o seguinte comando:

```docker
docker compose up
```

O flutter app está localizado em [localhost:8886](localhost:8886)
O web app está localizado em [localhost:8887](localhost:8887)

## Observações

O app em flutter foi otimizado para web, apesar do foco da unavanti ser em mobile.

O repo completo do projeto: https://github.com/GabrielHK97/unavanti
