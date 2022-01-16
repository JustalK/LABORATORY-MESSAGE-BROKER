# LABORATORY-DOCKER-COMPOSE

## Description

This project is a project for testing how to use multiple servers, how to make them communicating between them using event `RabbitMQ` and message `Redis`. I also use this project for exploring the different image that you can find on the `docker` website and how to use them.

## Experiences

- **Server1 && Server2:** Communication between server using Redis
- **Server3:** Connection of the server to the container `mongodb`

## Docker-compose

```bash
$ docker-compose down
$ docker-compose up -d --build
```

## Nginx

#### Description

Using `jwilder/nginx-proxy` for creating proxy on server by reading the services in dockercompose.

You can connect to the different server using those url:

- **server1**: api.server1.net
- **server2**: api.server2.net
- **server3**: api.server3.net

#### Adding new proxy

For adding a new proxy, be sure to do those two step:

1. Give the two environment variables `VIRTUAL_HOST` and `VIRTUAL_PORT` in the docker-compose to the services you want to proxy.
2. Create a line in the host file with the following command:
```
$ sudo nano /etc/host
```
Then add the following line:
```
127.0.0.1 api.server1.net api.server2.net api.server3.net
```

## Mongodb

The init file in the `mongodb/init` folder with be use for initializing the admin authentication in the server3. In case, it does not work, look in `lazydocker`.

If you dont find the reason, delete the container with the volume and delete the folder `mongodb/data` using sudo rm -rf command.

## Checking

A good way to test if service are up is by using the ping command.
By example, you could check if the server2 is up with this command :

```
$ ping api.server2.net
```

## Links

- [https://www.compose.com/articles/why-and-how-to-redis-with-your-mongodb/](https://www.compose.com/articles/why-and-how-to-redis-with-your-mongodb/)
