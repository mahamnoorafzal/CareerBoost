pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Deploy') {
            steps {
                sh '''
                    docker compose -f docker-compose-part2.yml up -d
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    docker compose -f docker-compose-part2.yml ps
                '''
            }
        }
    }
}
