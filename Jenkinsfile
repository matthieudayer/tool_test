node {
  // environment vars
  env.NODEJS_HOME = "${tool 'node10'}"
  env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
	
  stage('Pull') {
    sh 'node --version'
    sh 'npm --version'
    git branch: 'develop', url: 'https://github.com/29axe/tool_test.git'
  }
  
  stage('Build') {
    sh 'npm install'
    sh 'ng build'
  }
  
  stage('Test') {
    sh 'ng test --watch=false'
  }
  
  stage('Deploy') {
    
  }
  
  stage('Report') {
    
  }
  
  stage('Push build') {
    
  }
}
