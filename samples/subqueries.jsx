import "console.jsx";
import "redis.jsx";

class _Main {
    static function main(argv : string[]) : void
    {
        var client = redis.createClient();

        client.keys("*", (err, keys) -> {
            keys.forEach((key, pos) -> {
                client.type(key, (err, keytype) -> {
                    console.log(key + " is " + keytype);
                    if (pos == (keys.length - 1)) {
                        client.quit();
                    }
                });
            });
        });
    }
}
