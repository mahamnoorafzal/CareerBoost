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
post {
    success {
        emailext(
            subject: "SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: "CareerBoost Part II deployment succeeded.\nBuild: ${env.BUILD_URL}",
            recipientProviders: [developers()],
            to: '$DEFAULT_RECIPIENTS'
        )
    }
    failure {
        emailext(
            subject: "FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: "CareerBoost Part II deployment failed.\nBuild: ${env.BUILD_URL}",
            recipientProviders: [developers()],
            to: '$DEFAULT_RECIPIENTS'
        )
    }
}
