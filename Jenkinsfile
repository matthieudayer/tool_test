pipeline {
  agent none
  stages {
    stage('Install dependencies') {
      agent any
      steps {
        echo 'Installing dependencies'
        nodejs(nodeJSInstallationName: 'NodeJS 10.15.3 LTS', configId: 'node-10.15.3') {
          sh 'node -v'
        }

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