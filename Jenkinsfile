pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'docker-compose build'
      }
    }

    stage('Test') {
      steps {
        sh 'docker-compose run frontend npm run tslint'
        sh 'docker-compose run frontend npm run stylelint'
      }
    }

    stage('Deploy') {
      when { branch 'develop' }
      steps {
        sh 'docker-compose run frontend npm run build'
        sh 'docker-compose -f docker-compose.prod.yml build'
        sh 'docker-compose -f docker-compose.prod.yml push'
      }
    }
  }
}