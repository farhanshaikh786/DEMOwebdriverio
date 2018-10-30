pipeline {
    agent any
    tools {nodejs 'node'}
    stages {
        stage('Code and Dependencies'){
            parallel{
            stage('Checkout Code'){
                steps{
                    git 'https://github.com/ecsdigital/devopsplayground-edi-9-zaleniumci.git'
                }
            }
            stage('Install Dependencies'){
                steps{
                    sh 'npm install'
                    sh 'npm install wdio-allure-reporter --save-dev'
                    sh 'npm install -g allure-commandline --save-dev'
                    sh 'docker pull elgalu/selenium'
                    sh 'docker pull dosel/zalenium'
                }
            }
            }
        }
            stage ('Start Zalenium'){
                steps{
                    sh 'docker run --rm -ti --name zalenium -d -p 4444:4444 -e PULL_SELENIUM_IMAGE=true -v /var/run/docker.sock:/var/run/docker.sock -v /tmp/videos:/home/seluser/videos --privileged dosel/zalenium start'
                }
            }
            stage ('Run Tests'){
                steps{
                    sh './node_modules/.bin/wdio wdio.conf.js'
                }
            }
            stage ('Stop Zalenium'){
                steps{
                    sh 'docker stop zalenium'
                }
            }
    }
}
