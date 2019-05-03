pipeline {
  agent none
  stages {
    stage('Install dependencies') {
      steps {
        echo 'Installing dependencies'
        sh 'npm install'
      }
    }
    stage('Unit tests') {
      steps {
        echo 'Running unit tests'
        sh 'ng test --code-coverage'
      }
    }
  }
}