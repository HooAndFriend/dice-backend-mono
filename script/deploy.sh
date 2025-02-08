if [ $# -eq 0 ]; then
    echo "인자가 없습니다. 스크립트를 호출할 때 인자를 전달해주세요."
    exit 1
elif [ $1 = "core" ]; then
    ssh -t dice "rm -rf apps/core-server"
    rsync -av --exclude='node_modules' ./apps/core-server/ dice:~/apps/core-server/
    ssh -t dice "sh restart.sh core"
    ssh -t dice "sh restart.sh nginx"
    sleep 5
    curl --location "https://api.hi-dice.com/api/slack/v1/slack" --header "Content-Type:application/json" --data '{"name":"BACKEND:CORE-SERVER","code":"MAS","message":"BACKEND:CORE-SERVER 배포가 완료되었습니다."}'
elif [ $1 = "log" ]; then
    ssh -t dice "rm -rf apps/log-server"
    rsync -av --exclude='node_modules' ./apps/log-server/ dice:~/apps/log-server/
    ssh -t dice "sh restart.sh log"
    ssh -t dice "sh restart.sh nginx"
    sleep 5
    curl --location "https://api.hi-dice.com/api/slack/v1/slack" --header "Content-Type:application/json" --data '{"name":"BACKEND:LOG-SERVER","code":"MAS","message":"BACKEND:LOG-SERVER 배포가 완료되었습니다."}'
elif [ $1 = "push" ]; then
    ssh -t dice "rm -rf apps/push-server"
    rsync -av --exclude='node_modules' ./apps/push-server/ dice:~/apps/push-server/
    ssh -t dice "sh restart.sh push"
    ssh -t dice "sh restart.sh nginx"
    sleep 5
    curl --location "https://api.hi-dice.com/api/slack/v1/slack" --header "Content-Type:application/json" --data '{"name":"BACKEND:PUSH-SERVER","code":"MAS","message":"BACKEND:PUSH-SERVER 배포가 완료되었습니다."}'
elif [ $1 = "file" ]; then
    ssh -t dice "rm -rf apps/file-server"
    rsync -av --exclude='node_modules' ./apps/file-server/ dice:~/apps/file-server/
    ssh -t dice "sh restart.sh file"
    ssh -t dice "sh restart.sh nginx"
    sleep 5
    curl --location "https://api.hi-dice.com/api/slack/v1/slack" --header "Content-Type:application/json" --data '{"name":"BACKEND:FILE-SERVER","code":"MAS","message":"BACKEND:FILE-SERVER 배포가 완료되었습니다."}'
elif [ $1 = "all" ]; then
    ssh -t dice "rm -rf apps/*"
    rsync -av --exclude='node_modules' ./apps/core-server/ dice:~/apps/core-server/
    ssh -t dice "sh restart.sh core"
    rsync -av --exclude='node_modules' ./apps/log-server/ dice:~/apps/log-server/
    ssh -t dice "sh restart.sh log"
    rsync -av --exclude='node_modules' ./apps/push-server/ dice:~/apps/push-server/
    ssh -t dice "sh restart.sh push"
    rsync -av --exclude='node_modules' ./apps/file-server/ dice:~/apps/file-server/
    ssh -t dice "sh restart.sh file"
    ssh -t dice "sh restart.sh nginx"
    sleep 5
    curl --location "https://api.hi-dice.com/api/slack/v1/slack" --header "Content-Type:application/json" --data '{"name":"BACKEND:ALL","code":"MAS","message":"BACKEND:ALL 배포가 완료되었습니다."}'
else
    echo "인자가 잘못되었습니다."
    exit 1

fi

