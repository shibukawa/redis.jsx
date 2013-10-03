import "console.jsx";
import "js/nodejs.jsx";
import "redis.jsx";

class _Main {
    static function main(argv : string[]) : void
    {
        var client = redis.createClient();

        client.monitor((err, res) -> {
            console.log("Entering monitoring mode.");
        });

        client.on("monitor", (time : int, args : string[]) -> {
            console.log(time + ": " + node.util.inspect(args));
        });
    }
}
