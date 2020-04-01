@Library('github.com/releaseworks/jenkinslib') _

pipeline {
    environment {
        AWS_DEFAULT_REGION = 'us-east-2'
    }
    agent {
        docker {
            image 'node:13'
        }
    }
    stages {
        stage('build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('publish') {
            when {
                branch 'master'
            }
            steps {
                script {
                    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'production', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                        withElasticContainerRegistry {
                            def app = docker.build("102252363609.dkr.ecr.us-east-2.amazonaws.com/mtgbutler-web")
                            app.push('latest');
                        }
                    }
                }
            }
        }
    }
}
