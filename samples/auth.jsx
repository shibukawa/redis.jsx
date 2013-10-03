import "console.jsx";
import "redis.jsx";

class _Main {
    static function main(argv : string[]) : void
    {
        var client = redis.createClient();

        // client.auth("somepass") is ok too
        client.auth("somepass", (err : Error, res : string) -> {
            console.dir(err);
            console.dir(res);
            client.quit();
        });
    }
}
