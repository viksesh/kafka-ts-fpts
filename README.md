# Kafka, TypeScript, and fp-ts with Dagger Pipeline

This repository contains a sample project that demonstrates:

- Building a Kafka producer and consumer in TypeScript (using KafkaJS and fp‑ts).
- Deploying an Apache Kafka cluster locally on Kubernetes using the Strimzi operator.
- Running everything locally via a Dagger pipeline.

## Prerequisites

- **Node.js and npm:** Install from [nodejs.org](https://nodejs.org/).
- **Local Kubernetes Cluster:** (e.g. [Minikube](https://minikube.sigs.k8s.io/docs/start/), [kind](https://kind.sigs.k8s.io/), or Docker Desktop’s Kubernetes)
- **kubectl:** Ensure your Kubernetes CLI is installed and configured.
- **Dagger CLI:** Install the Dagger CLI from [dagger.io](https://dagger.io/).

1. **Clone the Repository and Install Dependencies:**

   ```bash
   git clone https://github.com/yourusername/kafka-ts-fpts-tutorial.git
   cd kafka-ts-fpts-tutorial
   npm install

2. **Set Up Kafka on Kubernetes Using Strimzi**

   Create a Namespace for Kafka:

   ```bash
   kubectl create namespace kafka
   ```
   Deploy the Strimzi Cluster Operator:

   ```bash
   kubectl apply -n kafka -f https://strimzi.io/install/latest/cluster-operator
   ```

   Deploy the Kafka Cluster:

   ```bash
   kubectl apply -f kubernetes/kafka-cluster.yaml -n kafka
   ```

   Wait for the Kafka and Zookeeper Pods to Run:
   ```bash
   kubectl get pods -n kafka
   ```

   Expose Kafka via Port Forwarding:
   In a terminal, run:
   ```bash
   kubectl port-forward service/my-cluster-kafka-bootstrap 9092:9092 -n kafka
   ```
   This forwards the Kafka broker to localhost:9092 so your application can connect.

3. **Running the Application**

   Start the Consumer: (in one terminal)

   ```bash
   npx ts-node src/consumer.ts
   ```
   Run the Producer: (in another terminal)

   ```bash
   npx ts-node src/producer.ts
   ```
   You should see logs indicating that the message was sent by the producer and processed by the consumer.

