# Iot Saude
# IOT DATA PIPELINE NA AWS - SERVIÇO DE SAÚDE (Ranika) 🏥

O **Servidor IoT Saúde Ranika** é um sistema de monitorização clínica desenvolvido para a recolha contínua e análise em tempo real de sinais vitais críticos: **Frequência Cardíaca (BPM)** e **Temperatura Corporal**. O foco principal é a deteção instantânea de anomalias, como taquicardia ou picos febris, utilizando uma infraestrutura de dados escalável na nuvem [cite: 6, 38, 39].

## 🚀 Arquitetura do Sistema

O fluxo de dados foi projetado como um pipeline contínuo [cite: 41, 43]:
1.  **Geração**: Dados simulados via Python (Google Colab/Wokwi) [cite: 44].
2.  **Transmissão**: Envio via protocolo **MQTT** para o broker HiveMQ [cite: 45].
3.  **Processamento**: O **Node-RED** na AWS EC2 captura, filtra e roteia as informações [cite: 46].
4.  **Armazenamento**: 
    * **InfluxDB**: Para dados brutos de séries temporais [cite: 47, 71].
    * **SQLite**: Para persistência do histórico processado pela API [cite: 80, 85].
5.  **Visualização**: 
    * **Grafana**: Dashboards técnicos em tempo real [cite: 48, 73].
    * **Frontend Web**: Interface para monitorização do leito e histórico [cite: 49, 87].

## 🛠️ Stack Tecnológica (MING)

A aplicação utiliza a **Stack MING**, essencial para fluxos IoT em tempo real [cite: 51]:
* **M**QTT: Protocolo leve de publicação/subscrição [cite: 54].
* **I**nfluxDB: Banco de dados otimizado para sensores [cite: 70].
* **N**ode-RED: Motor de integração e regras de fluxo [cite: 67].
* **G**rafana: Camada de visualização e alertas [cite: 72].

## ⚖️ Regras de Negócio (Classificação)

O backend aplica as seguintes classificações aos indicadores recebidos [cite: 83, 84]:

| Indicador | Normal | Alerta | Crítico |
| :--- | :--- | :--- | :--- |
| **BPM** | 60 – 100 bpm | 101 – 120 bpm | > 120 bpm |
| **Temperatura** | 35.5 – 37.5 °C | 37.6 – 38.5 °C | > 38.5 °C |

## 📦 Estrutura da Infraestrutura AWS

Todos os serviços correm em paralelo numa instância **AWS EC2**, utilizando Docker para isolamento [cite: 93]:
* `api_backend`: Porta 8080 [cite: 93].
* `node_red`: Porta 1880 [cite: 93].
* `influx_db`: Porta 8086 [cite: 93].
* `grafana_dashboard`: Porta 3000 [cite: 93].
* `mqtt_broker`: Porta 1883 [cite: 93].

## 🔧 Como Executar

1.  **Configuração AWS**: Garanta que a instância EC2 tem as portas necessárias abertas no Security Group [cite: 95].
2.  **Backend**: Instale as dependências com `npm install` e inicie o servidor Node.js [cite: 96].
3.  **Fluxo**: Importe o JSON do fluxo para o Node-RED e faça o *Deploy* [cite: 97].
4.  **Simulação**: Execute o script Python no Google Colab para começar a publicar no tópico `saude/dados` [cite: 99].

## 👥 Organização do Grupo

* **Karina de Moraes**: IoT, Simulador Python, MQTT, Node-RED e InfluxDB [cite: 106].
* **Nicolly Lemos**: Backend (API Node.js), Regras de Negócio e SQLite [cite: 106].
* **Rafaela Mansano e Nicolly Lemos**: Frontend (Interface Web, Gráficos e Integração API) [cite: 106].
* **Rafaela Mansano**: Documentação [cite: 106].
---
*Este projeto foi desenvolvido como requisito para a disciplina de Programação Multiplataforma - FATEC Sorocaba [cite: 1, 13, 14, 15, 18].*
