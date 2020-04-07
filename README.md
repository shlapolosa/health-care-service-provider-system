# health-care-service-provider-system
health-care-service-provider-system

clone the app;

> git clone https://github.com/shlapolosa/health-care-service-provider-system.git

> cd health-care-service-provider-system


To make Jhipster changes;

>docker image pull jhipster/jhipster

after getting the image, bind image to src directory

> docker container run --name jhipster -v {{path to root on local machine}}:/home/jhipster/app -v ~/.m2:/home/jhipster/.m2 -p 8080:8080 -p 9000:9000 -p 3001:3001 -d -t jhipster/jhipster

To check that your container is running, use the command docker container ps:

In case you update the Docker image (rebuild or pull from the Docker hub), it’s better to remove the existing container, and run the container all over again. To do so, first stop the container, remove it and then run it again:

> docker container stop jhipster
> docker container rm jhipster
> docker image pull jhipster/jhipster
> docker container run --name jhipster -v ~/jhipster:/home/jhipster/app -v ~/.m2:/home/jhipster/.m2 -p 8080:8080 -p 9000:9000 -p 3001:3001 -d -t jhipster/jhipster


Accessing the container

> docker container exec -it jhipster bash

And then you can run;

>jhipster import-jdl health-care-system.jh

You can then exit the container and run all commands on the command line.
> exit
> docker container stop jhipster
to build containers;

> mvn -Pprod verify com.google.cloud.tools:jib-maven-plugin:dockerBuild

to run everything;

>cd docker-compose
>docker-compose up -d
