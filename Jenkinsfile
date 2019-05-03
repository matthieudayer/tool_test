pipeline {
  agent none
  stages {
    stage('Install dependencies') {
      agent any
      steps {
        echo 'Installing dependencies'
        sh 'npm install'
      }
    }
    stage('Unit tests') {
      agent any
      steps {
        echo 'Running unit tests'
        sh 'ng test --code-coverage'
      }
    }
  }
}