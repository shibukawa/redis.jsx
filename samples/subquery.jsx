import "console.jsx";
import "redis.jsx";

class _Main
{
    static function print_results(obj : Map.<string>) : void
    {
        console.dir(obj);
    }

    static function main(argv : string[]) : void
    {
        var client = redis.createClient();

        // build a map of all keys and their types
        client.keys("*", (err, all_keys) -> {
            var key_types = {} : Map.<string>;
            
            all_keys.forEach((key, pos) -> { // use second arg of forEach to get pos
                client.type(key, (err, type) -> {
                    key_types[key] = type;
                    if (pos == all_keys.length - 1) { // callbacks all run in order
                        _Main.print_results(key_types);
                        client.quit();
                    }
                });
            });
        });
    }
}
