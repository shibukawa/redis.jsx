import "console.jsx";
import "redis.jsx";

class _Main {
    static function main(argv : string[]) : void
    {
        var client = redis.createClient();

        client.mget(["sessions started", "sessions started", "foo"], (err, res) -> {
            console.dir(res);
            client.quit();
        });
    }
}
