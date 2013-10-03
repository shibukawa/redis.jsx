import "console.jsx";
import "redis.jsx";

class _Main {
    static function main(argv : string[]) : void
    {
        var client = redis.createClient();

        client.eval("return 100.5", 0, (err : Error, res : int) -> {
            console.dir(err);
            console.dir(res);
            client.quit();
        });
    }
}
