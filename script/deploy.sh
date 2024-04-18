if [ $# -eq 0 ]; then
    echo "인자가 없습니다. 스크립트를 호출할 때 인자를 전달해주세요."
    exit 1
elif [ $1 = "core" ]; then
    ssh -t dice "rm -rf apps/core-server"
    rsync -av --exclude='node_modules' ./apps/core-server/ dice:~/apps/core-server/
    ssh -t dice "sh restart.sh core"
    ssh -t dice "sh restart.sh nginx"
elif [ $1 = "auth" ]; then
    ssh -t dice "rm -rf apps/auth-server"
    rsync -av --exclude='node_modules' ./apps/auth-server/ dice:~/apps/auth-server/
    ssh -t dice "sh restart.sh auth"
    ssh -t dice "sh restart.sh nginx"
elif [ $1 = "log" ]; then
    ssh -t dice "rm -rf apps/log-server"
    rsync -av --exclude='node_modules' ./apps/log-server/ dice:~/apps/log-server/
    ssh -t dice "sh restart.sh log"
    ssh -t dice "sh restart.sh nginx"
elif [ $1 = "push" ]; then
    ssh -t dice "rm -rf apps/push-server"
    rsync -av --exclude='node_modules' ./apps/push-server/ dice:~/apps/push-server/
    ssh -t dice "sh restart.sh push"
    ssh -t dice "sh restart.sh nginx"
elif [ $1 = "admin" ]; then
    ssh -t dice "rm -rf apps/admin-server"
    rsync -av --exclude='node_modules' ./apps/admin-server/ dice:~/apps/admin-server/
    ssh -t dice "sh restart.sh admin"
    ssh -t dice "sh restart.sh nginx"
elif [ $1 = "file" ]; then
    ssh -t dice "rm -rf apps/file-server"
    rsync -av --exclude='node_modules' ./apps/file-server/ dice:~/apps/file-server/
    ssh -t dice "sh restart.sh file"
    ssh -t dice "sh restart.sh nginx"
elif [ $1 = "all" ]; then
    ssh -t dice "rm -rf apps/*"
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
    rsync -av --exclude='node_modules' ./apps/file-server/ dice:~/apps/file-server/
    ssh -t dice "sh restart.sh file"
    ssh -t dice "sh restart.sh nginx"
else
    echo "인자가 잘못되었습니다."
    exit 1

fi

