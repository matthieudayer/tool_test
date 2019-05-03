pipeline {
  agent none
  stages {
    stage('Install dependencies') {
      agent any
      steps {
        nodejs('NodeJS 10.15.3 LTS') {
          sh 'node -v'
        }

      }
    }
  }
}