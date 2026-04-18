# IOT DATA PIPELINE NA AWS - SERVIÇO DE SAÚDE (Ranika) 🏥

O **Servidor IoT Saúde Ranika** é um sistema de monitorização clínica desenvolvido para a recolha contínua e análise em tempo real de sinais vitais críticos: **Frequência Cardíaca (BPM)** e **Temperatura Corporal**. O foco principal é a deteção instantânea de anomalias, como taquicardia ou picos febris, utilizando uma infraestrutura de dados escalável na nuvem.

## 🚀 Arquitetura do Sistema

O fluxo de dados foi projetado como um pipeline contínuo:
1.  **Geração**: Dados simulados via Python (Google Colab/Wokwi).
2.  **Transmissão**: Envio via protocolo **MQTT** para o broker HiveMQ.
3.  **Processamento**: O **Node-RED** na AWS EC2 captura, filtra e roteia as informações.
4.  **Armazenamento**: 
    * **InfluxDB**: Para dados brutos de séries temporais.
    * **SQLite**: Para persistência do histórico processado pela API.
5.  **Visualização**: 
    * **Grafana**: Dashboards técnicos em tempo real.
    * **Frontend Web**: Interface para monitorização do leito e histórico.

## 🛠️ Stack Tecnológica (MING)

A aplicação utiliza a **Stack MING**, essencial para fluxos IoT em tempo real:
* **M**QTT: Protocolo leve de publicação/subscrição.
* **I**nfluxDB: Banco de dados otimizado para sensores.
* **N**ode-RED: Motor de integração e regras de fluxo.
* **G**rafana: Camada de visualização e alertas.

## ⚖️ Regras de Negócio (Classificação)

O backend aplica as seguintes classificações aos indicadores recebidos:

| Indicador | Normal | Alerta | Crítico |
| :--- | :--- | :--- | :--- |
| **BPM** | 60 – 100 bpm | 101 – 120 bpm | > 120 bpm |
| **Temperatura** | 35.5 – 37.5 °C | 37.6 – 38.5 °C | > 38.5 °C |

## 📦 Estrutura da Infraestrutura AWS

Todos os serviços correm em paralelo numa instância **AWS EC2**, utilizando Docker para isolamento:
* `api_backend`: Porta 8080.
* `node_red`: Porta 1880.
* `influx_db`: Porta 8086.
* `grafana_dashboard`: Porta 3000.
* `mqtt_broker`: Porta 1883.

## 🔧 Como Executar

1.  **Configuração AWS**: Garanta que a instância EC2 tem as portas necessárias abertas no Security Group.
2.  **Backend**: Instale as dependências com `npm install` e inicie o servidor Node.js.
3.  **Fluxo**: Importe o JSON do fluxo para o Node-RED e faça o *Deploy*.
4.  **Simulação**: Execute o script Python no Google Colab para começar a publicar no tópico `saude/dados`.

## 👥 Organização do Grupo

* **Karina de Moraes**: IoT, Simulador Python, MQTT, Node-RED e InfluxDB.
* **Nicolly Lemos e Karina de Moraes **: Backend (API Node.js), Regras de Negócio e SQLite.
* **Rafaela Mansano e Nicolly Lemos**: Frontend (Interface Web, Gráficos e Integração API).
* **Rafaela Mansano**: Documentação.

---
*Este projeto foi desenvolvido como requisito para a disciplina de Programação Multiplataforma - FATEC Sorocaba.*
