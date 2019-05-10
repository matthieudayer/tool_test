node {
  // environment vars 
  env.NODEJS_HOME = "${tool 'node10'}"
  env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
	
  stage('Pull') {
    checkout scm
    echo "${env.BRANCH_NAME}"
    //sh 'git status'
    commitId = sh(returnStdout: true, script: 'git rev-parse HEAD')
    echo "commit id: ${commitId}"
    sh 'node --version'
    sh 'npm --version'
    
    //git branch: 'develop', url: 'https://github.com/29axe/tool_test.git'
    
    sshPublisher(publishers: [sshPublisherDesc(configName: "hotmapsdev", transfers: [sshTransfer(
      execCommand: '''
        echo "INFO: deploy $commitId"
      ''', execTimeout: 120000, sourceFiles: '')]
    )])
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
      //ssh user@server rm -rf /var/www/temp_deploy/dist/
    } else if (env.BRANCH_NAME == 'master') {
      echo "Deploying to PROD platform"
      echo "Deployment to PROD is currently disabled"
    } else {
      echo "${env.BRANCH_NAME}: not deploying"
    }

  }
  
  stage('Report') {
    
  }
}
