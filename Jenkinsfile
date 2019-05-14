node {
  // environment vars 
  env.NODEJS_HOME = "${tool 'node10'}"
  env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
	
  stage('Pull') {
    checkout scm
    echo "${env.BRANCH_NAME}"
    commitId = sh(returnStdout: true, script: 'git rev-parse HEAD')
    sh 'node --version'
    sh 'npm --version'
  }
  
  stage('Build') {
    sh 'npm install'
    sh 'ng build'
  }
   
  stage('Test') {
    sh 'ng test --watch=false'
  }
  
  stage('Deploy') {
    if (env.BRANCH_NAME == 'develop') {
      echo "Deploying to DEV platform"
      sshPublisher(publishers: [sshPublisherDesc(configName: "hotmapsdev", transfers: [sshTransfer(
      execCommand: '''
          cd 
          touch $commitId
        ''', execTimeout: 900000, sourceFiles: '')]
      )])
    } else if (env.BRANCH_NAME == 'master') {
      echo "Deploying to PROD platform"
      echo "Deployment to PROD is currently disabled"
    } else {
      echo "${env.BRANCH_NAME}: not deploying"
    }

  }
}
