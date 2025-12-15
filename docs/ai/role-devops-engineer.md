## Role: DevOps Engineer

As DevOps Engineer, you focus on CI/CD pipelines, infrastructure as code, containerization, orchestration, and automation for the Glix platform.

### Responsibilities:
- Design and implement CI/CD pipelines using GitHub Actions
- Manage infrastructure as code with Terraform
- Containerize applications with Docker
- Orchestrate deployments with Kubernetes (if applicable)
- Set up cron jobs and scheduled tasks
- Implement monitoring, logging, and alerting
- Manage secrets and environment configuration
- Automate deployment, testing, and maintenance workflows
- Ensure security, scalability, and reliability
- Collaborate with Frontend/Backend Devs for deployment requirements and Tester/QA for test automation

### Workflow for Tasks:
1. **Analyze**: Assess infrastructure and automation requirements
2. **Plan**: Design CI/CD workflows, infrastructure architecture, scaling strategy
3. **Implement**: Write GitHub Actions workflows, Terraform configs, Dockerfiles, K8s manifests
4. **Test**: Validate pipelines, test deployments, verify automation
5. **Review**: Optimize for performance, cost, security, and maintainability

---

## CI/CD with GitHub Actions

### Basic Pipeline Structure

**`.github/workflows/ci.yml`:**
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  workflow_dispatch: # Manual trigger

env:
  NODE_VERSION: '20'
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  lint:
    name: Lint Code
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

  test:
    name: Run Tests
    runs-on: ubuntu-latest
    needs: lint

    services:
      mongodb:
        image: mongo:7
        ports:
          - 27017:27017
        env:
          MONGO_INITDB_ROOT_USERNAME: test
          MONGO_INITDB_ROOT_PASSWORD: test

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm test
        env:
          MONGODB_URI: mongodb://test:test@localhost:27017/test?authSource=admin
          PAYLOAD_SECRET: test-secret-key

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json

  build:
    name: Build Application
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Next.js
        run: npm run build
        env:
          MONGODB_GLIX_URI: ${{ secrets.MONGODB_URI }}
          PAYLOAD_SECRET: ${{ secrets.PAYLOAD_SECRET }}
          NEXT_PUBLIC_SERVER_URL: ${{ secrets.SERVER_URL }}

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build
          path: .next

  docker:
    name: Build & Push Docker Image
    runs-on: ubuntu-latest
    needs: build
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    permissions:
      contents: read
      packages: write

    steps:
      - uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=sha,prefix={{branch}}-
            type=semver,pattern={{version}}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  deploy:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: docker
    if: github.ref == 'refs/heads/main'
    environment:
      name: production
      url: https://glix.com

    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Kubernetes
        uses: azure/k8s-deploy@v4
        with:
          manifests: |
            k8s/deployment.yaml
            k8s/service.yaml
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:main-${{ github.sha }}
          kubeconfig: ${{ secrets.KUBE_CONFIG }}
```

### Advanced Workflows

**Matrix Testing:**
```yaml
test:
  strategy:
    matrix:
      node-version: [18, 20, 22]
      os: [ubuntu-latest, windows-latest]
  runs-on: ${{ matrix.os }}
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm ci && npm test
```

**Conditional Jobs:**
```yaml
deploy-staging:
  if: github.ref == 'refs/heads/develop'
  runs-on: ubuntu-latest
  steps:
    - run: echo "Deploying to staging"

deploy-production:
  if: github.ref == 'refs/heads/main'
  runs-on: ubuntu-latest
  steps:
    - run: echo "Deploying to production"
```

**Reusable Workflows:**
```yaml
# .github/workflows/reusable-deploy.yml
on:
  workflow_call:
    inputs:
      environment:
        required: true
        type: string

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Deploying to ${{ inputs.environment }}"

# .github/workflows/main.yml
jobs:
  deploy-prod:
    uses: ./.github/workflows/reusable-deploy.yml
    with:
      environment: production
```

---

## Docker Containerization

### Dockerfile for Next.js + Payload

**Multi-stage Dockerfile:**
```dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production && \
    npm cache clean --force

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build application
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set ownership
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

**Docker Compose (Development):**
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/glix
      - PAYLOAD_SECRET=dev-secret
      - NEXT_PUBLIC_SERVER_URL=http://localhost:3000
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    depends_on:
      - mongo
      - redis

  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data

volumes:
  mongo-data:
  redis-data:
```

**Development Dockerfile:**
```dockerfile
# Dockerfile.dev
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

---

## Kubernetes Orchestration

### Deployment Manifest

**`k8s/deployment.yaml`:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: glix-web
  namespace: production
  labels:
    app: glix-web
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: glix-web
  template:
    metadata:
      labels:
        app: glix-web
        version: v1
    spec:
      containers:
      - name: web
        image: ghcr.io/yourorg/glix-web:latest
        ports:
        - containerPort: 3000
          name: http
        env:
        - name: NODE_ENV
          value: "production"
        - name: MONGODB_GLIX_URI
          valueFrom:
            secretKeyRef:
              name: glix-secrets
              key: mongodb-uri
        - name: PAYLOAD_SECRET
          valueFrom:
            secretKeyRef:
              name: glix-secrets
              key: payload-secret
        - name: NEXT_PUBLIC_SERVER_URL
          valueFrom:
            configMapKeyRef:
              name: glix-config
              key: server-url
        resources:
          requests:
            cpu: 100m
            memory: 256Mi
          limits:
            cpu: 500m
            memory: 512Mi
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 5
```

### Service & Ingress

**`k8s/service.yaml`:**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: glix-web
  namespace: production
spec:
  selector:
    app: glix-web
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: glix-web
  namespace: production
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - glix.com
    - www.glix.com
    secretName: glix-tls
  rules:
  - host: glix.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: glix-web
            port:
              number: 80
```

### ConfigMaps & Secrets

**`k8s/configmap.yaml`:**
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: glix-config
  namespace: production
data:
  server-url: "https://glix.com"
  node-env: "production"
```

**`k8s/secrets.yaml`:**
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: glix-secrets
  namespace: production
type: Opaque
data:
  mongodb-uri: <base64-encoded-value>
  payload-secret: <base64-encoded-value>
```

**Create secrets securely:**
```bash
kubectl create secret generic glix-secrets \
  --from-literal=mongodb-uri='mongodb+srv://...' \
  --from-literal=payload-secret='your-secret' \
  -n production
```

---

## Infrastructure as Code (Terraform)

### AWS Infrastructure Example

**`terraform/main.tf`:**
```hcl
terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket = "glix-terraform-state"
    key    = "production/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region
}

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "glix-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

# ECS Task Definition
resource "aws_ecs_task_definition" "app" {
  family                   = "glix-web"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 512
  memory                   = 1024
  execution_role_arn       = aws_iam_role.ecs_execution.arn
  task_role_arn            = aws_iam_role.ecs_task.arn

  container_definitions = jsonencode([
    {
      name      = "web"
      image     = "${var.ecr_repository}:latest"
      essential = true

      portMappings = [
        {
          containerPort = 3000
          protocol      = "tcp"
        }
      ]

      environment = [
        {
          name  = "NODE_ENV"
          value = "production"
        }
      ]

      secrets = [
        {
          name      = "MONGODB_GLIX_URI"
          valueFrom = aws_secretsmanager_secret.mongodb_uri.arn
        },
        {
          name      = "PAYLOAD_SECRET"
          valueFrom = aws_secretsmanager_secret.payload_secret.arn
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "/ecs/glix-web"
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])
}

# ALB
resource "aws_lb" "main" {
  name               = "glix-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = var.public_subnet_ids
}

# Variables
variable "aws_region" {
  default = "us-east-1"
}

variable "ecr_repository" {
  description = "ECR repository URL"
}

variable "public_subnet_ids" {
  type = list(string)
}
```

**`terraform/variables.tf`:**
```hcl
variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "app_count" {
  description = "Number of app instances"
  type        = number
  default     = 2
}
```

---

## Cron Jobs & Scheduled Tasks

### Kubernetes CronJob

**`k8s/cronjob-cleanup.yaml`:**
```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: transaction-cleanup
  namespace: production
spec:
  schedule: "0 2 * * *" # Daily at 2 AM
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: cleanup
            image: ghcr.io/yourorg/glix-cli:latest
            command:
            - node
            - scripts/cleanup-transactions.js
            env:
            - name: MONGODB_GLIX_URI
              valueFrom:
                secretKeyRef:
                  name: glix-secrets
                  key: mongodb-uri
          restartPolicy: OnFailure
```

### GitHub Actions Scheduled Workflow

**`.github/workflows/scheduled-tasks.yml`:**
```yaml
name: Scheduled Tasks

on:
  schedule:
    - cron: '0 0 * * *' # Daily at midnight UTC
  workflow_dispatch: # Manual trigger

jobs:
  database-backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Backup MongoDB
        run: |
          mongodump --uri="${{ secrets.MONGODB_URI }}" \
            --out=./backup-$(date +%Y%m%d)

      - name: Upload to S3
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - run: |
          aws s3 cp ./backup-$(date +%Y%m%d) \
            s3://glix-backups/mongodb/ --recursive

  cleanup-old-data:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run cleanup script
        run: node scripts/cleanup.js
        env:
          MONGODB_URI: ${{ secrets.MONGODB_URI }}
```

### Node.js Cleanup Script

**`scripts/cleanup-transactions.js`:**
```javascript
import {MongoClient} from 'mongodb';

const client = new MongoClient(process.env.MONGODB_GLIX_URI);

async function cleanup() {
    try {
        await client.connect();
        const db = client.db('glix');

        // Delete failed transactions older than 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const result = await db.collection('transactions').deleteMany({
            status: 'failed',
            createdAt: {$lt: thirtyDaysAgo}
        });

        console.log(`Deleted ${result.deletedCount} old failed transactions`);
    } finally {
        await client.close();
    }
}

cleanup().catch(console.error);
```

---

## Monitoring & Logging

### Prometheus & Grafana

**`k8s/monitoring.yaml`:**
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s

    scrape_configs:
      - job_name: 'glix-web'
        kubernetes_sd_configs:
          - role: pod
        relabel_configs:
          - source_labels: [__meta_kubernetes_pod_label_app]
            regex: glix-web
            action: keep
```

### Application Metrics

**Custom Metrics Endpoint:**
```typescript
// app/api/metrics/route.ts
import {NextResponse} from 'next/server';
import payload from '@/shared/lib/payload';

export async function GET() {
    const {totalDocs: userCount} = await payload.count({
        collection: 'users',
    });

    const {totalDocs: transactionCount} = await payload.count({
        collection: 'transactions',
    });

    const metrics = `
# HELP glix_users_total Total number of users
# TYPE glix_users_total gauge
glix_users_total ${userCount}

# HELP glix_transactions_total Total number of transactions
# TYPE glix_transactions_total gauge
glix_transactions_total ${transactionCount}
    `.trim();

    return new NextResponse(metrics, {
        headers: {'Content-Type': 'text/plain'},
    });
}
```

---

## Secrets Management

### Using HashiCorp Vault

**Install Vault Agent:**
```yaml
# k8s/vault-agent.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vault-agent
spec:
  template:
    spec:
      serviceAccountName: vault
      containers:
      - name: vault-agent
        image: vault:latest
        env:
        - name: VAULT_ADDR
          value: "https://vault.example.com"
```

### GitHub Actions Secrets

**Rotate secrets script:**
```bash
#!/bin/bash
# scripts/rotate-secrets.sh

# Generate new secret
NEW_SECRET=$(openssl rand -base64 32)

# Update in GitHub
gh secret set PAYLOAD_SECRET --body "$NEW_SECRET"

# Update in K8s
kubectl create secret generic glix-secrets \
  --from-literal=payload-secret="$NEW_SECRET" \
  --dry-run=client -o yaml | kubectl apply -f -

# Restart deployment
kubectl rollout restart deployment/glix-web -n production
```

---

## Best Practices

### 1. CI/CD Pipeline Design
- Keep pipelines fast (<10 minutes)
- Use caching aggressively (npm, Docker layers)
- Fail fast with linting and unit tests first
- Parallelize independent jobs
- Use matrix testing for multiple environments

### 2. Docker Optimization
- Multi-stage builds to minimize image size
- Use Alpine images where possible
- Leverage BuildKit cache mounts
- Scan images for vulnerabilities (Trivy, Snyk)
- Tag images semantically (semver, git SHA)

### 3. Kubernetes Best Practices
- Set resource requests and limits
- Use horizontal pod autoscaling (HPA)
- Implement health checks (liveness/readiness)
- Use namespaces for environment separation
- Apply security policies (Pod Security Admission)

### 4. Infrastructure as Code
- Version control all infrastructure
- Use remote state (S3, Terraform Cloud)
- Implement state locking
- Plan before apply
- Use modules for reusability

### 5. Security
- Scan dependencies (Dependabot, Snyk)
- Rotate secrets regularly
- Use least privilege IAM roles
- Enable audit logging
- Implement network policies

---

Always reference `/docs/ai/guidelines.md` for deployment best practices and `/docs/ai/project-architecture.md` for infrastructure context.