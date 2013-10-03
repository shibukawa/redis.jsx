redis.jsx
===========================================

Synopsis
---------------

[JSX](http://jsx.github.io/) wrapper for Redis node.js driver [node-redis](https://github.com/mranney/node_redis).

Code Example
---------------

```js
import "redis.jsx";

class _Main {
    static function main(argv : string[]) : void
    {
        var client = redis.createClient();

        client.on('error', (err : Error) -> {
            console.log("error event -", client.host + ":" + client.port as string, "-", err);
        });

        client.set("string key", "string val", redis.print as (Error, string) -> void);
        client.hset("hash key", "hashtest 1", "some value", redis.print as (Error, int) -> void);
        client.hset("hash key", "hashtest 2", "some other value", redis.print as (Error, int) -> void);
        client.hkeys("hash key", (err, replies)->{
            if (err) {
                return console.error("error response -", err);
            }

            console.log(replies.length + " replies:");
            replies.forEach(function (reply, i) {
                console.log("    " + i + ": " + reply);
            });
        });

        client.quit((err, res)->{
            console.log("Exiting from quit command.");
        });
    }
}
```

Installation
---------------

```sh
$ npm install redis.jsx --save
$ npm install redis --save
```

API Reference
------------------

It is almost same as node-redis. Following points are different from node-redis:

* Only small capital methods are avaialble.
* Two keyword commands (SCRIPT LOAD) have new name, all small capital and joined (scriptload).



Development
-------------

### Repository

* Repository: git://github.com/shibukawa/redis.jsx.git
* Issues: https://github.com/shibukawa/redis.jsx/issues

### Run Test

```sh
$ grunt test
```

### Build Sample

```sh
$ grunt build
```

### Build Document

```sh
$ grunt doc

Author
---------

* shibukawa / yoshiki@shibu.jp

License
------------

MIT

Complete license is written in `LICENSE.md`.
