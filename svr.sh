branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
case "$1" in
	-p|--pull)
	git pull origin feature/v1.1.1
	yarn install
	pm2 restart server-log_5009
	;;
	-l|--log)
	pm2 log server-log_5009
	;;
	-pl|--pullstart)
	git pull origin feature/v1.1.1
        yarn install
        pm2 restart server-log_5009
	pm2 log server-log_5009
	;;
	-r|--restart)
	pm2 restart server-log_5009
	;;
	-b|--branch)
	echo $branch
	;;
	*)
	echo "
MENU
--------------
-p|--pull
-l|--log
-r|--restart

contoh:
$0 -p
"
	;;
esac
