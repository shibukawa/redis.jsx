import "console.jsx";
import "redis.jsx";
import "js/nodejs.jsx";

class _Main {
    static function main(argv : string[]) : void
    {
        // Read a file from disk, store it in Redis, then read it back from Redis.
        var client = redis.createClient();
        var filename = "kids_in_cart.jpg";

        // Get the file I use for testing like this:
        //    curl http://ranney.com/kids_in_cart.jpg -o kids_in_cart.jpg
        // or just use your own file.

        // Read a file from fs, store it in Redis, get it back from Redis, write it back to fs.
        var data = node.fs.readFileSync(filename);
        console.log("Read " + data.length + " bytes from filesystem.");
        
        client.set(filename, data, redis.print as (Error, string) -> void); // set entire file
        client.get(filename, (err, reply) -> { // get entire file
            if (err) {
                console.log("Get error:", err);
            } else {
                node.fs.writeFileSync("duplicate_" + filename, reply);
                client.end();
            }
        });
    }
}
