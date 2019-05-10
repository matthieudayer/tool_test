node {
  // environment vars
  env.NODEJS_HOME = "${tool 'node10'}"
  env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
	
  stage('Pull') {
    checkout scm
    echo "${env.BRANCH_NAME}"
    echo "${env.GIT_COMMIT}"
    sh 'git status'
    sh 'git rev-parse HEAD'  
    sh 'node --version'
    sh 'npm --version'
    
    //git branch: 'develop', url: 'https://github.com/29axe/tool_test.git'
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
    } else if (env.BRANCH_NAME == 'master') {
      echo "Deploying to PROD platform"
    } else {
      echo "${env.BRANCH_NAME}: not deploying"
    }

  }
  
  stage('Report') {
    
  }
}
