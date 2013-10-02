import "console.jsx";
import "redis.jsx";

class _Main {
    static function main(argv : string[]) : void
    {
        var set_size = 20;

        var client = redis.createClient();
        client.sadd("bigset", "a member");
        client.sadd("bigset", "another member");

        while (set_size > 0) {
            client.sadd("bigset", "member " + set_size as string);
            set_size -= 1;
        }

        // multi chain with an individual callback
        client.multi()
            .scard("bigset")
            .smembers("bigset")
            .keys("*", (err, replies) -> {
                client.mget(replies, redis.print as (Error, string[]) -> void);
            })
            .dbsize()
            .exec((err, replies) -> {
                console.log("MULTI got " + replies.length + " replies");
                replies.forEach((reply, index) -> {
                    console.log("Reply " + index + ": " + reply as string);
                });
            });

        client.mset(["incr thing", 100, "incr other thing", 1], redis.print as (Error, string) -> void);

        // start a separate multi command queue
        var multi = client.multi();
        multi.incr("incr thing", redis.print as (Error, int) -> void);
        multi.incr("incr other thing", redis.print as (Error, int) -> void);

        // runs immediately
        client.get("incr thing", redis.print as (Error, string) -> void); // 100

        // drains multi queue and runs atomically
        multi.exec((err, replies) -> {
            console.log(replies); // 101, 2
        });

        // you can re-run the same transaction if you like
        multi.exec((err, replies) -> {
            console.log(replies); // 102, 3
            client.quit();
        });
    }
}
