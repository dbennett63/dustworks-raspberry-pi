gpio mode 0 out
gpio mode 1 out
gpio mode 2 out

turnAllOn ()
{
        gpio write 0 1
        gpio write 1 1
        gpio write 2 1
}

turnAllOff()
{
        gpio write 0 0
        gpio write 1 0
        gpio write 2 0
}

randomEnable()
{
	pin=$((RANDOM % 3))
	state=$(($RANDOM % 2))
	output="pin:"$pin" | state:"$state
	echo $output
	gpio write $pin $state 

}

while :
do

	#turnAllOn
	#sleep 2
	#turnAllOff
	#sleep 2
	randomEnable
	sleep 1
done
