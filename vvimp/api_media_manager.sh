SERVICE_NAME = "api_media_manager"
PID_PATH_NAME = "/tmp"

case $1 in
start)
	echo "Starting $SERVICE_NAME ..."
	if [ ! -f $PID_PATH_NAME ];	then
		nohup "java -jar /home/pi/pi-network/api/MediaManagerApi.jar"
		echo $! > $PID_PATH_NAME
		echo "$SERVICE_NAME started ..."
	else
		echo "$SERVICE_NAME is already running ..."
	fi
;;
stop)
	if [ -f $PID_PATH_NAME ]; then
		PID=$(cat $PID_PATH_NAME);
		echo "$SERVICE_NAME stoping ..."
		kill $PID;
		echo "$SERVICE_NAME stopped ..."
		rm $PID_PATH_NAME
	else
		echo "$SERVICE_NAME is not running ..."
	fi
;;
restart)
  if [ -f $PID_PATH_NAME ]; then
      PID=$(cat $PID_PATH_NAME);
      echo "$SERVICE_NAME stopping ...";
      kill $PID;
      echo "$SERVICE_NAME stopped ...";
      rm $PID_PATH_NAME
      echo "$SERVICE_NAME starting ..."
      nohup "java -jar /home/pi/pi-network/api/MediaManagerApi.jar"
      echo $! > $PID_PATH_NAME
      echo "$SERVICE_NAME started ..."
  else
      echo "$SERVICE_NAME is not running ..."
     fi     ;;
 esac
 
##############################