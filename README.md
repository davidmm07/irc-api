#   :smile: :speaking_head: :laughing: irc_api 


The API irc_api, generated with NestJs, supports manipulation WS through Redis.


### :pick: Previous Requirements
* Docker
* Docker Compose
* [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository. 

### :pick: Other tools used(included with Docker)

* [Gyphy Api](https://developers.giphy.com/docs/api/).
* [Redis](https://redis.io/documentation)
## How to run

## Installation dependencies

```bash
$ npm install
```

#### Run with docker :whale:

1. Clone the repo
```sh
git clone  https://github.com/davidmm07/irc_api
```

2. Move to the repository file
```sh
cd irc_api
```

3. Run container and check logs with:
```sh
docker-compose up --d && docker-compose logs -f
```

4. Verify that the containers are running
```sh
docker ps 
```
## License

Nest is [MIT licensed](LICENSE).
