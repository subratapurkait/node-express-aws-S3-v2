express-docker-image - name of docker image 
to check for image name use command ```docker image ls ``` this will list out all the image list with name, id, size, created time

```docker run --rm ```
```--rm``` means it will remove the existing image and recreate while rerun the command

```docker run --rm -d```
```-d``` means detach mode it will run the terminal in background

```docker run --rm -d -p 3000:3000```
```-p``` port of the docker network ( as docker has its own network) here 3000 is host port:inside docker port on right side 3000


```docker run --rm -d -p 3000:3000 -v %cd%:/app --name express-docker-container express-docker-image```
```--name``` nameof container then space and next parameter is of the imagename created at first or check it on docker image ls command


``` -v %cd% ```
volume mount binding to sync the latest code into docker ```-v %cd%``` is for windows and ```-v $(pwd):/app```


```docker run --rm -d -p 3000:3000 -v ${PWD}:/app --env-file ./.env --name express-docker-container express-docker-image```


```docker exec -it dockerID bash``` => to check terminal
to check for dockerID use command ```docker ps```

``` --env-file ./.env ```
for env files