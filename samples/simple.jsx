import "console.jsx";
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
