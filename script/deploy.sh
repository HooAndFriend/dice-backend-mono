if [ $# -eq 0 ]; then
    echo "인자가 없습니다. 스크립트를 호출할 때 인자를 전달해주세요."
    exit 1
elif [ $1 = "core" ]; then
    rsync -av --exclude='node_modules' ./apps/core-server/ dice:~/apps/core-server/
    ssh -t dice "sh restart.sh core"
elif [ $1 = "auth" ]; then
    rsync -av --exclude='node_modules' ./apps/auth-server/ dice:~/apps/auth-server/
    ssh -t dice "sh restart.sh auth"
elif [ $1 = "log" ]; then
    rsync -av --exclude='node_modules' ./apps/log-server/ dice:~/apps/log-server/
    ssh -t dice "sh restart.sh log"
elif [ $1 = "push" ]; then
    rsync -av --exclude='node_modules' ./apps/push-server/ dice:~/apps/push-server/
    ssh -t dice "sh restart.sh push"
elif [ $1 = "admin" ]; then
    rsync -av --exclude='node_modules' ./apps/admin-server/ dice:~/apps/admin-server/
    ssh -t dice "sh restart.sh admin"
elif [ $1 = "all" ]; then
    rsync -av --exclude='node_modules' ./apps/core-server/ dice:~/apps/core-server/
    ssh -t dice "sh restart.sh core"
    rsync -av --exclude='node_modules' ./apps/auth-server/ dice:~/apps/auth-server/
    ssh -t dice "sh restart.sh auth"
    rsync -av --exclude='node_modules' ./apps/log-server/ dice:~/apps/log-server/
    ssh -t dice "sh restart.sh log"
    rsync -av --exclude='node_modules' ./apps/push-server/ dice:~/apps/push-server/
    ssh -t dice "sh restart.sh push"
    rsync -av --exclude='node_modules' ./apps/admin-server/ dice:~/apps/admin-server/
    ssh -t dice "sh restart.sh admin"
else
    echo "인자가 잘못되었습니다."
    exit 1

fi

