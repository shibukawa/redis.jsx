import "console.jsx";
import "redis.jsx";

class _Main {
    static function main(argv : string[]) : void
    {
        var client = redis.createClient();

        // start a separate command queue for multi
        var multi = client.multi();
        multi.incr("incr thing", redis.print as (Error, int) -> void);
        multi.incr("incr other thing", redis.print as (Error, int) -> void);

        // runs immediately
        client.mset(["incr thing", 100, "incr other thing", 1], redis.print as (Error, string) -> void);

        // drains multi queue and runs atomically
        multi.exec((err, replies) -> {
            console.log(replies); // 101, 2
        });

        // you can re-run the same transaction if you like
        multi.exec((err, replies) -> {
            console.log(replies); // 102, 3
            client.quit();
        });

        client.multi([
            ["mget", "multifoo", "multibar", redis.print as (Error, string[]) -> void],
            ["incr", "multifoo"],
            ["incr", "multibar"]
        ]).exec((err, replies) -> {
            console.log(replies.toString());
        });
    }
}
